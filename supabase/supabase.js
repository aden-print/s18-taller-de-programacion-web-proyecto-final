const { createClient } = supabase;

const SUPABASE_URL = "https://dibxvkunujlbynhtwbxe.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpYnh2a3VudWpsYnluaHR3YnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4MjU0MzcsImV4cCI6MjA0NTQwMTQzN30.Qg8Z2crWMgYgn_T99_wJyRgULtYshIza1-1IHG8w_ig";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
