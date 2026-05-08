const fs = require('fs');
const env = {};
fs.readFileSync('./.env', 'utf8').split('\n').forEach(l => {
  const [k, ...v] = l.split('=');
  if (k && v.length > 0) {
    env[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function listClients() {
  const r = await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/clients?select=name,subdomain,custom_domain', {
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
  const data = await r.json();
  console.log(data);
}

listClients();
