const fs = require('fs');
const env = {};
fs.readFileSync('./.env', 'utf8').split('\n').forEach(l => {
  const [key, ...value] = l.split('=');
  if (key && value.length > 0) {
    env[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function checkImirim() {
  const r = await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/generated_pages?slug=eq.imirim-conserto-geladeira&select=status,slug,client_id', {
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
  const data = await r.json();
  console.log(data);
}

checkImirim();
