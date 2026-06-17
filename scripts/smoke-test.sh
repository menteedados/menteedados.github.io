#!/bin/bash

# ============================================
# Smoke Test - Mente & Dados
# Verifica se o site está funcionando após deploy
# ============================================

BASE_URL="https://menteedados.github.io"
SITE_URL="${BASE_URL}"

echo "🔥 Iniciando Smoke Test em produção..."
echo "========================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASSED=0
FAILED=0

# Função para testar URL
test_url() {
    local url="$1"
    local name="$2"
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
    
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 301 ] || [ "$HTTP_CODE" -eq 302 ]; then
        echo -e "   ${GREEN}✅${NC} $name - HTTP $HTTP_CODE"
        ((PASSED++))
        return 0
    else
        echo -e "   ${RED}❌${NC} $name - HTTP $HTTP_CODE"
        ((FAILED++))
        return 1
    fi
}

# Função para verificar conteúdo
test_content() {
    local url="$1"
    local pattern="$2"
    local name="$3"
    
    if curl -s "$url" | grep -q "$pattern"; then
        echo -e "   ${GREEN}✅${NC} $name - Conteúdo OK"
        ((PASSED++))
        return 0
    else
        echo -e "   ${RED}❌${NC} $name - Conteúdo não encontrado"
        ((FAILED++))
        return 1
    fi
}

echo "🌐 1. Testando URLs principais..."
echo ""

test_url "${SITE_URL}/" "Home Page"
test_url "${SITE_URL}/trilha-00/" "Trilha 00"
test_url "${SITE_URL}/trilha-00/ebook/" "E-book"
test_url "${SITE_URL}/trilha-00/caderno/" "Caderno"
test_url "${SITE_URL}/trilha-00/completo/" "Bundle"
test_url "${SITE_URL}/sobre/" "Sobre"
test_url "${SITE_URL}/contato/" "Contato"
test_url "${SITE_URL}/pagina-que-nao-existe" "404 Page"

echo ""

echo "📁 2. Testando arquivos estáticos..."
echo ""

test_url "${SITE_URL}/sitemap.xml" "sitemap.xml"
test_url "${SITE_URL}/robots.txt" "robots.txt"
test_url "${SITE_URL}/assets/css/main.css" "CSS Principal"
test_url "${SITE_URL}/assets/js/main.js" "JavaScript Principal"

echo ""

echo "🏷️ 3. Verificando conteúdo das páginas..."
echo ""

test_content "${SITE_URL}/" "Mente & Dados" "Home - Título"
test_content "${SITE_URL}/trilha-00/" "Trilha 00" "Trilha 00 - Título"
test_content "${SITE_URL}/sobre/" "Franciele" "Sobre - Conteúdo"
test_content "${SITE_URL}/contato/" "Contato" "Contato - Título"

echo ""

echo "========================================="
echo "📊 RESUMO DO SMOKE TEST"
echo "========================================="
echo -e "${GREEN}✅ Passaram: $PASSED${NC}"
echo -e "${RED}❌ Falharam: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 SMOKE TEST APROVADO! Site funcionando corretamente.${NC}"
    exit 0
else
    echo -e "${RED}❌ SMOKE TEST REPROVADO! Verifique os erros.${NC}"
    exit 1
fi
