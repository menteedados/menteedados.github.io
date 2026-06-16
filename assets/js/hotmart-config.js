/**
 * Hotmart Configuration - Mente & Dados
 * 
 * Configuração centralizada dos links de checkout
 * 
 * PRODUTOS:
 * - E-book: R$ 87
 * - Caderno: R$ 67
 * - Trilha 00 Completa: R$ 127
 */

const HOTMART_CONFIG = {
  // 🔧 Modo: 'sandbox' para testes | 'production' para vendas reais
  environment: 'production',
  
  // 📦 Produtos da Trilha 00
  products: {
    // 📘 E-book - R$ 87
    ebook: {
      id: 'ebook-trilha-00',
      name: 'E-book - Modelagem Mental Antes do Código',
      price: 87,
      checkoutUrl: 'https://pay.hotmart.com/O106158156S',
      utm: {
        source: 'site',
        medium: 'cta',
        campaign: 'ebook',
        content: 'card_ebook',
        term: 'trilha_00'
      }
    },
    
    // 📓 Caderno - R$ 67
    caderno: {
      id: 'caderno-trilha-00',
      name: 'Caderno de Exercícios - Engenharia de Dados',
      price: 67,
      checkoutUrl: 'https://pay.hotmart.com/B106158379L',
      utm: {
        source: 'site',
        medium: 'cta',
        campaign: 'caderno',
        content: 'card_caderno',
        term: 'trilha_00'
      }
    },
    
    // 🎁 Trilha 00 Completa - R$ 127
    completo: {
      id: 'completo-trilha-00',
      name: 'Trilha 00 Completa - Fundamentos de Engenharia de Dados',
      price: 127,
      checkoutUrl: 'https://pay.hotmart.com/T106158549N',
      utm: {
        source: 'site',
        medium: 'cta',
        campaign: 'completo',
        content: 'card_completo',
        term: 'trilha_00'
      }
    }
  },
  
  // 📊 Configurações de tracking
  tracking: {
    debug: false  // Mude para true para testar no console
  }
};

/**
 * Gera URL completa com parâmetros UTM
 */
function getCheckoutUrl(productKey, additionalParams = {}) {
  const product = HOTMART_CONFIG.products[productKey];
  if (!product) {
    console.error('❌ Produto não encontrado:', productKey);
    return '#';
  }
  
  let baseUrl = product.checkoutUrl;
  
  // Modo sandbox (para testes)
  if (HOTMART_CONFIG.environment === 'sandbox') {
    const separator = baseUrl.includes('?') ? '&' : '?';
    baseUrl = `${baseUrl}${separator}hot_sandbox=1`;
  }
  
  // Construir parâmetros UTM
  const utmParams = new URLSearchParams();
  utmParams.append('utm_source', product.utm.source);
  utmParams.append('utm_medium', product.utm.medium);
  utmParams.append('utm_campaign', product.utm.campaign);
  utmParams.append('utm_content', product.utm.content);
  utmParams.append('utm_term', product.utm.term);
  
  // Adicionar parâmetros extras
  Object.entries(additionalParams).forEach(([key, value]) => {
    utmParams.append(key, value);
  });
  
  const separator = baseUrl.includes('?') ? '&' : '?';
  const fullUrl = `${baseUrl}${separator}${utmParams.toString()}`;
  
  if (HOTMART_CONFIG.tracking.debug) {
    console.log(`🔗 Link gerado para ${product.name}:`, fullUrl);
  }
  
  return fullUrl;
}

/**
 * Rastreia clique e redireciona para o checkout
 */
function goToCheckout(productKey, event) {
  if (event) {
    event.preventDefault();
  }
  
  const url = getCheckoutUrl(productKey);
  
  if (url === '#') {
    alert('⚠️ Link em configuração. Tente novamente em alguns instantes.');
    return;
  }
  
  // Google Analytics 4 (se disponível)
  const product = HOTMART_CONFIG.products[productKey];
  if (typeof gtag !== 'undefined' && product) {
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1
      }]
    });
  }
  
  // Meta Pixel (se disponível)
  if (typeof fbq !== 'undefined' && product) {
    fbq('track', 'InitiateCheckout', {
      content_name: product.name,
      content_id: product.id,
      content_type: 'product',
      currency: 'BRL',
      value: product.price,
      num_items: 1
    });
  }
  
  // Redirecionar para o checkout
  setTimeout(() => {
    window.location.href = url;
  }, 100);
}

/**
 * Verifica se os links estão configurados corretamente
 */
function validateHotmartLinks() {
  console.log('🔍 Validando links do Hotmart...');
  
  const products = HOTMART_CONFIG.products;
  let allValid = true;
  
  Object.entries(products).forEach(([key, product]) => {
    if (product.checkoutUrl && product.checkoutUrl.includes('pay.hotmart.com')) {
      console.log(`✅ ${key.toUpperCase()}: ${product.checkoutUrl.substring(0, 50)}...`);
    } else {
      console.error(`❌ ${key.toUpperCase()}: Link inválido`);
      allValid = false;
    }
  });
  
  if (allValid) {
    console.log('🎉 Todos os links do Hotmart estão configurados!');
  }
  
  return allValid;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  if (HOTMART_CONFIG.tracking.debug) {
    console.log('🔥 Hotmart Config carregada - Modo:', HOTMART_CONFIG.environment);
    validateHotmartLinks();
  }
});

// Exportar para uso global
window.HOTMART_CONFIG = HOTMART_CONFIG;
window.getCheckoutUrl = getCheckoutUrl;
window.goToCheckout = goToCheckout;
window.validateHotmartLinks = validateHotmartLinks;