export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      house: {
        Row: {
          id: number;
          j_rating: number | null;
          m_rating: number | null;
          m2: number | null;
          name: string | null;
          place: string | null;
          price: number | null;
          real_state_agency_id: number | null;
          website: string | null;
        };
        Insert: {
          id?: number;
          j_rating?: number | null;
          m_rating?: number | null;
          m2?: number | null;
          name?: string | null;
          place?: string | null;
          price?: number | null;
          real_state_agency_id?: number | null;
          website?: string | null;
        };
        Update: {
          id?: number;
          j_rating?: number | null;
          m_rating?: number | null;
          m2?: number | null;
          name?: string | null;
          place?: string | null;
          price?: number | null;
          real_state_agency_id?: number | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'house_real_state_agency_id_fkey';
            columns: ['real_state_agency_id'];
            isOneToOne: false;
            referencedRelation: 'real_state_agency';
            referencedColumns: ['id'];
          }
        ];
      };
      house_tag: {
        Row: {
          house_id: number;
          tag_id: number;
        };
        Insert: {
          house_id: number;
          tag_id: number;
        };
        Update: {
          house_id?: number;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'house_tag_house_id_fkey';
            columns: ['house_id'];
            isOneToOne: false;
            referencedRelation: 'house';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'house_tag_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tag';
            referencedColumns: ['id'];
          }
        ];
      };
      real_state_agency: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      tag: {
        Row: {
          color: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
