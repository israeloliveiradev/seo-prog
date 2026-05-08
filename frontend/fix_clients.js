const fs = require('fs');
const env = {};
fs.readFileSync('./.env', 'utf8').split('\n').forEach(l => {
  const [k, ...v] = l.split('=');
  if (k && v.length > 0) {
    env[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function fixClients() {
  const r = await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/clients?custom_domain=eq.', {
    method: 'PATCH',
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ custom_domain: null })
  });
  const data = await r.json();
  console.log('Fixed clients:', data);
}

fixClients();
