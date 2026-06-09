# 🔍 SEO Checklist - Mente & Dados

## ✅ Meta Tags por Página

### Página Principal (trilha-00/index.html)
- [x] Title: "Trilha 00 - Modelagem Mental para Engenharia de Dados | Mente & Dados"
- [x] Meta description: 156 caracteres
- [x] Canonical: https://menteedados.github.io/trilha-00/
- [x] Open Graph tags configuradas
- [x] Twitter Cards configurados

### Página E-book (trilha-00/ebook/index.html)
- [x] Title: "E-book Modelagem Mental - 232 páginas | Mente & Dados"
- [x] Meta description: 142 caracteres
- [x] Canonical: https://menteedados.github.io/trilha-00/ebook/
- [x] Open Graph com preço (product)
- [x] Twitter Cards configurados

### Página Caderno (trilha-00/caderno/index.html)
- [x] Title: "Caderno de Exercícios - 235 páginas | Mente & Dados"
- [x] Meta description: 148 caracteres
- [x] Canonical: https://menteedados.github.io/trilha-00/caderno/
- [x] Open Graph com preço (product)
- [x] Twitter Cards configurados

### Página Bundle (trilha-00/completo/index.html)
- [x] Title: "Bundle Completo - Teoria + Prática | Mente & Dados"
- [x] Meta description: 153 caracteres
- [x] Canonical: https://menteedados.github.io/trilha-00/completo/
- [x] Open Graph com preço (product)
- [x] Twitter Cards configurados

## ✅ Schema.org Markup

| Página | Product | Organization | WebSite | Course | Breadcrumb |
|--------|---------|--------------|---------|--------|------------|
| Principal | ❌ | ✅ | ✅ | ✅ | ✅ |
| E-book | ✅ | ✅ | ✅ | ❌ | ✅ |
| Caderno | ✅ | ✅ | ✅ | ❌ | ✅ |
| Bundle | ✅ | ✅ | ✅ | ❌ | ✅ |

## ✅ Arquivos SEO

- [x] robots.txt configurado
- [x] sitemap.xml criado
- [x] Canonical URLs em todas as páginas
- [x] Meta viewport para responsividade
- [x] Favicon configurado

## 🔧 Ferramentas para Testar

### 1. Validador de Meta Tags
https://metatags.io/
- Cole a URL de cada página
- Verifique preview do Facebook e Twitter

### 2. Google Rich Results Test
https://search.google.com/test/rich-results
- Teste o Schema.org markup de cada página
- Verifique se Product aparece corretamente

### 3. Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/
- Cole cada URL
- Clique em "Scrape Again" para atualizar cache

### 4. Twitter Card Validator
https://cards-dev.twitter.com/validator
- Valide os Twitter Cards de cada página

### 5. Google Search Console
https://search.google.com/search-console/
- Adicione a propriedade do site
- Envie o sitemap.xml

### 6. Lighthouse SEO Audit
```bash
npx lighthouse https://menteedados.github.io/trilha-00/ --only-categories=seo --view