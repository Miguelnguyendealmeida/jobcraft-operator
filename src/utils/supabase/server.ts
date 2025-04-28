import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const supabaseServer = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        'x-my-custom-header': 'my-app-name',
      },
    },
  });
  return supabase;
};
