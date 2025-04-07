import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://ocavikrvvvoiryilrvnk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jYXZpa3J2dnZvaXJ5aWxydm5rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzcwMDI3OCwiZXhwIjoyMDU5Mjc2Mjc4fQ.GCOsSTD0v9dvUquFejxk3SFzdaB3Dih2bzmYJ9rkjN8"
);