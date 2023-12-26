import { createClient } from "@supabase/supabase-js";

/*const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

*/
export const supabase = createClient("https://hifqtxbjpkysfmxuarsb.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZnF0eGJqcGt5c2ZteHVhcnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDg1MjIsImV4cCI6MjAxNTU4NDUyMn0.adRiJ8ZF1KxurL8SV_IhaHFIzK3_FU1xCISDEjMX2wk");