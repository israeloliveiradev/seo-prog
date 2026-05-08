const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './frontend/.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data: clients } = await supabase.from('clients').select('*');
  console.log('Clients:', clients);
  
  const { data: pages } = await supabase.from('generated_pages').select('*');
  console.log('Pages:', pages);
}

check();
