# 🧠 Mente & Dados - Site Oficial

> Site institucional e de vendas para produtos digitais do canal Mente & Dados

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://menteedados.github.io/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-blue)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-green)](https://developers.google.com/web/tools/lighthouse)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Setup](#instalação-e-setup)
- [Como Contribuir](#como-contribuir)
- [Deploy](#deploy)
- [Monitoramento](#monitoramento)
- [Documentação Adicional](#documentação-adicional)
- [Licença](#licença)

---

## 📖 Sobre o Projeto

O site da Mente & Dados é uma plataforma centralizada para produtos digitais de engenharia de dados, incluindo e-books, cursos e trilhas de aprendizado.

**Objetivos:**
- Consolidar presença digital com URLs permanentes
- Criar jornada de vendas estruturada
- Estabelecer a marca como referência em engenharia de dados

**Público-alvo:**
- Iniciantes e profissionais em transição para engenharia de dados
- Seguidores do canal no YouTube
- Empresas buscando capacitação

---

## 🛠️ Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| HTML5 | Estrutura semântica |
| CSS3 | Design system com variáveis, Grid, Flexbox |
| JavaScript | Funcionalidades interativas (vanilla) |
| GitHub Pages | Hospedagem estática |
| Google Fonts | Tipografia (Playfair Display, Source Serif 4, DM Mono) |
| Google Analytics 4 | Tracking de usuários e eventos |
| Meta Pixel | Remarketing |
| Schema.org | Rich snippets para SEO |

---

## 📁 Estrutura do Projeto
menteedados.github.io/
├── index.html # Landing page principal
├── 404.html # Página de erro personalizada
├── sitemap.xml # Sitemap para SEO
├── robots.txt # Configuração de crawling
├── .gitignore # Arquivos ignorados pelo Git
├── README.md # Esta documentação
├── assets/
│ ├── css/ # Arquivos de estilo
│ │ ├── main.css # CSS principal
│ │ ├── components.css # Componentes reutilizáveis
│ │ ├── cross-selling.css # Estilos de upsell
│ │ └── responsive.css # Media queries
│ ├── js/ # JavaScript
│ │ ├── main.js # Inicialização principal
│ │ ├── analytics.js # GA4 + Meta Pixel
│ │ ├── hotmart-config.js # Links dos produtos
│ │ ├── schema-markup.js # JSON-LD para SEO
│ │ └── conversion-optimization.js # Otimizações
│ └── images/ # Imagens do site
├── trilha-00/ # Página da Trilha 00
│ ├── index.html # Página principal
│ ├── ebook/index.html # Página do E-book
│ ├── caderno/index.html # Página do Caderno
│ └── completo/index.html # Página do Bundle
├── trilha-01/ a trilha-13/ # Placeholders (em breve)
├── sobre/ # Página Sobre
├── contato/ # Página Contato
├── docs/ # Documentação técnica
│ ├── HOTMART_SETUP_GUIDE.md
│ ├── GOOGLE_FORMS_SETUP.md
│ ├── SEARCH_CONSOLE_SETUP.md
│ └── UPTIMEROBOT_SETUP.md
├── scripts/ # Scripts de automação
│ ├── generate-trilhas.sh # Gera páginas de trilhas
│ ├── pre-deploy-check.sh # Validação pré-deploy
│ └── smoke-test.sh # Teste pós-deploy
└── reports/ # Relatórios
├── deploy/ # Relatórios de deploy
├── accessibility/ # Relatórios de acessibilidade
└── performance-report.html # Relatório de performance

text

---

## 🚀 Instalação e Setup

### Pré-requisitos
- Git
- VS Code (recomendado)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Clone o repositório

```bash
git clone https://github.com/menteedados/menteedados.github.io.git
cd menteedados.github.io
Executar localmente
Opção 1: Live Server (VS Code)

Abra o projeto no VS Code

Clique com botão direito no index.html

Selecione "Open with Live Server"

Opção 2: Python HTTP Server

bash
python3 -m http.server 8000
Acesse: http://localhost:8000

Opção 3: Node.js http-server

bash
npx http-server
📝 Como Contribuir
Branches
Branch	Descrição
main	Produção (deploy automático)
dev	Desenvolvimento ativo
Workflow
Sempre trabalhe na branch dev

bash
git checkout dev
git pull origin dev
Crie uma branch para sua feature

bash
git checkout -b feature/nome-da-feature
Faça suas alterações e commit

bash
git add .
git commit -m "feat: descrição da alteração"
Push para o repositório

bash
git push origin feature/nome-da-feature
Crie um Pull Request para a branch dev

Após aprovação, merge para dev

Padrão de Commits
Use Conventional Commits:

Tipo	Descrição
feat	Nova funcionalidade
fix	Correção de bug
docs	Documentação
style	Formatação, estilos
refactor	Refatoração
test	Testes
chore	Tarefas de manutenção
Exemplo:

text
feat(trilha): add upsell box for bundle
fix(seo): correct canonical URL for product pages
docs(readme): update installation guide
🌐 Deploy
Deploy Automático (GitHub Pages)
O deploy é automático ao fazer push para a branch main:

bash
git checkout main
git merge dev
git push origin main
Verificar Deploy
Aguarde 1-2 minutos

Acesse: https://menteedados.github.io

Execute o smoke test:

bash
bash scripts/smoke-test.sh
Pré-requisitos para Deploy
Execute a validação pré-deploy:

bash
bash scripts/pre-deploy-check.sh
📊 Monitoramento
Ferramenta	Função	Link
UptimeRobot	Monitor de disponibilidade	Dashboard
Sentry	Tracking de erros	Dashboard
Google Analytics	Métricas de usuário	Dashboard
Search Console	Indexação e SEO	Dashboard
🔧 Manutenção
Atualizar Conteúdo
Atualizar preços
Edite assets/js/hotmart-config.js:

javascript
price: 87, // Altere o valor
Adicionar uma nova trilha
Use o template: trilha-XX-template.html

Gere a página:

bash
bash scripts/generate-trilhas.sh
Atualizar imagens
Coloque as imagens em assets/images/

Use formatos WebP/AVIF para melhor performance

Execute a otimização:

bash
node scripts/optimize-images.js
Backup
bash
# Criar backup manual
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
cp -r . ../menteedados_backup_$TIMESTAMP
📚 Documentação Adicional
Documento	Descrição
Hotmart Setup	Configuração dos produtos
Google Forms	Formulários de captura
Search Console	Submissão aos buscadores
UptimeRobot	Monitoramento de uptime
Sentry	Error tracking
🐛 Troubleshooting
Problemas comuns
Problema	Solução
Site não carrega	Verifique o deploy no GitHub Pages
Links do Hotmart não funcionam	Verifique assets/js/hotmart-config.js
Erros de CSS	Limpe o cache do navegador
404 em páginas	Verifique se o arquivo existe na estrutura
Verificar logs
bash
# Verificar deploy no GitHub
# Acesse: Settings → Pages → GitHub Actions

# Verificar arquivos
ls -la trilha-*/index.html
📄 Licença
© 2026 Mente & Dados - Franciele Amaral. Todos os direitos reservados.

👩‍💻 Autora
Franciele Amaral

YouTube: @MenteeDados

Instagram: @menteedados.oficial

Medium: @menteedados

🙏 Agradecimentos
Todos os alunos que contribuíram com feedback

Comunidade de engenharia de dados

Tech Leads Club pela metodologia TLC-spec-driven

Status do Projeto: 🟢 Produção

Última atualização: Junho 2026

