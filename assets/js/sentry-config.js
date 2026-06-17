// ============================================
// Configuração do Sentry - Mente & Dados
// ============================================

// Carregar Sentry via CDN
(function() {
    // Carregar o SDK
    const script = document.createElement('script');
    script.src = 'https://browser.sentry-cdn.com/7.100.0/bundle.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = function() {
        // Inicializar Sentry
        Sentry.init({
            dsn: "https://9c68ace0e2991ee6a6d4554490f152aa@o4511581018914816.ingest.us.sentry.io/4511581024354304",
            environment: 'production',
            release: '1.0.0',
            tracesSampleRate: 0.1,
            // Desabilitar coleta de dados sensíveis
            dataCollection: {
                userInfo: false,
                httpBodies: false
            },
            // Filtrar erros comuns
            beforeSend(event) {
                if (event.exception) {
                    // Ignorar erros de extensões
                    if (event.exception.values.some(e => 
                        e.type === 'SecurityError' && 
                        e.value && e.value.includes('Extension')
                    )) {
                        return null;
                    }
                }
                return event;
            }
        });
        
        console.log('✅ Sentry inicializado');
    };
    document.head.appendChild(script);
})();
