import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://reieovanxlrqgdqnsyfq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaWVvdmFueGxycWdkcW5zeWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NzExMzgsImV4cCI6MjA5OTM0NzEzOH0.bOgC3L-z21lssiTgiPDzEMI9LiLhQJRTzczmkDnGGJY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
