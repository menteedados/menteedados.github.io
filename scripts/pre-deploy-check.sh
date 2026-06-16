#!/bin/bash

# ============================================
# Script de Validação Pré-Deploy - Mente & Dados
# ============================================

echo "🔍 Iniciando validação pré-deploy..."
echo "========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASSED=0
FAILED=0
WARNINGS=0

# 1. Verificar arquivos obrigatórios
echo "📁 1. Verificando arquivos obrigatórios..."

check_file() {
    if [ -f "$1" ]; then
        echo -e "   ${GREEN}✅${NC} $1"
        ((PASSED++))
    else
        echo -e "   ${RED}❌${NC} $1 - NÃO ENCONTRADO"
        ((FAILED++))
    fi
}

check_file "index.html"
check_file "404.html"
check_file "robots.txt"
check_file "sitemap.xml"
check_file "assets/css/main.css"
check_file "assets/js/main.js"
check_file "assets/js/analytics.js"

echo ""

# 2. Verificar páginas principais
echo "📄 2. Verificando páginas principais..."

check_page() {
    if [ -f "$1" ]; then
        echo -e "   ${GREEN}✅${NC} $1"
        ((PASSED++))
    else
        echo -e "   ${RED}❌${NC} $1 - NÃO ENCONTRADO"
        ((FAILED++))
    fi
}

check_page "trilha-00/index.html"
check_page "trilha-00/ebook/index.html"
check_page "trilha-00/caderno/index.html"
check_page "trilha-00/completo/index.html"
check_page "sobre/index.html"
check_page "contato/index.html"

echo ""

# 3. Verificar links
echo "🔗 3. Verificando links internos..."

if grep -r "localhost" --include="*.html" . > /dev/null 2>&1; then
    echo -e "   ${YELLOW}⚠️${NC} Encontrados links para localhost"
    ((WARNINGS++))
else
    echo -e "   ${GREEN}✅${NC} Sem links para localhost"
    ((PASSED++))
fi

echo ""

# 4. Verificar meta tags
echo "🏷️ 4. Verificando meta tags..."

check_meta() {
    if grep -q "$1" "$2"; then
        echo -e "   ${GREEN}✅${NC} $3 em $2"
        ((PASSED++))
    else
        echo -e "   ${RED}❌${NC} $3 NÃO encontrado em $2"
        ((FAILED++))
    fi
}

check_meta "viewport" "index.html" "Viewport"
check_meta "description" "index.html" "Meta description"
check_meta "og:title" "index.html" "Open Graph"

echo ""

# 5. Verificar sitemap e robots
echo "🗺️ 5. Verificando sitemap.xml..."

if [ -f "sitemap.xml" ]; then
    URL_COUNT=$(grep -c "<loc>" sitemap.xml)
    echo -e "   ${GREEN}✅${NC} Sitemap contém $URL_COUNT URLs"
    ((PASSED++))
else
    echo -e "   ${RED}❌${NC} sitemap.xml não encontrado"
    ((FAILED++))
fi

echo ""

# Resumo
echo "========================================="
echo "📊 RESUMO DA VALIDAÇÃO"
echo "========================================="
echo -e "${GREEN}✅ Passaram: $PASSED${NC}"
echo -e "${RED}❌ Falharam: $FAILED${NC}"
echo -e "${YELLOW}⚠️ Alertas: $WARNINGS${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 VALIDAÇÃO APROVADA! Site pronto para deploy.${NC}"
    exit 0
else
    echo -e "${RED}❌ VALIDAÇÃO REPROVADA! Corrija os erros.${NC}"
    exit 1
fi
