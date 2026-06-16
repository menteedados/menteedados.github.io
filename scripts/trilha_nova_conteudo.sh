#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# nova-trilha.sh — Cria uma nova página de trilha gratuita
#
# Uso:
#   bash scripts/trilha_nova_conteudo.sh <NUM> <SLUG> <TITULO> <DESCRICAO_CURTA> <TOPICO> <DATA>
#
# Exemplo:
#   bash scripts/trilha_nova_conteudo.sh "01" "sql-para-dados" "SQL para Dados" \
#        "SQL para executar seu desenho de dados." "SQL e Bancos de Dados" "Agosto 2026"
# ─────────────────────────────────────────────────────────────

set -e

# ── Argumentos ───────────────────────────────────────────────
NUM="${1}"
SLUG="${2}"
TITULO="${3}"
DESCRICAO_CURTA="${4}"
TOPICO="${5}"
DATA_LANCAMENTO="${6}"

# ── Validação ────────────────────────────────────────────────
if [[ -z "$NUM" || -z "$SLUG" || -z "$TITULO" || -z "$DESCRICAO_CURTA" || -z "$TOPICO" || -z "$DATA_LANCAMENTO" ]]; then
    echo ""
    echo "❌ Uso correto:"
    echo '   bash scripts/nova-trilha.sh <NUM> <SLUG> <TITULO> <DESCRICAO_CURTA> <TOPICO> <DATA>'
    echo ""
    echo "Exemplo:"
    echo '   bash scripts/nova-trilha.sh "01" "sql-para-dados" "SQL para Dados" \'
    echo '        "SQL para executar seu desenho de dados." "SQL e Bancos de Dados" "Agosto 2026"'
    echo ""
    exit 1
fi

# ── Caminhos ─────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE_DIR="$SITE_ROOT/scripts/template-trilha"
DEST_DIR="$SITE_ROOT/aprender/trilha-${NUM}-${SLUG}"

# ── Verifica se já existe ─────────────────────────────────────
if [[ -d "$DEST_DIR" ]]; then
    echo "⚠️  Pasta já existe: $DEST_DIR"
    echo "   Abortando para não sobrescrever conteúdo existente."
    exit 1
fi

# ── Cria pasta e copia template ───────────────────────────────
mkdir -p "$DEST_DIR"
cp "$TEMPLATE_DIR/index.html" "$DEST_DIR/index.html"
echo "✅ index.html copiado"

# ── Gera data.json base ───────────────────────────────────────
cat > "$DEST_DIR/data.json" << JSON
{
  "trilha": {
    "num": "${NUM}",
    "titulo": "${TITULO}",
    "descricao_curta": "${DESCRICAO_CURTA}",
    "descricao_longa": "Descreva aqui em mais detalhes o que o aluno vai aprender nesta trilha.",
    "topico": "${TOPICO}",
    "data_lancamento": "${DATA_LANCAMENTO}"
  },
  "aulas": []
}
JSON

echo "✅ data.json criado"
echo ""
echo "────────────────────────────────────────────"
echo "✅ Trilha criada com sucesso!"
echo "   Pasta: aprender/trilha-${NUM}-${SLUG}/"
echo ""
echo "📝 Próximos passos:"
echo "   1. Edite: aprender/trilha-${NUM}-${SLUG}/data.json"
echo "      → Preencha descricao_longa"
echo "      → Adicione aulas no array 'aulas'"
echo ""
echo "   2. Quando tiver conteúdo, ative o card no"
echo "      aprender/index.html:"
echo "      → mude class para 'trilha-card lancada'"
echo "      → mude badge para 'badge-disponivel' e texto 'Disponível'"
echo ""
echo "   3. Commit e push:"
echo "      git add aprender/trilha-${NUM}-${SLUG}/"
echo "      git commit -m \"feat: add trilha ${NUM} - ${TITULO}\""
echo "      git push origin dev"
echo "────────────────────────────────────────────"