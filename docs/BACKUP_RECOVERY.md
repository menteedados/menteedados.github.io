# 💾 Backup e Recovery - Mente & Dados

## Índice

1. [Backup Automático](#backup-automático)
2. [Backup Manual](#backup-manual)
3. [Recovery de Desastres](#recovery-de-desastres)
4. [Restauração de Arquivos](#restauração-de-arquivos)
5. [Procedimentos de Emergência](#procedimentos-de-emergência)

---

## 📋 Backup Automático

### GitHub como Backup

O GitHub já mantém histórico completo do código:

```bash
# Verificar histórico
git log --oneline

# Verificar commits específicos
git show <commit-hash>

# Verificar diferenças
git diff <commit-1> <commit-2>
Configurar Backup Local (recomendado)
Adicione um cron job para backup diário:

bash
# Criar script de backup
cat > /usr/local/bin/backup-menteedados.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups/menteedados_$TIMESTAMP"
mkdir -p $BACKUP_DIR
cp -r ~/Desktop/menteedados.github.io $BACKUP_DIR
tar -czf "/backups/menteedados_$TIMESTAMP.tar.gz" $BACKUP_DIR
rm -rf $BACKUP_DIR
find /backups -name "menteedados_*.tar.gz" -mtime +30 -delete
EOF

chmod +x /usr/local/bin/backup-menteedados.sh

# Adicionar ao crontab (diário às 2h)
echo "0 2 * * * /usr/local/bin/backup-menteedados.sh" >> /etc/crontab
💾 Backup Manual
Backup Completo do Código
bash
# Criar backup com timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="../menteedados_backup_$TIMESTAMP"

mkdir -p $BACKUP_DIR
cp -r . $BACKUP_DIR

# Remover arquivos desnecessários (opcional)
rm -rf $BACKUP_DIR/node_modules 2>/dev/null

echo "✅ Backup criado em: $BACKUP_DIR"
echo "📁 Tamanho: $(du -sh $BACKUP_DIR | cut -f1)"
Backup de Configurações
bash
# Backup de arquivos de configuração
cat > backup-config.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="../config_backup_$(date +%Y%m%d)"

mkdir -p $BACKUP_DIR

cp -v .env* $BACKUP_DIR/ 2>/dev/null
cp -v assets/js/hotmart-config.js $BACKUP_DIR/
cp -v assets/js/analytics.js $BACKUP_DIR/
cp -v sitemap.xml $BACKUP_DIR/
cp -v robots.txt $BACKUP_DIR/

tar -czf "$BACKUP_DIR.tar.gz" $BACKUP_DIR
rm -rf $BACKUP_DIR

echo "✅ Configurações backup em: $BACKUP_DIR.tar.gz"
EOF

chmod +x backup-config.sh
Backup de Imagens
bash
# Backup otimizado de imagens
tar -czf images-backup-$(date +%Y%m%d).tar.gz assets/images/
🔄 Recovery de Desastres
Cenário 1: Site fora do ar
bash
# 1. Verificar status
curl -I https://menteedados.github.io

# 2. Verificar deploy no GitHub
# Acesse: Settings → Pages → GitHub Actions

# 3. Rollback para commit anterior
git log --oneline
git checkout <commit-hash> index.html
git commit -m "rollback: revert to previous version"
git push origin main
Cenário 2: Arquivos corrompidos
bash
# 1. Restaurar do backup
tar -xzf ../menteedados_backup_YYYYMMDD_HHMMSS.tar.gz

# 2. Copiar arquivos específicos
cp ../menteedados_backup_YYYYMMDD_HHMMSS/index.html ./

# 3. Verificar integridade
bash scripts/pre-deploy-check.sh
Cenário 3: Hotmart links quebrados
bash
# 1. Verificar configuração
cat assets/js/hotmart-config.js

# 2. Restaurar backup anterior
cp ../menteedados_backup_YYYYMMDD_HHMMSS/assets/js/hotmart-config.js assets/js/

# 3. Testar
open trilha-00/index.html
Cenário 4: Perda total do repositório local
bash
# 1. Clonar do GitHub
git clone https://github.com/menteedados/menteedados.github.io.git

# 2. Restaurar configurações do backup
tar -xzf ../config_backup_YYYYMMDD.tar.gz
cp config_backup_YYYYMMDD/hotmart-config.js assets/js/

# 3. Executar setup
bash scripts/pre-deploy-check.sh
📂 Restauração de Arquivos
Restaurar versão específica
bash
# Listar commits
git log --oneline

# Restaurar arquivo específico
git checkout <commit-hash> -- caminho/do/arquivo.html

# Restaurar pasta inteira
git checkout <commit-hash> -- pasta/

# Commit da restauração
git commit -m "restore: recover files from <commit-hash>"
git push origin main
Restaurar do backup manual
bash
# 1. Localizar backup
ls -la ../menteedados_backup_*

# 2. Extrair
tar -xzf ../menteedados_backup_20260101_020000.tar.gz

# 3. Copiar arquivos
cp -r ../menteedados_backup_20260101_020000/trilha-00/ ./

# 4. Verificar
bash scripts/pre-deploy-check.sh
🚨 Procedimentos de Emergência
Contatos de Emergência
Nome	Função	Contato
Franciele Amaral	Proprietária	contato@menteedados.com
Suporte GitHub	Plataforma	https://github.com/support
Suporte Hotmart	Pagamentos	https://hotmart.com/support
Escalação de Incidentes
Nível	Descrição	Ação
N1	Problema visual pequeno	Correção em até 24h
N2	Funcionalidade quebrada	Correção em até 4h
N3	Site fora do ar	Correção imediata
N4	Perda de dados	Recovery imediato
Protocolo de Resposta
bash
# 1. Identificar o problema
echo "🔍 Diagnóstico do problema..."

# 2. Isolar o impacto
echo "📊 Verificando impacto..."

# 3. Aplicar correção
echo "🔧 Aplicando correção..."

# 4. Validar
echo "✅ Validando correção..."

# 5. Documentar
echo "📝 Documentando incidente..."
Modelo de Relatório de Incidente
markdown
# Relatório de Incidente

## Data/Hora: YYYY-MM-DD HH:MM
## Impacto: [Baixo/Médio/Alto/Crítico]
## Duração: XX minutos

### Descrição
[Descrição do problema]

### Causa
[Causa raiz identificada]

### Solução
[O que foi feito para resolver]

### Prevenção
[Como evitar no futuro]

### Responsável
[Nome]
📊 Backups Recomendados
Tipo	Frequência	Retenção
Código (Git)	Contínuo	Permanente
Configurações	Diário	30 dias
Imagens	Semanal	60 dias
Banco de dados	N/A	N/A
✅ Checklist de Backup
Diário
Push para GitHub (automático)

Verificar deploy (automático)

Semanal
Backup das imagens

Backup do código completo

Mensal
Backup completo do projeto

Verificar integridade dos backups

Pós-Atualização
Backup antes da atualização

Backup depois da atualização

Testar recovery

🛡️ Recomendações de Segurança
Nunca commite dados sensíveis

Verifique o .gitignore

Use variáveis de ambiente

Mantenha backups offsite

GitHub já é offsite

Backup adicional em nuvem

Teste recovery periodicamente

Restaure um backup

Verifique se funciona

Documente procedimentos

Este documento

Mantenha atualizado

🔗 Links Úteis
GitHub Docs

Git Recovery

Hotmart Support

Última atualização: Junho 2026
EOF

