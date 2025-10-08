// Script de debug para testar importação de jogadores
// Execute este script no console do navegador (F12) na página do dashboard mensal

async function debugImportPlayers() {
  console.log('🔍 Iniciando debug da importação de jogadores...');
  
  // 1. Verificar se estamos na página correta
  const currentUrl = window.location.href;
  console.log('📍 URL atual:', currentUrl);
  
  // 2. Verificar se há token de autenticação
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('futebol_token='))
    ?.split('=')[1];
  
  console.log('🔑 Token encontrado:', token ? 'SIM' : 'NÃO');
  
  if (!token) {
    console.error('❌ Token de autenticação não encontrado!');
    return;
  }
  
  // 3. Testar requisição para listar períodos mensais
  console.log('📅 Testando listagem de períodos mensais...');
  try {
    const periodsResponse = await fetch('/api/monthly-periods', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📅 Status da resposta (períodos):', periodsResponse.status);
    const periodsData = await periodsResponse.json();
    console.log('📅 Dados dos períodos:', periodsData);
    
    if (!periodsData.data || periodsData.data.length === 0) {
      console.error('❌ Nenhum período mensal encontrado!');
      return;
    }
    
    const currentPeriod = periodsData.data[0]; // Pegar o primeiro período
    console.log('📅 Período atual selecionado:', currentPeriod);
    
    // 4. Testar requisição para listar jogadores
    console.log('👥 Testando listagem de jogadores...');
    const playersResponse = await fetch('/api/players?status=active&page=1&per_page=100', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('👥 Status da resposta (jogadores):', playersResponse.status);
    const playersData = await playersResponse.json();
    console.log('👥 Dados dos jogadores:', playersData);
    
    if (!playersData.data || playersData.data.length === 0) {
      console.error('❌ Nenhum jogador ativo encontrado!');
      return;
    }
    
    // 5. Testar importação de jogadores
    const playerIds = playersData.data.slice(0, 2).map(p => p.id); // Pegar os 2 primeiros jogadores
    console.log('🎯 IDs dos jogadores para importar:', playerIds);
    
    const importData = {
      player_ids: playerIds
    };
    
    console.log('📤 Enviando requisição de importação...');
    console.log('📤 URL:', `/api/monthly-periods/${currentPeriod.id}/players`);
    console.log('📤 Dados:', importData);
    
    const importResponse = await fetch(`/api/monthly-periods/${currentPeriod.id}/players`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(importData)
    });
    
    console.log('📤 Status da resposta (importação):', importResponse.status);
    console.log('📤 Headers da resposta:', [...importResponse.headers.entries()]);
    
    const importResult = await importResponse.json();
    console.log('📤 Resultado da importação:', importResult);
    
    if (importResponse.ok) {
      console.log('✅ Importação realizada com sucesso!');
    } else {
      console.error('❌ Erro na importação:', importResult);
    }
    
  } catch (error) {
    console.error('💥 Erro durante o debug:', error);
  }
}

// Executar o debug
debugImportPlayers();