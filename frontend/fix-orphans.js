const supabaseUrl = 'https://yjbytgrhuvhqwwcxbaje.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqYnl0Z3JodXZocXd3Y3hiYWplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk5NDEzNCwiZXhwIjoyMDkzNTcwMTM0fQ.LFywep2jDpKKAImBNPK0nVEP5vnWXwgll7Mp3_9roaM';

async function fix() {
  console.log('🛠️ Iniciando correção de páginas órfãs...');
  
  try {
    // 1. Busca as campanhas para saber quem é o dono de cada uma
    const campRes = await fetch(`${supabaseUrl}/rest/v1/campaigns?select=id,client_id`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const campaigns = await campRes.json();

    if (!Array.isArray(campaigns)) {
      console.log('Erro ao buscar campanhas:', campaigns);
      return;
    }

    for (const c of campaigns) {
      if (!c.client_id) {
        console.warn(`⚠️ Campanha ${c.id} não tem client_id vinculado!`);
        continue;
      }

      // 2. Atualiza as páginas dessa campanha que estão com client_id NULL
      const updateRes = await fetch(`${supabaseUrl}/rest/v1/generated_pages?campaign_id=eq.${c.id}&client_id=is.null`, {
        method: 'PATCH',
        headers: { 
          'apikey': supabaseKey, 
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ client_id: c.client_id })
      });
      
      const updated = await updateRes.json();
      if (Array.isArray(updated) && updated.length > 0) {
        console.log(`✅ ${updated.length} páginas corrigidas para o cliente ${c.client_id} (Campanha: ${c.id})`);
      }
    }
    
    console.log('🚀 Processo de correção finalizado!');
  } catch (err) {
    console.error('Erro crítico:', err);
  }
}

fix();
