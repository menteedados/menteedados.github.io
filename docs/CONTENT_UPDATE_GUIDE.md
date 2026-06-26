# 📝 Guia de Atualização de Conteúdo - Mente & Dados

## Índice

1. [Atualizar Preços](#atualizar-preços)
2. [Atualizar Imagens](#atualizar-imagens)
3. [Atualizar Textos](#atualizar-textos)
4. [Adicionar Nova Trilha](#adicionar-nova-trilha)
5. [Atualizar Metadados SEO](#atualizar-metadados-seo)
6. [Atualizar Formulários](#atualizar-formulários)

---

## 💰 Atualizar Preços

### Local onde os preços estão definidos

Todos os preços estão centralizados no arquivo:
assets/js/hotmart-config.js

text

### Como atualizar

1. Abra o arquivo:
```bash
code assets/js/hotmart-config.js
Localize a seção do produto desejado:

javascript
// 📘 PRODUTO 1: E-book - R$ 87
ebook: {
  id: 'ebook-trilha-00',
  name: 'E-book - Modelagem Mental Antes do Código',
  price: 87,  // ← ALTERE AQUI O PREÇO
  checkoutUrl: 'https://pay.hotmart.com/XXXXXX',
  // ...
}
Mude o valor price

Salve o arquivo

Commit e deploy:

bash
git add assets/js/hotmart-config.js
git commit -m "feat(price): update ebook price to R$ XX"
git push origin dev
Produtos e localizações
Produto	Arquivo	Linha
E-book	assets/js/hotmart-config.js	~15
Caderno	assets/js/hotmart-config.js	~28
Bundle	assets/js/hotmart-config.js	~41
Atualizar preço exibido no HTML
Os preços também aparecem nos cards das páginas:

trilha-00/index.html

trilha-00/ebook/index.html

trilha-00/caderno/index.html

trilha-00/completo/index.html

Busque por R$ no arquivo e atualize o valor exibido.

🖼️ Atualizar Imagens
Estrutura das imagens
text
assets/images/
├── og/           # Imagens para Open Graph (1200x630)
├── mockups/      # Mockups dos produtos
└── icons/        # Ícones do site
Adicionar nova imagem
Coloque a imagem no diretório apropriado

Otimize a imagem:

bash
# Instalar sharp
npm install -g sharp

# Executar otimização
node scripts/optimize-images.js
Atualizar imagem OG
Crie uma imagem de 1200x630px

Salve em assets/images/og/

Atualize a referência no arquivo HTML:

html
<meta property="og:image" content="https://menteedados.github.io/assets/images/og/nova-imagem.jpg">
Formato recomendado
Uso	Formato	Tamanho
OG Images	PNG/JPG	1200x630
Mockups	PNG	600x800
Ícones	SVG/PNG	32x32
Fotos	WebP	Variável
📝 Atualizar Textos
Páginas principais
Página	Arquivo	O que editar
Home	index.html	Hero, descrições, depoimentos
Trilha 00	trilha-00/index.html	Hero, descrições, cards
E-book	trilha-00/ebook/index.html	Descrição do produto
Caderno	trilha-00/caderno/index.html	Descrição do produto
Bundle	trilha-00/completo/index.html	Descrição do produto
Sobre	sobre/index.html	História, missão, valores
Contato	contato/index.html	Mensagens de texto
Como editar
Abra o arquivo HTML no VS Code

Localize o texto desejado (Ctrl+F)

Edite o texto entre as tags

Salve e commit

Exemplo: Alterar depoimento
html
<!-- Antes -->
<p class="depoimento-text">
  "A Trilha 00 mudou completamente minha visão sobre dados."
</p>

<!-- Depois -->
<p class="depoimento-text">
  "Este conteúdo me ajudou a conseguir minha primeira vaga em dados!"
</p>
Onde encontrar textos
Seção	Localização
Hero	<section class="hero">
Cards	<div class="choice-card">
Depoimentos	<div class="depoimento-card">
FAQ	<div class="faq-item">
Footer	<footer class="footer">
🆕 Adicionar Nova Trilha
Passo 1: Atualizar lista de trilhas
Edite o arquivo scripts/generate-trilhas.sh:

bash
declare -A TRILHA_14=(
    [num]="14"
    [title]="Nova Trilha"
    [description]="Descrição da nova trilha"
    [short]="Resumo curto"
    [topic]="Tópico principal"
    [date]="Mês/Ano"
)

TRILHAS=(01 02 03 04 05 06 07 08 09 10 11 12 13 14)
Passo 2: Gerar a página
bash
bash scripts/generate-trilhas.sh
Passo 3: Personalizar
Edite o arquivo gerado:

text
trilha-14/index.html
Passo 4: Atualizar sitemap
Adicione a nova URL no sitemap.xml:

xml
<url>
    <loc>https://menteedados.github.io/trilha-14/</loc>
    <lastmod>2026-06-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
</url>
Passo 5: Commit e deploy
bash
git add trilha-14/ sitemap.xml
git commit -m "feat(trilha): add Trilha 14 - Nova Trilha"
git push origin dev
🔍 Atualizar Metadados SEO
Meta tags por página
Cada página tem suas próprias meta tags no <head>:

html
<!-- Título e Descrição -->
<title>Trilha 00 - Modelagem Mental | Mente & Dados</title>
<meta name="description" content="...">

<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
Como atualizar
Abra o arquivo HTML

Localize a seção <head>

Atualize as tags necessárias

Salve e commit

Páginas principais e seus arquivos
Página	Arquivo
Home	index.html
Trilha 00	trilha-00/index.html
E-book	trilha-00/ebook/index.html
Caderno	trilha-00/caderno/index.html
Bundle	trilha-00/completo/index.html
Sobre	sobre/index.html
📋 Atualizar Formulários
Localização dos formulários
Formulário	Arquivo	Ação
Contato	contato/index.html	Envia para FormSubmit
Waitlist	trilha-XX/index.html	Envia para Google Forms
Atualizar email do FormSubmit
No arquivo contato/index.html:

javascript
const formSubmitUrl = 'https://formsubmit.co/ajax/SEU_EMAIL_AQUI';
Atualizar Google Forms
No arquivo trilha-XX-template.html:

javascript
const googleFormUrl = 'https://docs.google.com/forms/d/e/SEU_FORM_ID_HERE/formResponse';
const entryId = 'ENTRY_ID_HERE';
Como obter o ID do Google Forms
Abra seu formulário no Google Forms

Clique em "Enviar" → Link

Copie o URL:

text
https://docs.google.com/forms/d/e/SEU_FORM_ID_HERE/viewform
Extraia o SEU_FORM_ID_HERE

Como obter os Entry IDs
Abra o formulário

Abra F12 → Network

Submeta o formulário

Encontre a requisição formResponse

Veja os parâmetros entry.XXXXXXXXXX

✅ Checklist de Atualização
Antes de atualizar
Faça backup do arquivo

Teste em ambiente local

Valide as alterações

Depois de atualizar
Commit com mensagem clara

Push para dev

Teste em produção

Atualize documentação se necessário

Testes obrigatórios
Página carrega sem erros

Links funcionam

Formulários enviam dados

Responsividade ok

Lighthouse > 90

🆘 Suporte
Em caso de dúvidas, contate:

Email: contato@menteedados.com

Documentação: /docs/

GitHub: https://github.com/menteedados/menteedados.github.io

