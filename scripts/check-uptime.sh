#!/bin/bash

# ============================================
# Script de Verificação de Uptime
# Uso: ./scripts/check-uptime.sh
# ============================================

SITE_URL="https://menteedados.github.io"

echo "📡 Verificando status do site..."
echo "========================================="

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar site principal
check_url() {
    local url="$1"
    local name="$2"
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
    TIME=$(curl -s -o /dev/null -w "%{time_total}" "$url" --max-time 10)
    
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo -e "  ${GREEN}✅${NC} $name - HTTP $HTTP_CODE (${TIME}s)"
        return 0
    else
        echo -e "  ${RED}❌${NC} $name - HTTP $HTTP_CODE (${TIME}s)"
        return 1
    fi
}

check_url "$SITE_URL" "Home"
check_url "$SITE_URL/trilha-00/" "Trilha 00"
check_url "$SITE_URL/sitemap.xml" "Sitemap"
check_url "$SITE_URL/robots.txt" "robots.txt"

echo ""

# Verificar tempo de resposta médio
echo "⏱️ Tempo de resposta médio:"

avg_time=0
for i in {1..5}; do
    time=$(curl -s -o /dev/null -w "%{time_total}" "$SITE_URL" --max-time 10)
    avg_time=$(echo "$avg_time + $time" | bc)
done

avg_time=$(echo "scale=3; $avg_time / 5" | bc)
echo "  Média: ${avg_time}s"

echo ""

# Verificar status atual
echo "📊 Status atual:"

# Criar arquivo de status
STATUS_FILE="/tmp/menteedados_status.txt"
if [ -f "$STATUS_FILE" ]; then
    LAST_STATUS=$(cat "$STATUS_FILE")
    echo "  Última verificação: $LAST_STATUS"
fi

echo "$(date '+%Y-%m-%d %H:%M:%S') - OK" > "$STATUS_FILE"

echo ""

# Enviar alerta se algo estiver errado
if [ $? -ne 0 ]; then
    echo -e "${RED}⚠️ ALERTA: Algum serviço está fora do ar!${NC}"
    
    # Enviar email (se configurado)
    # echo "Alerta: Site Mente & Dados com problemas" | mail -s "Uptime Alert" seu-email@dominio.com
fi

echo "========================================="
echo "✅ Verificação concluída"
