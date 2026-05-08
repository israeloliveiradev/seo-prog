const fs = require('fs');
const env = {};
fs.readFileSync('./.env', 'utf8').split('\n').forEach(l => {
  const [key, ...value] = l.split('=');
  if (key && value.length > 0) {
    env[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function checkContent() {
  const r = await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/generated_pages?slug=eq.imirim-conserto-geladeira&select=ai_content', {
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
  const data = await r.json();
  if (data[0]) {
    console.log('Content length:', data[0].ai_content.length);
    console.log('Content snippet:', data[0].ai_content.substring(0, 200));
  } else {
    console.log('Page not found');
  }
}

checkContent();
