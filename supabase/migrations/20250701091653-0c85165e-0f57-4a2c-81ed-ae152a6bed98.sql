
-- Create enum types for roles and categories
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.grave_category AS ENUM ('Funny', 'Tech', 'Crypto', 'Exes', 'Trends', 'Cringe', 'Politics', 'Serious');
CREATE TYPE public.grave_tier AS ENUM ('basic', 'image', 'video', 'featured', 'bundle');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT CHECK (length(bio) <= 100),
  avatar_url TEXT,
  referral_code TEXT UNIQUE,
  free_grave_last_used TIMESTAMPTZ,
  referral_tokens INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Create graves table
CREATE TABLE public.graves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL CHECK (length(title) <= 100),
  epitaph TEXT NOT NULL CHECK (length(epitaph) <= 200),
  backstory TEXT CHECK (length(backstory) <= 300),
  category grave_category NOT NULL DEFAULT 'Funny',
  tier grave_tier NOT NULL DEFAULT 'basic',
  image_url TEXT,
  video_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  shares INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  stripe_session_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grave_id UUID REFERENCES public.graves(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 100),
  anonymous BOOLEAN DEFAULT FALSE,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create referrals tracking table
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (referrer_id, referred_id)
);

-- Create payments table for tracking Stripe transactions
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  grave_id UUID REFERENCES public.graves(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row-Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.graves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for graves (public content)
CREATE POLICY "Graves are viewable by everyone" 
  ON public.graves FOR SELECT 
  USING (true);

CREATE POLICY "Users can create graves" 
  ON public.graves FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own graves" 
  ON public.graves FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Comments are viewable by everyone" 
  ON public.comments FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create comments" 
  ON public.comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR anonymous = true);

CREATE POLICY "Users can update own comments" 
  ON public.comments FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for referrals
CREATE POLICY "Users can view their referrals" 
  ON public.referrals FOR SELECT 
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "System can insert referrals" 
  ON public.referrals FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for payments
CREATE POLICY "Users can view own payments" 
  ON public.payments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert payments" 
  ON public.payments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "System can update payments" 
  ON public.payments FOR UPDATE 
  USING (true);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  random_username TEXT;
BEGIN
  -- Generate a random username based on email
  random_username := 'user_' || substr(md5(random()::text), 1, 8);
  
  -- Insert into profiles
  INSERT INTO public.profiles (id, username, referral_code)
  VALUES (
    NEW.id, 
    random_username,
    'ref_' || substr(md5(NEW.id::text), 1, 10)
  );
  
  -- Insert default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update grave shares
CREATE OR REPLACE FUNCTION public.increment_grave_shares(grave_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.graves 
  SET shares = shares + 1, updated_at = NOW()
  WHERE id = grave_uuid;
END;
$$;

-- Function to check daily free grave eligibility
CREATE OR REPLACE FUNCTION public.can_use_daily_free_grave(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  last_used TIMESTAMPTZ;
BEGIN
  SELECT free_grave_last_used INTO last_used
  FROM public.profiles
  WHERE id = user_uuid;
  
  RETURN (last_used IS NULL OR last_used < NOW() - INTERVAL '24 hours');
END;
$$;

-- Function to use daily free grave
CREATE OR REPLACE FUNCTION public.use_daily_free_grave(user_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET free_grave_last_used = NOW()
  WHERE id = user_uuid;
END;
$$;
