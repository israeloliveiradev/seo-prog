const supabaseUrl = 'https://yjbytgrhuvhqwwcxbaje.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqYnl0Z3JodXZocXd3Y3hiYWplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk5NDEzNCwiZXhwIjoyMDkzNTcwMTM0fQ.LFywep2jDpKKAImBNPK0nVEP5vnWXwgll7Mp3_9roaM';

async function check() {
  console.log('🔍 Analisando integridade das Campanhas...');
  
  const campRes = await fetch(`${supabaseUrl}/rest/v1/campaigns?select=id,name,client_id`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  });
  const campaigns = await campRes.json();

  if (Array.isArray(campaigns)) {
    const ghosts = campaigns.filter(c => !c.client_id);
    console.log(`📊 Total de Campanhas: ${campaigns.length}`);
    console.log(`👻 Campanhas sem cliente (Ghosts): ${ghosts.length}`);
    
    if (ghosts.length > 0) {
      console.log('--- Detalhes das Fantasmas ---');
      console.log(JSON.stringify(ghosts, null, 2));
    } else {
      console.log('✅ Todas as campanhas estão devidamente vinculadas a clientes.');
    }
  }
}

check();
