# 🚀 Playbook para Lançamento de Novas Trilhas

## Índice

1. [Preparação](#1-preparação)
2. [Configuração Técnica](#2-configuração-técnica)
3. [Conteúdo](#3-conteúdo)
4. [Marketing e Divulgação](#4-marketing-e-divulgação)
5. [Pós-Lançamento](#5-pós-lançamento)
6. [Checklist](#6-checklist)

---

## 1. Preparação (15 dias antes)

### 1.1 Definir a Trilha

| Item | Responsável | Prazo |
|------|-------------|-------|
| Título e tema | Franciele | D-15 |
| Descrição curta | Franciele | D-15 |
| Conteúdo programático | Franciele | D-12 |
| Preço | Franciele | D-10 |

### 1.2 Validar Público-alvo

```markdown
- Para quem é essa trilha?
- Qual o nível de conhecimento necessário?
- O que o aluno vai aprender?
- Qual o resultado esperado?
1.3 Criar Material
Estrutura das aulas

Exercícios práticos

Materiais complementares

Bônus exclusivos

2. Configuração Técnica (7 dias antes)
2.1 Criar Página da Trilha
bash
# 1. Adicionar ao script de geração
# Editar: scripts/generate-trilhas.sh

declare -A TRILHA_XX=(
    [num]="XX"
    [title]="Nome da Trilha"
    [description]="Descrição completa"
    [short]="Resumo curto"
    [topic]="Tópico principal"
    [date]="Mês/Ano"
)

TRILHAS=(01 02 ... XX)

# 2. Gerar a página
bash scripts/generate-trilhas.sh

# 3. Personalizar
code trilha-XX/index.html
2.2 Configurar Hotmart
Acesse: https://app.hotmart.com/

Criar novo produto:

Nome: "Nome da Trilha"

Preço: Definido

Categoria: Tecnologia/Programação

Tipo: Produto Digital

IMPORTANTE: Configurar Entrega

✅ Link para download (automático)

✅ Upload do conteúdo

✅ E-mail personalizado pós-compra

Obter link de checkout:

Produtos → Seu produto → Checkout → Link de vendas

Adicionar ao assets/js/hotmart-config.js:

javascript
novaTrilha: {
    id: 'trilha-XX',
    name: 'Nome da Trilha',
    price: 99,
    checkoutUrl: 'https://pay.hotmart.com/XXXXXX',
    utm: {
        source: 'site',
        medium: 'cta',
        campaign: 'trilha-xx',
        content: 'card_trilha',
        term: 'trilha_xx'
    }
}
2.3 Adicionar ao Sitemap
Editar sitemap.xml:

xml
<url>
    <loc>https://menteedados.github.io/trilha-XX/</loc>
    <lastmod>2026-06-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
</url>
2.4 Atualizar Landing Page
Editar index.html:

Adicionar card da nova trilha na grade

Atualizar contador de trilhas

3. Conteúdo (5 dias antes)
3.1 Estrutura da Página
A página da trilha deve conter:

html
1. Hero com título e descrição
2. Badge "Em Breve" ou "Lançada"
3. Descrição detalhada
4. Benefícios da trilha
5. O que o aluno vai aprender
6. Pré-requisitos
7. Preço e CTA
8. FAQ específico
9. Garantia
10. Autor/Instrutora
3.2 Imagens Necessárias
Imagem	Tamanho	Local
Hero	1200x400	assets/images/trilha-XX/
OG Image	1200x630	assets/images/og/
Card	600x400	assets/images/trilha-XX/
3.3 SEO
Atualizar meta tags:

html
<title>Trilha XX - Nome | Mente & Dados</title>
<meta name="description" content="Descrição para SEO (max 160 caracteres)">
<meta property="og:title" content="Trilha XX - Nome">
<meta property="og:description" content="Descrição para redes sociais">
3.4 Schema.org
Adicionar Product Schema:

javascript
// Em assets/js/schema-markup.js
function addNovaTrilhaSchema() {
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Trilha XX - Nome",
        "description": "Descrição do produto",
        "offers": {
            "@type": "Offer",
            "price": 99,
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
        }
    };
    addSchemaMarkup('product-trilha-xx', productSchema);
}
4. Marketing e Divulgação (3 dias antes)
4.1 Pré-Lançamento
Ação	Quando	Onde
Anúncio nas redes	D-3	Instagram/Medium
Email para waitlist	D-2	Email
Vídeo teaser	D-1	YouTube
4.2 Dia do Lançamento
Horário	Ação	Canal
08:00	Anúncio oficial	Instagram
10:00	Post no Medium	Medium
12:00	Story no Instagram	Instagram
15:00	Email para lista	Email
18:00	Vídeo no YouTube	YouTube
4.3 Pós-Lançamento
Dia	Ação
Dia 1	Agradecer primeiros compradores
Dia 2	Compartilhar depoimentos
Dia 3	Análise de vendas
Dia 7	Relatório de resultados
5. Pós-Lançamento (1 semana após)
5.1 Monitoramento
bash
# Verificar página
open https://menteedados.github.io/trilha-XX/

# Verificar analytics
# Google Analytics → Eventos → begin_checkout

# Verificar vendas
# Hotmart Dashboard
5.2 Métricas a Acompanhar
Número de vendas

Conversão (visitante → comprador)

Tempo médio na página

Taxa de rejeição

Feedback dos alunos

5.3 Atualizações Pós-Lançamento
Adicionar depoimentos reais

Ajustar preço se necessário

Melhorar FAQ com perguntas recebidas

Criar material bônus adicional

6. Checklist
✅ Pré-Lançamento (D-15 a D-3)
Tema e título definidos

Conteúdo programático criado

Material das aulas preparado

Preço definido

Página da trilha criada

Hotmart configurado

Sitemap atualizado

Imagens preparadas

SEO configurado

Schema.org implementado

✅ Lançamento (Dia)
Página publicada

Anúncio no Instagram

Post no Medium

Story no Instagram

Email enviado

Vídeo no YouTube publicado

Link na bio atualizado

✅ Pós-Lançamento (D+1 a D+7)
Agradecimentos enviados

Feedback coletado

Métricas analisadas

Ajustes realizados

Relatório gerado

📊 Template de Relatório de Lançamento
markdown
# Relatório de Lançamento - Trilha XX

## Data: DD/MM/YYYY

### Métricas
- Visualizações da página: XX
- Cliques no CTA: XX
- Vendas: XX
- Conversão: X%
- Receita: R$ XX

### Feedback dos Alunos
- Pontos positivos:
- Pontos a melhorar:

### Ações Futuras
- [ ] Ação 1
- [ ] Ação 2

### Próximos Passos
- [ ] Trilha XX+1
🔧 Troubleshooting
Problema	Solução
Página não abre	Verificar arquivo em trilha-XX/index.html
Hotmart não funciona	Verificar link em assets/js/hotmart-config.js
Imagens não carregam	Verificar caminho das imagens
SEO não aparece	Aguardar 24-48h para indexação
📎 Links Úteis
Google Search Console

Hotmart Dashboard

Instagram Business

YouTube Studio

