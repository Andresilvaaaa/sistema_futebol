# 🔧 Diagnóstico VPS - Problema Porta 8080

## 📊 **ANÁLISE ATUAL**

### ✅ **O que está funcionando:**
- ✅ **Backend**: `http://31.97.166.28:5001/api/health` → **FUNCIONANDO**
- ✅ **SSH**: Acesso root funcionando
- ✅ **VPS**: Ubuntu 24.04 + Easypanel ativo

### ❌ **O que NÃO está funcionando:**
- ❌ **Frontend**: `http://31.97.166.28:8080` → **FALHA DE CONEXÃO**

### 🔍 **DNS Configurado (Correto):**
- ✅ **CNAME**: `www` → `esporteflowpro.com.br` (TTL: 300)

---

## 🚨 **DIAGNÓSTICO IMEDIATO**

### **Problema Identificado:**
O **frontend não está rodando na porta 8080** ou está bloqueado.

### **Possíveis Causas:**
1. **Container frontend não iniciou**
2. **Porta 8080 bloqueada no firewall**
3. **Easypanel interferindo nas portas**
4. **Docker não mapeou a porta corretamente**

---

## 🔧 **COMANDOS DE DIAGNÓSTICO**

### **1. Verificar Containers Rodando**
```bash
# No VPS (SSH):
docker ps -a

# Verificar se frontend está UP
docker ps | grep frontend
```

### **2. Verificar Logs do Frontend**
```bash
# Logs do container frontend
docker logs sistema-futebol-frontend-1

# Logs em tempo real
docker logs -f sistema-futebol-frontend-1
```

### **3. Verificar Portas Abertas**
```bash
# Verificar se porta 8080 está sendo usada
netstat -tlnp | grep 8080

# Verificar todas as portas Docker
docker port sistema-futebol-frontend-1
```

### **4. Verificar Firewall**
```bash
# Status do UFW
sudo ufw status

# Verificar iptables
sudo iptables -L -n
```

### **5. Verificar Easypanel**
```bash
# Verificar se Easypanel está usando porta 8080
sudo netstat -tlnp | grep :8080
```

---

## 🛠️ **SOLUÇÕES RÁPIDAS**

### **Solução 1: Reiniciar Containers**
```bash
# Parar todos os containers
docker-compose -f docker-compose.prod.yml down

# Iniciar novamente
docker-compose -f docker-compose.prod.yml up -d

# Verificar status
docker ps
```

### **Solução 2: Verificar Mapeamento de Portas**
```bash
# Verificar docker-compose.prod.yml
cat docker-compose.prod.yml | grep -A 5 -B 5 "8080"
```

### **Solução 3: Liberar Porta no Firewall**
```bash
# Abrir porta 8080
sudo ufw allow 8080

# Abrir porta 5001 (backend)
sudo ufw allow 5001

# Recarregar firewall
sudo ufw reload
```

### **Solução 4: Usar Porta Alternativa**
Se porta 8080 estiver ocupada pelo Easypanel:
```bash
# Editar docker-compose.prod.yml
# Mudar de 8080:3000 para 8081:3000
```

---

## 🔍 **COMANDOS PARA EXECUTAR AGORA**

### **Execute estes comandos no VPS (em ordem):**

```bash
# 1. Verificar containers
echo "=== CONTAINERS RODANDO ==="
docker ps

# 2. Verificar logs do frontend
echo "=== LOGS FRONTEND ==="
docker logs sistema-futebol-frontend-1 --tail 20

# 3. Verificar portas
echo "=== PORTAS ABERTAS ==="
netstat -tlnp | grep -E "(8080|5001)"

# 4. Verificar firewall
echo "=== STATUS FIREWALL ==="
sudo ufw status

# 5. Verificar se Easypanel usa porta 8080
echo "=== PROCESSOS PORTA 8080 ==="
sudo lsof -i :8080
```

---

## 🎯 **PRÓXIMOS PASSOS BASEADOS NO RESULTADO**

### **Se container não estiver rodando:**
```bash
docker-compose -f docker-compose.prod.yml up -d frontend
```

### **Se porta estiver bloqueada:**
```bash
sudo ufw allow 8080
sudo ufw reload
```

### **Se Easypanel estiver usando porta 8080:**
- Mudar para porta 8081 no docker-compose.prod.yml
- Ou configurar Easypanel para usar outra porta

### **Se logs mostrarem erro:**
- Analisar erro específico
- Verificar variáveis de ambiente
- Verificar build da imagem

---

## 📋 **CHECKLIST DE VERIFICAÇÃO**

- [ ] Container frontend está rodando (`docker ps`)
- [ ] Logs do frontend sem erros críticos
- [ ] Porta 8080 está livre ou mapeada corretamente
- [ ] Firewall permite conexões na porta 8080
- [ ] Easypanel não está conflitando com a porta
- [ ] Imagem do frontend foi baixada corretamente

---

## 🚀 **COMANDO RÁPIDO DE TESTE**

```bash
# Teste completo em uma linha:
docker ps && docker logs sistema-futebol-frontend-1 --tail 10 && netstat -tlnp | grep 8080 && curl -I http://localhost:8080
```

---

**Execute os comandos de diagnóstico e me envie os resultados!**