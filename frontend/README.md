# Sistema de Gestão Esportiva

Um sistema completo para gerenciamento de times esportivos, desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### 📊 Dashboard
- Visão geral das métricas do time
- Estatísticas de jogadores ativos
- Resumo financeiro mensal
- Indicadores de performance

### 👥 Gestão de Jogadores
- Cadastro completo de jogadores
- Sistema de jogadores ativos/inativos
- Edição de informações pessoais
- Visualização em cards ou tabela
- Busca e filtros avançados

### 💰 Gestão Mensal
- Controle de mensalidades
- Registro de jogadores avulsos
- Histórico de pagamentos
- Reajuste global de mensalidades
- Relatórios mensais detalhados

### 💳 Fluxo de Caixa
- Controle de receitas e despesas
- Categorização automática
- Gráficos e relatórios visuais
- Análise de tendências

### 🧾 Despesas
- Cadastro de despesas por categoria
- Edição e exclusão de registros
- Relatórios por período
- Controle orçamentário

### 👤 Perfil
- Configurações pessoais
- Informações do clube
- Dados de contato
- Personalização do sistema

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Temas**: next-themes
- **Gráficos**: Recharts
- **Notificações**: Sonner
- **Fontes**: Geist Sans & Mono
- **Analytics**: Vercel Analytics

## 📁 Estrutura do Projeto

\`\`\`
├── app/                    # App Router (Next.js 15)
│   ├── (pages)/           # Páginas da aplicação
│   │   ├── page.tsx       # Dashboard
│   │   ├── players/       # Gestão de jogadores
│   │   ├── monthly/       # Gestão mensal
│   │   ├── cashflow/      # Fluxo de caixa
│   │   ├── expenses/      # Despesas
│   │   └── profile/       # Perfil do usuário
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── modals/           # Modais da aplicação
│   ├── tables/           # Tabelas especializadas
│   └── forms/            # Formulários
├── lib/                  # Utilitários e configurações
│   ├── utils.ts          # Funções utilitárias
│   └── storage/          # Gerenciamento de dados locais
├── types/                # Definições de tipos TypeScript
└── hooks/                # Custom hooks
\`\`\`

## 🎨 Sistema de Design

### Cores
- **Primária**: Verde (#16a34a) - Representa crescimento e sucesso
- **Secundárias**: Azul, Laranja, Roxo para categorização
- **Neutras**: Escala de cinzas para textos e backgrounds

### Tipografia
- **Títulos**: Geist Sans (weights: 400, 500, 600, 700)
- **Corpo**: Geist Sans (weight: 400)
- **Código**: Geist Mono

### Temas
- **Claro**: Background branco, textos escuros
- **Escuro**: Background escuro, textos claros
- **Sistema**: Segue preferência do sistema operacional

## 💾 Armazenamento de Dados

Atualmente utiliza **localStorage** para persistência de dados:

- `players`: Lista de jogadores
- `monthlyData`: Dados mensais por período
- `expenses`: Registro de despesas
- `profile`: Informações do perfil
- `casualPlayers`: Jogadores avulsos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação
\`\`\`bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd sistema-gestao-esportiva

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Execute em modo de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

### Build para Produção
\`\`\`bash
# Gerar build otimizado
npm run build

# Executar versão de produção
npm start
\`\`\`

## 📱 Responsividade

O sistema é totalmente responsivo:
- **Mobile**: Layout adaptado para telas pequenas
- **Tablet**: Visualização otimizada para tablets
- **Desktop**: Interface completa com sidebar fixa

## 🔧 Configurações

### Variáveis de Ambiente
\`\`\`env
# Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
\`\`\`

### Personalização de Temas
Edite `app/globals.css` para personalizar:
- Cores do sistema
- Variáveis CSS customizadas
- Configurações do Tailwind

## 🎯 Próximos Passos

1. **Integração com Backend** (ver instruicoes.md)
2. **Autenticação de usuários**
3. **Backup automático de dados**
4. **Relatórios em PDF**
5. **Notificações push**
6. **App mobile (React Native)**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no GitHub
- Entre em contato via email
- Consulte a documentação técnica em `instruicoes.md`

---

**Desenvolvido com ❤️ para gestão esportiva eficiente**
