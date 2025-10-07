// Script de teste para verificar login e cookies no frontend
// Execute este script no console do navegador após abrir http://localhost:3000/landing

async function testLogin() {
    console.log('🔍 Testando login no frontend...');
    
    // Verificar se estamos na página correta
    if (!window.location.href.includes('localhost:3000')) {
        console.error('❌ Abra http://localhost:3000/landing primeiro');
        return;
    }
    
    // Limpar cookies existentes
    document.cookie = 'futebol_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();
    console.log('🧹 Cookies e localStorage limpos');
    
    // Fazer login via API
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Login bem-sucedido:', data);
        
        // Simular o que o AuthService faz
        const token = data.access_token;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        
        // Definir cookie (sem secure para HTTP)
        const cookieString = `futebol_token=${token}; expires=${expirationDate.toUTCString()}; path=/; samesite=lax`;
        document.cookie = cookieString;
        
        // Definir localStorage
        localStorage.setItem('futebol_auth', JSON.stringify({
            user: data.user,
            isAuthenticated: true
        }));
        
        console.log('🍪 Cookie definido:', cookieString);
        console.log('💾 localStorage definido');
        
        // Verificar se o cookie foi definido
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});
        
        if (cookies.futebol_token) {
            console.log('✅ Cookie futebol_token encontrado:', cookies.futebol_token.substring(0, 50) + '...');
        } else {
            console.error('❌ Cookie futebol_token NÃO encontrado');
        }
        
        // Testar API com token
        console.log('🔍 Testando API com token...');
        const apiResponse = await fetch('http://localhost:5000/api/monthly-periods?month=10&year=2025', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            console.log('✅ API funcionando com token:', apiData.length, 'períodos encontrados');
        } else {
            console.error('❌ Erro na API:', apiResponse.status, apiResponse.statusText);
        }
        
        // Redirecionar para dashboard
        console.log('🚀 Redirecionando para dashboard...');
        window.location.href = '/dashboard';
        
    } catch (error) {
        console.error('❌ Erro no login:', error);
    }
}

// Executar teste automaticamente
testLogin();