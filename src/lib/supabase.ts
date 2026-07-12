import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://reieovanxlrqgdqnsyfq.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
