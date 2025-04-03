import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://ocavikrvvvoiryilrvnk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jYXZpa3J2dnZvaXJ5aWxydm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDAyNzgsImV4cCI6MjA1OTI3NjI3OH0.A14wWRwgd4ZH8OvcsV28DkcEKUe2CdUogdLL9tYrwfg"
);