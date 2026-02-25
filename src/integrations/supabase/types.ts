export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string
          email: string
          first_name: string
          formation_choice: string
          id: string
          last_name: string
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string
          email: string
          first_name: string
          formation_choice: string
          id?: string
          last_name: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          email?: string
          first_name?: string
          formation_choice?: string
          id?: string
          last_name?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          created_at: string
          email_type: string
          error_message: string | null
          id: string
          metadata: Json | null
          recipient_email: string
          resend_id: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email_type: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          recipient_email: string
          resend_id?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email_type?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          recipient_email?: string
          resend_id?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      formation_sessions: {
        Row: {
          created_at: string
          current_participants: number
          end_date: string | null
          end_time: string
          formation_id: string
          id: string
          location: string | null
          max_participants: number
          notes: string | null
          price_override: number | null
          start_date: string
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_participants?: number
          end_date?: string | null
          end_time?: string
          formation_id: string
          id?: string
          location?: string | null
          max_participants?: number
          notes?: string | null
          price_override?: number | null
          start_date: string
          start_time?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_participants?: number
          end_date?: string | null
          end_time?: string
          formation_id?: string
          id?: string
          location?: string | null
          max_participants?: number
          notes?: string | null
          price_override?: number | null
          start_date?: string
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_sessions_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      formations: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number
          duration: string
          features: string[] | null
          icon: string | null
          id: string
          is_active: boolean
          price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          duration: string
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean
          price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean
          price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          source: string | null
          status: string
          subscribed_at: string
          unsubscribe_token: string
        }
        Insert: {
          email: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string
          unsubscribe_token?: string
        }
        Update: {
          email?: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string
          unsubscribe_token?: string
        }
        Relationships: []
      }
      pre_registrations: {
        Row: {
          created_at: string
          email: string
          first_name: string
          formation_duration: string
          formation_title: string
          id: string
          last_name: string
          phone: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          formation_duration: string
          formation_title: string
          id?: string
          last_name: string
          phone: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          formation_duration?: string
          formation_title?: string
          id?: string
          last_name?: string
          phone?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_audits: {
        Row: {
          audit_data: Json
          created_at: string
          id: string
          overall_score: number
          pages_count: number
          total_errors: number
          total_warnings: number
        }
        Insert: {
          audit_data: Json
          created_at?: string
          id?: string
          overall_score: number
          pages_count?: number
          total_errors?: number
          total_warnings?: number
        }
        Update: {
          audit_data?: Json
          created_at?: string
          id?: string
          overall_score?: number
          pages_count?: number
          total_errors?: number
          total_warnings?: number
        }
        Relationships: []
      }
      seo_fixes: {
        Row: {
          ai_explanation: string | null
          audit_id: string | null
          category: string
          created_at: string
          current_value: string | null
          fix_type: string
          id: string
          impact: string
          page_url: string
          proposed_value: string
          reviewed_at: string | null
          status: string
        }
        Insert: {
          ai_explanation?: string | null
          audit_id?: string | null
          category: string
          created_at?: string
          current_value?: string | null
          fix_type: string
          id?: string
          impact?: string
          page_url: string
          proposed_value: string
          reviewed_at?: string | null
          status?: string
        }
        Update: {
          ai_explanation?: string | null
          audit_id?: string | null
          category?: string
          created_at?: string
          current_value?: string | null
          fix_type?: string
          id?: string
          impact?: string
          page_url?: string
          proposed_value?: string
          reviewed_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_fixes_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "seo_audits"
            referencedColumns: ["id"]
          },
        ]
      }
      simulations: {
        Row: {
          appointment_id: string | null
          avg_fare: number
          created_at: string
          days_per_week: number
          email: string | null
          first_name: string | null
          formation_roi_months: number | null
          hours_per_day: number
          id: string
          last_name: string | null
          monthly_charges: number | null
          monthly_net: number | null
          monthly_revenue: number | null
          phone: string | null
          profession: string
          projection_12m: Json | null
          rides_per_hour: number
          scenario_optimized: Json | null
          scenario_standard: Json | null
          simulation_level: number
          source: string | null
          updated_at: string
          vehicle_type: string | null
        }
        Insert: {
          appointment_id?: string | null
          avg_fare?: number
          created_at?: string
          days_per_week?: number
          email?: string | null
          first_name?: string | null
          formation_roi_months?: number | null
          hours_per_day?: number
          id?: string
          last_name?: string | null
          monthly_charges?: number | null
          monthly_net?: number | null
          monthly_revenue?: number | null
          phone?: string | null
          profession?: string
          projection_12m?: Json | null
          rides_per_hour?: number
          scenario_optimized?: Json | null
          scenario_standard?: Json | null
          simulation_level?: number
          source?: string | null
          updated_at?: string
          vehicle_type?: string | null
        }
        Update: {
          appointment_id?: string | null
          avg_fare?: number
          created_at?: string
          days_per_week?: number
          email?: string | null
          first_name?: string | null
          formation_roi_months?: number | null
          hours_per_day?: number
          id?: string
          last_name?: string | null
          monthly_charges?: number | null
          monthly_net?: number | null
          monthly_revenue?: number | null
          phone?: string | null
          profession?: string
          projection_12m?: Json | null
          rides_per_hour?: number
          scenario_optimized?: Json | null
          scenario_standard?: Json | null
          simulation_level?: number
          source?: string | null
          updated_at?: string
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      get_simulation_count: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
