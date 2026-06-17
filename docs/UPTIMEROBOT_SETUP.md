# Criar diretório docs
mkdir -p docs

# Criar arquivo de documentação
cat > docs/UPTIMEROBOT_SETUP.md << 'EOF'
# 📡 Configuração do UptimeRobot - Mente & Dados

## 📋 O que é UptimeRobot?
Serviço gratuito que monitora se o site está no ar e envia alertas quando cai.

## ✅ Monitores Configurados

| Monitor | Tipo | URL | Status |
|---------|------|-----|--------|
| Mente & Dados - Site | HTTP(S) | https://menteedados.github.io | ✅ Ativo |
| Mente & Dados - Keyword | Keyword | https://menteedados.github.io | ✅ Ativo |

## 🔔 Alertas Configurados

| Tipo | Status | Descrição |
|------|--------|-----------|
| Email | ✅ Ativo | Alertas para email principal |
| Push | ❌ Não configurado | Opcional - via app |

## 📊 Página de Status Pública

- URL: https://stats.uptimerobot.com/KHsXQUH22q
- Visível para: Público

## 📈 Relatórios

- Frequência: Mensal
- Conteúdo: Uptime, incidentes, tempo de resposta

## ✅ Checklist

- [x] Conta criada
- [x] Monitor do site principal (HTTP)
- [x] Monitor de keyword
- [x] Alertas por email
- [x] Relatórios mensais
- [x] Página de status pública

---
**Data:** 17/06/2026
**Responsável:** Franciele Amaral
