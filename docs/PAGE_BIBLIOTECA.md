
# 📚 DOCUMENTAÇÃO ATUALIZADA - BIBLIOTECA MENTE & DADOS

## 🗂️ Estrutura de Pastas (ATUAL)

```
menteedados.github.io/
│
├── aprender/                                    ← PASTA PRINCIPAL DA BIBLIOTECA
│   ├── index.html                               ← Página que lista todas as trilhas
│   │
│   ├── trilha-00-fundamentos/                   ← PASTA DA TRILHA 00
│   │   ├── index.html                           ← OBRIGATÓRIO (página da trilha)
│   │   └── data.json                            ← OBRIGATÓRIO (dados da trilha)
│   │
│   ├── trilha-01-sql/                           ← PASTA DA TRILHA 01
│   │   ├── index.html
│   │   └── data.json
│   │
│   └── ... (até trilha-13-carreira/)
│
└── scripts/
    ├── template-trilha/                         ← PASTA DE TEMPLATES
    │   ├── data.json                            ← Template do data.json
    │   └── trilha-template_conteudo.html        ← Template do index.html
    │
    └── trilha_nova_conteudo.sh                  ← Script para criar nova trilha
```

---

## 📋 OBRIGATÓRIO: O que cada pasta DEVE ter

| Arquivo | Obrigatório? | Onde está | O que é |
|---------|--------------|-----------|---------|
| `index.html` | ✅ **SIM** | `scripts/template-trilha/trilha-template_conteudo.html` | Página da trilha (busca `data.json`) |
| `data.json` | ✅ **SIM** | `scripts/template-trilha/data.json` | Dados da trilha (título, descrição, aulas) |

**Sem esses 2 arquivos, a trilha NÃO aparece na biblioteca!**

---

## 🎯 Como funciona a verificação (no `aprender/index.html`)

```javascript
async function verificarPaginaExiste(url) {
    try {
        // Verifica se o arquivo index.html existe DENTRO da pasta
        const response = await fetch(`${url}index.html`, { 
            method: 'HEAD',
            cache: 'no-cache'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}
```

| Situação | `index.html` existe? | Card na biblioteca |
|----------|---------------------|-------------------|
| Trilha pronta | ✅ Sim | 🟢 Colorido + clicável |
| Trilha vazia | ❌ Não | 🟡 Cinza + não clicável |

---

## 🚀 Como criar uma NOVA TRILHA

### Usando o script (recomendado)

```bash
bash scripts/trilha_nova_conteudo.sh \
    "01" \
    "sql-para-dados" \
    "SQL para Dados" \
    "Aprenda SQL para executar seu desenho de dados." \
    "SQL e Bancos de Dados" \
    "Agosto 2026"
```

**O que o script faz:**
1. Cria a pasta `aprender/trilha-01-sql-para-dados/`
2. Copia `trilha-template_conteudo.html` → `index.html`
3. Cria `data.json` com os dados fornecidos

---

## 📝 Estrutura do `data.json` (dentro da pasta da trilha)

```json
{
  "trilha": {
    "num": "01",
    "titulo": "SQL para Dados",
    "descricao_curta": "SQL para executar seu desenho de dados.",
    "descricao_longa": "Aprenda SQL para executar o desenho dos dados...",
    "topico": "SQL e Bancos de Dados",
    "data_lancamento": "Agosto 2026"
  },
  "aulas": []
}
```

---

## 📝 Estrutura de uma AULA (dentro do `data.json`)

```json
{
  "num": "01",
  "titulo": "SELECT básico",
  "resumo_inline": "Consultas simples com SELECT, FROM e WHERE.",
  "blog_texto": "SQL começa com uma ideia simples...",
  "link_medium": "https://medium.com/@menteedados/sql-select-basico",
  "youtube_id": "dQw4w9WgXcQ",
  "downloads": [
    { "label": "📄 Exercícios PDF", "url": "/assets/downloads/exercicio.pdf" }
  ]
}
```

| Campo | Obrigatório? | O que é |
|-------|--------------|---------|
| `num` | ✅ Sim | Número da aula (ordem) |
| `titulo` | ✅ Sim | Título da aula |
| `resumo_inline` | ✅ Sim | Resumo curto (aparece no card fechado) |
| `blog_texto` | ✅ Sim | Texto do resumo do post |
| `link_medium` | ❌ Opcional | Link para o artigo completo no Medium |
| `youtube_id` | ❌ Opcional | ID do vídeo do YouTube |
| `downloads` | ❌ Opcional | Array de arquivos para download |

---

## 🎯 Ativar/Desativar uma trilha na biblioteca

| Ação | Comando |
|------|---------|
| **Ativar** (criar index.html) | `cp scripts/template-trilha/trilha-template_conteudo.html aprender/trilha-01-sql/index.html` |
| **Desativar** (remover index.html) | `rm aprender/trilha-01-sql/index.html` |

---

## ✅ Checklist para uma nova trilha

- [ ] Executar `bash scripts/trilha_nova_conteudo.sh`
- [ ] Verificar se a pasta foi criada em `/aprender/`
- [ ] Verificar se `index.html` existe dentro da pasta
- [ ] Verificar se `data.json` existe dentro da pasta
- [ ] Editar `data.json` para adicionar as aulas

---

## 🚀 Fluxo de trabalho diário

| O que você quer fazer | Como fazer |
|----------------------|------------|
| **Criar nova trilha** | `bash scripts/trilha_nova_conteudo.sh ...` |
| **Adicionar vídeo** | Editar `data.json` da trilha |
| **Adicionar artigo** | Editar `data.json` da trilha |
| **Adicionar download** | Editar `data.json` da trilha |
| **Ativar trilha** | Garantir que `index.html` existe |
| **Desativar trilha** | Remover `index.html` da pasta |

---

## ⚠️ Lembretes importantes

1. **O nome da pasta DEVE começar com `trilha-XX-`** (ex: `trilha-01-sql`)
2. **Sempre termine o caminho com `/`** (ex: `/aprender/trilha-01-sql/`)
3. **O arquivo `index.html` é OBRIGATÓRIO** para a trilha ficar ativa
4. **O arquivo `data.json` é OBRIGATÓRIO** para os dados da trilha
5. **Para adicionar uma aula: edite o `data.json`**, não o `index.html`

---

## 🚀 Comandos úteis (cola rápida)

```bash
# Criar nova trilha
bash scripts/trilha_nova_conteudo.sh "01" "sql-para-dados" "SQL para Dados" "Descrição curta" "Tópico" "Data"

# Verificar quais trilhas têm index.html
find aprender -name "index.html" -type f

# Verificar quais trilhas têm data.json
find aprender -name "data.json" -type f

# Ativar uma trilha
cp scripts/template-trilha/trilha-template_conteudo.html aprender/trilha-01-sql/index.html

# Desativar uma trilha
rm aprender/trilha-01-sql/index.html
```

