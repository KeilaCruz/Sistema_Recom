import { createClient } from "@supabase/supabase-js";

const proyectURL = "https://hifqtxbjpkysfmxuarsb.supabase.co";
const proyectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZnF0eGJqcGt5c2ZteHVhcnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDg1MjIsImV4cCI6MjAxNTU4NDUyMn0.adRiJ8ZF1KxurL8SV_IhaHFIzK3_FU1xCISDEjMX2wk";

export const supabase = createClient(proyectURL,proyectKey);