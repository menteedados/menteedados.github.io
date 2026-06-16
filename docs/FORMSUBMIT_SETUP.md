# 📧 Configuração do FormSubmit para o formulário de contato

## O que é FormSubmit?
FormSubmit é um serviço gratuito que permite receber emails de formulários sem backend.

## Como configurar:

### 1. Acesse https://formsubmit.co/

### 2. Use o email: `shefatech.dev@gmail.com`

### 3. Ativação:
- Envie o formulário uma vez
- Verifique o e-mail de confirmação (pode ir para SPAM)
- Clique no link para ativar

### 4. Configurações no código (já implementadas):

```javascript
// Já configurado no contato/index.html
const formSubmitUrl = 'https://formsubmit.co/ajax/shefatech.dev@gmail.com';

// Dados enviados:
{
    name: nome,
    email: email,
    subject: assunto,
    message: mensagem,
    _subject: 'Mente & Dados - Contato de {nome}',
    _captcha: 'false'
}