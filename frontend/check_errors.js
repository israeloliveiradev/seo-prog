const fs = require('fs');

const envContent = fs.readFileSync('./.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function checkAllErrors() {
  try {
    const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/generated_pages?status=eq.ERROR&select=id,slug,status,ai_content`;
    const res = await fetch(url, {
      headers: { 'apikey': env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }
    });
    const errors = await res.json();
    
    if (errors.error) {
        console.error('Supabase error:', errors.error);
        return;
    }

    console.log(`Found ${errors.length} pages in ERROR status.`);
    
    const withContent = errors.filter(e => e.ai_content !== null && e.ai_content !== '');
    console.log(`${withContent.length} of them have some content.`);
    
    if (withContent.length > 0) {
        console.log('Sample slugs with content but ERROR status:', withContent.slice(0, 5).map(e => e.slug));
    }
  } catch (err) {
    console.error('Check failed:', err.message);
  }
}

checkAllErrors();
