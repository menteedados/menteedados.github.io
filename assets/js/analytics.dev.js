/**
 * Mente & Dados - Analytics Configuration
 * Google Analytics 4 + Meta Pixel
 * Version: 1.0.0
 */

// ============================================
// CONFIGURAÇÕES - PREENCHA COM SEUS IDs
// ============================================

const ANALYTICS_CONFIG = {
  // Google Analytics 4
  ga4: {
    enabled: true,
    measurementId: 'G-BFHT58K7T2', 
  },
  
  // Meta Pixel (Facebook)
  metaPixel: {
    enabled: true,
    pixelId: '1286501349749791', 
  },
  
  // Configurações adicionais
  settings: {
    debug: false, // Mude para true para testar no console
    anonymizeIp: true,
    sendPageView: true,
  }
};

// ============================================
// GOOGLE ANALYTICS 4
// ============================================

function initGoogleAnalytics() {
  if (!ANALYTICS_CONFIG.ga4.enabled) return;
  
  const measurementId = ANALYTICS_CONFIG.ga4.measurementId;
  if (measurementId === 'G-XXXXXXXXXX') {
    console.warn('⚠️ GA4: Substitua o Measurement ID pelo seu real!');
    return;
  }
  
  // Carregar o script do GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Configurar o dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: ANALYTICS_CONFIG.settings.anonymizeIp,
    page_title: document.title,
    page_location: window.location.href,
  });
  
  // Debug mode
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('✅ Google Analytics inicializado:', measurementId);
  }
}

// ============================================
// META PIXEL (Facebook)
// ============================================

function initMetaPixel() {
  if (!ANALYTICS_CONFIG.metaPixel.enabled) return;
  
  const pixelId = ANALYTICS_CONFIG.metaPixel.pixelId;
  if (pixelId === '286501349749791') {
    console.warn('⚠️ Meta Pixel: Substitua o Pixel ID pelo seu real!');
    return;
  }
  
  // Carregar o pixel do Facebook
  !function(f,b,e,v,n,t,s) {
    if(f.fbq) return;
    n=f.fbq=function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
    if(!f._fbq) f._fbq=n;
    n.push=n;
    n.loaded=!0;
    n.version='2.0';
    n.queue=[];
    t=b.createElement(e);
    t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', pixelId);
  fbq('track', 'PageView');
  
  // Debug mode
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('✅ Meta Pixel inicializado:', pixelId);
    fbq('track', 'DebugPageView');
  }
}

// ============================================
// EVENTOS PERSONALIZADOS
// ============================================

// Evento: Visualização de produto
function trackProductView(productName, productId) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_item', {
      currency: 'BRL',
      value: 67,
      items: [{ item_id: productId, item_name: productName }]
    });
  }
  
  if (typeof fbq !== 'undefined') {
    fbq('track', 'ViewContent', {
      content_name: productName,
      content_id: productId,
      content_type: 'product',
      currency: 'BRL',
      value: 67
    });
  }
  
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log(`📊 Evento: View Product - ${productName}`);
  }
}

// Evento: Iniciar checkout (clique no botão Hotmart)
function trackBeginCheckout(productName, productId, price) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: price,
      items: [{ item_id: productId, item_name: productName }]
    });
  }
  
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      content_name: productName,
      content_id: productId,
      content_type: 'product',
      currency: 'BRL',
      value: price,
      num_items: 1
    });
  }
  
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log(`💰 Evento: Begin Checkout - ${productName} (R$ ${price})`);
  }
}

// Evento: Adicionar à lista de espera
function trackWaitlistSignup(productName, email) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', {
      currency: 'BRL',
      value: 0,
      event_category: 'waitlist',
      event_label: productName
    });
  }
  
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: productName,
      content_category: 'waitlist',
      email: email
    });
  }
  
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log(`📝 Evento: Waitlist Signup - ${productName}`);
  }
}

// Evento: Scroll depth tracking
let maxScrollPercent = 0;

function trackScrollDepth() {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  const thresholds = [25, 50, 75, 90];
  thresholds.forEach(threshold => {
    if (scrollPercent >= threshold && maxScrollPercent < threshold) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
          event_category: 'engagement',
          event_label: `${threshold}%`,
          value: threshold,
          non_interaction: true
        });
      }
      
      if (ANALYTICS_CONFIG.settings.debug) {
        console.log(`📜 Scroll Depth: ${threshold}% alcançado`);
      }
    }
  });
  
  maxScrollPercent = Math.max(maxScrollPercent, scrollPercent);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

function initAnalytics() {
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('🔍 Analytics iniciando em modo DEBUG');
  }
  
  initGoogleAnalytics();
  initMetaPixel();
  
  // Configurar scroll tracking
  if (ANALYTICS_CONFIG.settings.sendPageView) {
    window.addEventListener('scroll', trackScrollDepth);
    
    // Rastrear tempo na página (após 30 segundos)
    setTimeout(() => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', {
          event_category: 'engagement',
          event_label: '30_seconds',
          value: 30,
          non_interaction: true
        });
      }
      if (ANALYTICS_CONFIG.settings.debug) {
        console.log('⏱️ Evento: 30 segundos na página');
      }
    }, 30000);
  }
  
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('✅ Analytics totalmente inicializado');
  }
}

// Exportar funções para uso global
window.trackProductView = trackProductView;
window.trackBeginCheckout = trackBeginCheckout;
window.trackWaitlistSignup = trackWaitlistSignup;

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}