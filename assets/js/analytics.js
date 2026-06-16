/**
 * Mente & Dados - Analytics Configuration
 * Google Analytics 4
 * Version: 1.0.0
 */

// ============================================
// CONFIGURAÇÕES - PREENCHA COM SEU GA4 ID
// ============================================

const ANALYTICS_CONFIG = {
  ga4: {
    enabled: true,
    measurementId: 'G-XXXXXXXXXX', // ⚠️ SUBSTITUA PELO SEU GA4 ID
  },
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
  
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: ANALYTICS_CONFIG.settings.anonymizeIp,
    page_title: document.title,
    page_location: window.location.href,
  });
  
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('✅ Google Analytics inicializado:', measurementId);
  }
}

// ============================================
// EVENTOS PERSONALIZADOS
// ============================================

function trackProductView(productName, productId) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_item', {
      currency: 'BRL',
      value: 67,
      items: [{ item_id: productId, item_name: productName }]
    });
  }
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log(`📊 Evento: View Product - ${productName}`);
  }
}

function trackBeginCheckout(productName, productId, price) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: price,
      items: [{ item_id: productId, item_name: productName }]
    });
  }
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log(`💰 Evento: Begin Checkout - ${productName} (R$ ${price})`);
  }
}

function trackWaitlistSignup(productName, email) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', {
      currency: 'BRL',
      value: 0,
      event_category: 'waitlist',
      event_label: productName
    });
  }
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log(`📝 Evento: Waitlist Signup - ${productName}`);
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

function initAnalytics() {
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('🔍 Analytics iniciando em modo DEBUG');
  }
  initGoogleAnalytics();
  if (ANALYTICS_CONFIG.settings.debug) {
    console.log('✅ Analytics inicializado');
  }
}

window.trackProductView = trackProductView;
window.trackBeginCheckout = trackBeginCheckout;
window.trackWaitlistSignup = trackWaitlistSignup;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}