import { createServiceClient } from './lib/supabase';

async function fixMissingClientIds() {
  const supabase = createServiceClient();
  
  console.log('🔍 Buscando páginas sem client_id...');
  
  const { data: pages, error: fetchError } = await supabase
    .from('generated_pages')
    .select('id, campaign_id')
    .is('client_id', null);

  if (fetchError) {
    console.error('Erro ao buscar páginas:', fetchError);
    return;
  }

  if (!pages || pages.length === 0) {
    console.log('✅ Nenhuma página precisando de correção.');
    return;
  }

  console.log(`🛠️ Corrigindo ${pages.length} páginas...`);

  for (const page of pages) {
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('client_id')
      .eq('id', page.campaign_id)
      .single();

    if (campaign) {
      await supabase
        .from('generated_pages')
        .update({ client_id: campaign.client_id })
        .eq('id', page.id);
      console.log(`Page ${page.id} -> Client ${campaign.client_id}`);
    }
  }

  console.log('🚀 Correção concluída!');
}

fixMissingClientIds();
