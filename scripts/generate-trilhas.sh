#!/bin/bash

# Script para gerar as páginas das trilhas 01 a 13
# Baseado no template trilha-XX-template.html
# Atualizado conforme plano estratégico Mente & Dados

echo "🚀 Gerando páginas das trilhas 01 a 13..."

# Definir informações de cada trilha (conforme ordem correta)
declare -A TRILHA_01=(
    [num]="01"
    [title]="SQL para Dados"
    [description]="Aprenda SQL para executar o desenho dos dados. Consultas, joins e modelagem prática."
    [short]="SQL para executar seu desenho de dados."
    [topic]="SQL e Bancos de Dados"
    [date]="Agosto 2026"
)

declare -A TRILHA_02=(
    [num]="02"
    [title]="Python para Engenharia de Dados"
    [description]="Python Mínimo Viável para pipeline. Não é Python genérico — é foco em dados."
    [short]="Python para pipeline, não para web."
    [topic]="Python e Automação"
    [date]="Setembro 2026"
)

declare -A TRILHA_03=(
    [num]="03"
    [title]="Git e Organização"
    [description]="Versionamento e organização de projetos de dados. Do básico ao prático."
    [short]="Git para engenheiros de dados."
    [topic]="Git e Versionamento"
    [date]="Outubro 2026"
)

declare -A TRILHA_04=(
    [num]="04"
    [title]="Projetos Integrados"
    [description]="Integre SQL, Python e Git em projetos completos de engenharia de dados."
    [short]="Integre tudo que você aprendeu."
    [topic]="Projetos de Dados"
    [date]="Novembro 2026"
)

declare -A TRILHA_05=(
    [num]="05"
    [title]="Bancos de Dados Relacionais"
    [description]="PostgreSQL, índices, constraints e boas práticas para engenharia de dados."
    [short]="Domine bancos relacionais."
    [topic]="Bancos de Dados"
    [date]="Dezembro 2026"
)

declare -A TRILHA_06=(
    [num]="06"
    [title]="Modelagem Avançada"
    [description]="Star Schema, SCD, modelagem para Data Warehouse e decisões de design."
    [short]="Modelagem dimensional avançada."
    [topic]="Modelagem de Dados"
    [date]="Janeiro 2027"
)

declare -A TRILHA_07=(
    [num]="07"
    [title]="ETL/ELT na Prática"
    [description]="Construção de pipelines de dados com Python e SQL. Extraia, transforme e carregue."
    [short]="Pipelines do mundo real."
    [topic]="ETL e Pipelines"
    [date]="Fevereiro 2027"
)

declare -A TRILHA_08=(
    [num]="08"
    [title]="Orquestração de Dados"
    [description]="Airflow, DAGs e automação de pipelines. Durma enquanto o pipeline roda."
    [short]="Automatize seus pipelines."
    [topic]="Orquestração"
    [date]="Março 2027"
)

declare -A TRILHA_09=(
    [num]="09"
    [title]="Analytics Engineering"
    [description]="Transformações com dbt, documentação e boas práticas de analytics."
    [short]="Organize dados para análise."
    [topic]="Analytics Engineering"
    [date]="Abril 2027"
)

declare -A TRILHA_10=(
    [num]="10"
    [title]="Data Warehouse Completo"
    [description]="Construa um Data Warehouse do zero. Portfólio completo para o mercado."
    [short]="Portfólio profissional em DW."
    [topic]="Data Warehouse"
    [date]="Maio 2027"
)

declare -A TRILHA_11=(
    [num]="11"
    [title]="Produtos DADOZILLA"
    [description]="Crie dashboards para vender. Transforme conhecimento em produto digital."
    [short]="Dashboard como produto."
    [topic]="Produtos de Dados"
    [date]="Junho 2027"
)

declare -A TRILHA_12=(
    [num]="12"
    [title]="IA para Dados"
    [description]="Use Inteligência Artificial para acelerar sua análise e pipeline de dados."
    [short]="IA aplicada à engenharia de dados."
    [topic]="IA e Dados"
    [date]="Julho 2027"
)

declare -A TRILHA_13=(
    [num]="13"
    [title]="Carreira em Dados"
    [description]="Monte seu currículo, prepare-se para entrevistas e conquiste sua vaga."
    [short]="Currículo e entrevistas para dados."
    [topic]="Carreira"
    [date]="Agosto 2027"
)

# Array com todas as trilhas
TRILHAS=(01 02 03 04 05 06 07 08 09 10 11 12 13)

# Gerar cada trilha
for num in "${TRILHAS[@]}"; do
    # Nome da variável dinâmica
    eval "declare -n trilha=TRILHA_$num"
    
    echo "📝 Gerando trilha $num: ${trilha[title]}"
    
    # Substituir placeholders
    sed -e "s/{{TRILHA_NUM}}/${trilha[num]}/g" \
        -e "s/{{TRILHA_TITLE}}/${trilha[title]//&/\\&}/g" \
        -e "s/{{TRILHA_DESCRIPTION}}/${trilha[description]//&/\\&}/g" \
        -e "s/{{TRILHA_DESCRIPTION_SHORT}}/${trilha[short]//&/\\&}/g" \
        -e "s/{{TRILHA_TOPIC}}/${trilha[topic]//&/\\&}/g" \
        -e "s/{{RELEASE_DATE}}/${trilha[date]}/g" \
        trilha-XX-template.html > trilha-$num/index.html
    
    echo "   ✅ trilha-$num/index.html criado"
done

echo ""
echo "🎉 Todas as 13 trilhas foram geradas com sucesso!"
echo "📁 Local: /trilha-01/ a /trilha-13/"

echo ""
echo "🔍 Verificando arquivos gerados:"
ls -la trilha-*/index.html | wc -l
echo "arquivos criados"