// Import the createClient function from the Supabase JavaScript SDK
import { createClient } from '@supabase/supabase-js';

// Load your Supabase project URL and anon public key from environment variables
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// Create a Supabase client instance using the URL and anon key
// This instance is used to interact with your Supabase database throughout the app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
