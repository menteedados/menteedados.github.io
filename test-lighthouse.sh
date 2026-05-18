#!/bin/bash

# Script para testar Lighthouse via CLI
# Necessário: npm install -g lighthouse

echo "🔍 Testando Lighthouse para Mente & Dados..."

# URL do site (ajustar conforme necessário)
URL="http://localhost:8000"

# Teste mobile
echo "📱 Testando Mobile..."
lighthouse $URL --output=html --output-path=./reports/lighthouse-mobile.html --view --preset=mobile

# Teste desktop
echo "💻 Testando Desktop..."
lighthouse $URL --output=html --output-path=./reports/lighthouse-desktop.html --view --preset=desktop

echo "✅ Relatórios gerados em ./reports/"
