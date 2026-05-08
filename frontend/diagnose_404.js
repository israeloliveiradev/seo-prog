const fs = require('fs');

const envContent = fs.readFileSync('./.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function diagnose() {
  const site = 'abril';
  const slug = 'sp-teste';

  try {
    const clientUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients?subdomain=eq.${site}&select=id`;
    const clientRes = await fetch(clientUrl, {
      headers: { 'apikey': env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }
    });
    const clients = await clientRes.json();
    const client = clients[0];

    const pageUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/generated_pages?client_id=eq.${client.id}&slug=eq.${slug}&select=status,last_error`;
    const pageRes = await fetch(pageUrl, {
      headers: { 'apikey': env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }
    });
    const pages = await pageRes.json();
    console.log('Status and Error:', pages[0]);
  } catch (err) {
    console.error('Diagnosis failed:', err.message);
  }
}

diagnose();
