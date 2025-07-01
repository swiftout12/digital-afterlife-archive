export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          anonymous: boolean | null
          content: string
          created_at: string
          grave_id: string
          id: string
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          anonymous?: boolean | null
          content: string
          created_at?: string
          grave_id: string
          id?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          anonymous?: boolean | null
          content?: string
          created_at?: string
          grave_id?: string
          id?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_grave_id_fkey"
            columns: ["grave_id"]
            isOneToOne: false
            referencedRelation: "graves"
            referencedColumns: ["id"]
          },
        ]
      }
      graves: {
        Row: {
          backstory: string | null
          category: Database["public"]["Enums"]["grave_category"]
          created_at: string
          epitaph: string
          featured: boolean | null
          id: string
          image_url: string | null
          likes: number | null
          payment_status: string | null
          shares: number | null
          stripe_session_id: string | null
          tier: Database["public"]["Enums"]["grave_tier"]
          title: string
          updated_at: string
          user_id: string
          video_url: string | null
          views: number | null
        }
        Insert: {
          backstory?: string | null
          category?: Database["public"]["Enums"]["grave_category"]
          created_at?: string
          epitaph: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          likes?: number | null
          payment_status?: string | null
          shares?: number | null
          stripe_session_id?: string | null
          tier?: Database["public"]["Enums"]["grave_tier"]
          title: string
          updated_at?: string
          user_id: string
          video_url?: string | null
          views?: number | null
        }
        Update: {
          backstory?: string | null
          category?: Database["public"]["Enums"]["grave_category"]
          created_at?: string
          epitaph?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          likes?: number | null
          payment_status?: string | null
          shares?: number | null
          stripe_session_id?: string | null
          tier?: Database["public"]["Enums"]["grave_tier"]
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string | null
          views?: number | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          grave_id: string | null
          id: string
          status: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          grave_id?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          grave_id?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_grave_id_fkey"
            columns: ["grave_id"]
            isOneToOne: false
            referencedRelation: "graves"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          free_grave_last_used: string | null
          id: string
          referral_code: string | null
          referral_tokens: number | null
          total_referrals: number | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          free_grave_last_used?: string | null
          id: string
          referral_code?: string | null
          referral_tokens?: number | null
          total_referrals?: number | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          free_grave_last_used?: string | null
          id?: string
          referral_code?: string | null
          referral_tokens?: number | null
          total_referrals?: number | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_use_daily_free_grave: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      increment_grave_shares: {
        Args: { grave_uuid: string }
        Returns: undefined
      }
      use_daily_free_grave: {
        Args: { user_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      grave_category:
        | "Funny"
        | "Tech"
        | "Crypto"
        | "Exes"
        | "Trends"
        | "Cringe"
        | "Politics"
        | "Serious"
      grave_tier: "basic" | "image" | "video" | "featured" | "bundle"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      grave_category: [
        "Funny",
        "Tech",
        "Crypto",
        "Exes",
        "Trends",
        "Cringe",
        "Politics",
        "Serious",
      ],
      grave_tier: ["basic", "image", "video", "featured", "bundle"],
    },
  },
} as const
