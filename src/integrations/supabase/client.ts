// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zixwilqzqivroddhgjqv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeHdpbHF6cWl2cm9kZGhnanF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NjE5NTIsImV4cCI6MjA1MTIzNzk1Mn0.4uVdeIxZbMtkaKBT0Ykx0yHmcmxYPdl-rYF-uG2Kh5M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);