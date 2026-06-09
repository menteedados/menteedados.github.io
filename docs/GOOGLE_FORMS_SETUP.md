# 📋 Configuração do Google Forms para Waitlist

## 📌 Links do Formulário

- **Formulário de produção:** https://docs.google.com/forms/d/e/1FAIpQLSd9WOEP9K57X8Y3MDYx-m695GxBEBF86JYQVBX5VQVXt4psmg/viewform
- **ID do formulário:** `1FAIpQLSd9WOEP9K57X8Y3MDYx-m695GxBEBF86JYQVBX5VQVXt4psmg`

---

## Passo 1: Criar o formulário

1. Acesse https://forms.google.com/
2. Clique em "Formulário em branco"
3. Título: "Mente & Dados - Lista de Espera"
4. Descrição: "Cadastro para receber novidades das trilhas"

---

## Passo 2: Adicionar campos

Adicione os seguintes campos:

### Campo 1: Email
- Tipo: "Resposta curta"
- Título: "Email"
- Validação: "Endereço de email" (ativar)
- Obrigatório: Sim

### Campo 2: Trilha de interesse
- Tipo: "Caixa de seleção" (checkboxes)
- Título: "Trilha de interesse"
- Descrição: "Marque as trilhas que você tem interesse"
- Obrigatório: Sim (pelo menos uma opção)

#### Opções do campo:
- ☐ Trilha 00 - Modelagem Mental (já disponível)
- ☐ Trilha 01 - SQL para Dados
- ☐ Trilha 02 - Python para Engenharia de Dados
- ☐ Trilha 03 - Git e Organização
- ☐ Trilha 04 - Projetos Integrados
- ☐ Trilha 05 - Bancos de Dados Relacionais
- ☐ Trilha 06 - Modelagem Avançada
- ☐ Trilha 07 - ETL/ELT na Prática
- ☐ Trilha 08 - Orquestração de Dados
- ☐ Trilha 09 - Analytics Engineering
- ☐ Trilha 10 - Data Warehouse Completo
- ☐ Trilha 11 - Produtos DADOZILLA
- ☐ Trilha 12 - IA para Dados
- ☐ Trilha 13 - Carreira em Dados

### Campo 3: Sugestão (opcional)
- Tipo: "Resposta longa" (texto de parágrafo)
- Título: "Tem algum assunto específico que você gostaria de ver nas próximas trilhas?"
- Descrição: "Deixe sua sugestão para melhorarmos nossos conteúdos"
- Obrigatório: Não

---

## Passo 3: Configurações importantes

No Google Forms, verifique:

- [x] ⚙️ Configurações → Coletar endereços de email → **ATIVADO**
- [x] ⚙️ Configurações → Limitar a 1 resposta por pessoa (opcional)
- [x] ⚙️ Configurações → Exibir barra de progresso (opcional)

---

## Passo 4: Obter o ID do formulário

1. Clique em "Enviar"
2. Selecione o ícone "Link" (</>)
3. Copie o URL: `https://docs.google.com/forms/d/e/1FAIpQLSd9WOEP9K57X8Y3MDYx-m695GxBEBF86JYQVBX5VQVXt4psmg/viewform`
4. Extraia o ID: `1FAIpQLSd9WOEP9K57X8Y3MDYx-m695GxBEBF86JYQVBX5VQVXt4psmg`

---

## Passo 5: Obter os IDs dos campos (entry IDs)

Para configurar a integração no código, você precisa dos entry IDs:

1. Abra o formulário no navegador: `https://docs.google.com/forms/d/e/1FAIpQLSd9WOEP9K57X8Y3MDYx-m695GxBEBF86JYQVBX5VQVXt4psmg/viewform`
2. Abra as Ferramentas do Desenvolvedor (F12)
3. Vá para a aba "Network" (Rede)
4. Preencha o formulário com dados de teste e clique em "Enviar"
5. Na aba "Network", procure pela requisição `formResponse`
6. Nos parâmetros da requisição, você verá:

| Campo | Nome do parâmetro | Valor exemplo |
|-------|-------------------|---------------|
| Email (coleta automática) | `emailAddress` | `usuario@email.com` |
| Trilha de interesse | `entry.2124155835` | `Trilha 01 - SQL para Dados` |
| Sugestão (opcional) | `entry.1452062749` | `teste` |

**IDs obtidos:**
- Email: `emailAddress` (nome especial, não é entry)
- Trilha de interesse: `entry.2124155835`
- Sugestão: `entry.1452062749`

---

## Passo 6: Configurar no código

No arquivo `trilha-XX-template.html`, substitua os placeholders:

```javascript
// Configuração do Google Forms
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd9WOEP9K57X8Y3MDYx-m695GxBEBF86JYQVBX5VQVXt4psmg/formResponse';

// Nomes dos campos no formulário
const fieldNames = {
    email: 'emailAddress',              // Campo email (coleta automática)
    trilha: 'entry.2124155835',         // Campo Trilha de interesse
    sugestao: 'entry.1452062749'        // Campo Sugestão (opcional)
};

// Exemplo de envio
const formData = new FormData();
formData.append(fieldNames.email, email);
formData.append(fieldNames.trilha, trilhaSelecionada);
formData.append(fieldNames.sugestao, sugestao);

await fetch(googleFormUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
});