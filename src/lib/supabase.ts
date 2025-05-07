import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || !supabaseRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseRoleKey);