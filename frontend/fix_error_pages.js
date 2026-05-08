const fs = require('fs');
const env = {};
fs.readFileSync('./.env', 'utf8').split('\n').forEach(l => {
  const [k, ...v] = l.split('=');
  if (k && v.length > 0) {
    env[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function fixErrorPages() {
  const fetchUrl = env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/generated_pages?status=eq.ERROR&select=id,ai_content';
  const res = await fetch(fetchUrl, {
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
  const pages = await res.json();
  console.log('Error pages found:', pages.length);
  
  const toFix = pages.filter(p => p.ai_content && p.ai_content.length > 50);
  console.log('Pages with content to fix:', toFix.length);

  for (const p of toFix) {
    await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/generated_pages?id=eq.' + p.id, {
      method: 'PATCH',
      headers: {
        'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': 'Bearer ' + env.SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'COMPLETED', last_error: null })
    });
  }
  console.log('Fix complete.');
}

fixErrorPages();
