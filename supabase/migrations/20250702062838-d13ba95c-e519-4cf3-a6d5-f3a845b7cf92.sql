
-- Create a function to seed fake burial posts
CREATE OR REPLACE FUNCTION seed_fake_graves()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  fake_user_id uuid;
  categories text[] := ARRAY['Funny', 'Cringe', 'Exes', 'Crypto', 'Tech', 'Politics', 'Trends', 'Serious'];
  category_index int;
  posts_per_category int := 6; -- Will create 48 posts (6 per 8 categories) + 2 extra
  current_category text;
  fake_usernames text[] := ARRAY[
    'cryptobro2023', 'millennial_mom', 'genzmemer', 'tech_skeptic', 'exes_anonymous',
    'trend_hunter', 'political_junkie', 'serial_killer', 'grave_digger', 'death_dealer',
    'soul_collector', 'meme_lord', 'crypto_casualty', 'silicon_valley_ghost', 'heartbreak_hotel',
    'viral_vampire', 'politics_poison', 'trend_terrorist', 'comedy_cemetery', 'cringe_collector',
    'relationship_reaper', 'blockchain_burial', 'startup_survivor', 'democracy_destroyer',
    'influencer_killer', 'joke_assassin', 'awkward_annihilator', 'love_liquidator',
    'coin_crusher', 'app_apocalypse', 'vote_vulture', 'hype_harvester', 'laugh_liquidator',
    'shame_slayer', 'romance_ripper', 'token_terminator', 'bug_buster', 'campaign_killer',
    'momentum_murderer', 'humor_hunter', 'cringe_crusher', 'heart_hacker', 'wallet_wrecker',
    'code_cremator', 'ballot_butcher', 'buzz_killer', 'giggle_grave', 'awkward_executioner'
  ];
  fake_titles text[] := ARRAY[
    'My NFT Collection', 'Ex''s Instagram Stories', 'Twitter Blue Checkmark', 'My Diet Plans',
    'Skinny Jeans', 'Facebook Marketplace Haggling', 'TikTok Dances', 'Cryptocurrency Portfolio',
    'My Self-Respect', 'Dating App Matches', 'New Year''s Resolutions', 'Zoom Call Etiquette',
    'My Attention Span', 'Cable TV Subscription', 'Physical CD Collection', 'Handwriting Skills',
    'Privacy Settings', 'My Patience', 'Common Sense', 'Reading Books', 'Face-to-Face Conversations',
    'My Metabolism', 'Flip Phones', 'Blockbuster Membership', 'My Motivation', 'Internet Explorer',
    'Fax Machines', 'My Savings Account', 'Political Discourse', 'Original Thoughts',
    'My Hairline', 'Genuine Laughter', 'Trust in Humanity', 'My Filter', 'Real Friendships',
    'My Dignity', 'Actual Skills', 'Inner Peace', 'My Sanity', 'Authentic Connections',
    'My Youth', 'Genuine Emotions', 'My Idealism', 'Real Communication', 'My Innocence',
    'Deep Thoughts', 'My Optimism', 'True Love', 'My Dreams', 'Honest Politicians'
  ];
  fake_epitaphs text[] := ARRAY[
    'Gone but never forgotten... until the next trend', 'RIP to the GOAT of bad decisions',
    'It was cringe while it lasted', 'Died doing what it loved: being irrelevant',
    'Another victim of the algorithm', 'Too good for this world, too pure',
    'Canceled by the internet tribunal', 'Sacrificed for the greater meme',
    'Death by a thousand screenshots', 'Couldn''t survive the group chat',
    'Murdered by reality', 'Killed by its own success',
    'Died from secondhand embarrassment', 'Executed by the comment section',
    'Assassinated by better alternatives', 'Suffocated by its own hype',
    'Overdosed on its own toxicity', 'Starved of genuine engagement',
    'Poisoned by fake news', 'Drowned in a sea of notifications',
    'Burned by hot takes', 'Frozen out by the cool kids',
    'Electrocuted by social media', 'Crushed under the weight of expectations',
    'Stabbed in the back by progress', 'Shot down by fact-checkers',
    'Strangled by red tape', 'Bombed by bad reviews',
    'Vaporized by viral videos', 'Deleted by moderators',
    'Blocked by common sense', 'Unfriended by society',
    'Ghosted by its own audience', 'Swiped left by destiny',
    'Unmatched by reality', 'Reported for being problematic',
    'Muted by the masses', 'Archived by time itself',
    'Cached in eternal memory', 'Compressed into oblivion',
    'Encrypted and lost forever', 'Corrupted beyond repair',
    'Fragmented across the internet', 'Buffering into eternity',
    'Lost in the cloud', 'Disconnected from humanity',
    'Error 404: Relevance not found', 'Blue screen of death',
    'System failure of epic proportions', 'Needs to be rebooted in heaven',
    'Permanently offline', 'Connection timed out'
  ];
  i int;
  j int;
  random_username text;
  random_title text;
  random_epitaph text;
  random_shares int;
  random_views int;
  random_likes int;
  days_ago int;
  created_timestamp timestamptz;
BEGIN
  -- Create a fake user for system posts if not exists
  SELECT id INTO fake_user_id FROM profiles WHERE username = 'system_seeder' LIMIT 1;
  
  IF fake_user_id IS NULL THEN
    -- Create fake user in auth.users is not possible, so we'll use existing users or create a profile
    INSERT INTO profiles (id, username, display_name, created_at, updated_at)
    VALUES (gen_random_uuid(), 'system_seeder', 'System Seeder', NOW(), NOW())
    RETURNING id INTO fake_user_id;
  END IF;

  -- Seed posts for each category
  FOR category_index IN 1..array_length(categories, 1) LOOP
    current_category := categories[category_index];
    
    FOR j IN 1..posts_per_category LOOP
      i := (category_index - 1) * posts_per_category + j;
      
      -- Select random elements
      random_username := fake_usernames[1 + (i % array_length(fake_usernames, 1))];
      random_title := fake_titles[1 + (i % array_length(fake_titles, 1))];
      random_epitaph := fake_epitaphs[1 + (i % array_length(fake_epitaphs, 1))];
      
      -- Generate random engagement metrics
      random_shares := 50 + (random() * 2000)::int;
      random_views := random_shares * (2 + (random() * 8)::int);
      random_likes := (random_shares * 0.1 + (random() * random_shares * 0.3))::int;
      
      -- Generate random creation time (1-30 days ago)
      days_ago := 1 + (random() * 29)::int;
      created_timestamp := NOW() - (days_ago || ' days')::interval - (random() * 24 || ' hours')::interval;
      
      -- Insert the fake grave
      INSERT INTO graves (
        user_id, title, epitaph, category, tier, 
        shares, views, likes, featured,
        created_at, updated_at
      ) VALUES (
        fake_user_id, random_title, random_epitaph, current_category::grave_category, 
        CASE WHEN random() < 0.1 THEN 'featured'::grave_tier ELSE 'basic'::grave_tier END,
        random_shares, random_views, random_likes, 
        CASE WHEN random() < 0.1 THEN true ELSE false END,
        created_timestamp, created_timestamp
      );
    END LOOP;
  END LOOP;
  
  -- Add 2 extra posts to reach 50 total
  FOR j IN 1..2 LOOP
    i := 49 + j;
    random_username := fake_usernames[1 + (i % array_length(fake_usernames, 1))];
    random_title := fake_titles[1 + (i % array_length(fake_titles, 1))];
    random_epitaph := fake_epitaphs[1 + (i % array_length(fake_epitaphs, 1))];
    random_shares := 50 + (random() * 2000)::int;
    random_views := random_shares * (2 + (random() * 8)::int);
    random_likes := (random_shares * 0.1 + (random() * random_shares * 0.3))::int;
    days_ago := 1 + (random() * 29)::int;
    created_timestamp := NOW() - (days_ago || ' days')::interval - (random() * 24 || ' hours')::interval;
    
    INSERT INTO graves (
      user_id, title, epitaph, category, tier,
      shares, views, likes, featured,
      created_at, updated_at
    ) VALUES (
      fake_user_id, random_title, random_epitaph, categories[1 + (j % array_length(categories, 1))]::grave_category,
      CASE WHEN random() < 0.1 THEN 'featured'::grave_tier ELSE 'basic'::grave_tier END,
      random_shares, random_views, random_likes,
      CASE WHEN random() < 0.1 THEN true ELSE false END,
      created_timestamp, created_timestamp
    );
  END LOOP;
  
  -- Update the profiles table to have proper usernames for the fake posts
  UPDATE profiles SET username = 'system_seeder', display_name = 'System' WHERE id = fake_user_id;
END;
$$;

-- Enable realtime for graves table
ALTER TABLE graves REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE graves;

-- Call the seeding function
SELECT seed_fake_graves();

-- Create a function to get trending graves based on recent activity
CREATE OR REPLACE FUNCTION get_trending_graves(hours_back int DEFAULT 24)
RETURNS TABLE (
  id uuid,
  title text,
  shares int,
  category text,
  trend_score numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id,
    g.title,
    g.shares,
    g.category::text,
    -- Calculate trend score based on shares, views, likes, and recency
    (g.shares * 1.0 + g.views * 0.1 + g.likes * 0.5) * 
    (1.0 + 1.0 / GREATEST(1, EXTRACT(EPOCH FROM (NOW() - g.created_at)) / 3600.0)) as trend_score
  FROM graves g
  WHERE g.created_at >= NOW() - (hours_back || ' hours')::interval
  ORDER BY trend_score DESC
  LIMIT 10;
END;
$$;
