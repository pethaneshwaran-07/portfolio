import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yulexsxsqumfnvuqtzfi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGV4c3hzcXVtZm52dXF0emZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NTkzODksImV4cCI6MjEwNTIzNTM4OX0.ZVw1FA6K7w6S4dvjI5sDAPQQ1tWGDy1JQuPf2Ho1NN0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
