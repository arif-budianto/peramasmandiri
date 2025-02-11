import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cciikicxagltholyagoj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaWlraWN4YWdsdGhvbHlhZ29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTY2NTMsImV4cCI6MjA1NDU3MjY1M30.4GmHp35EDcg7sCdW2p4dCUQopH1y9XTQAUhe76bCB4s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
