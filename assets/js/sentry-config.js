// ============================================
// Configuração Avançada do Sentry - Mente & Dados
// ============================================

(function() {
    // Carregar Sentry apenas em produção
    if (window.location.hostname === 'menteedados.github.io') {
        const script = document.createElement('script');
        script.src = 'https://browser.sentry-cdn.com/7.100.0/bundle.min.js';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            // Inicializar Sentry com configurações avançadas
            Sentry.init({
                dsn: "https://9c68ace0e2991ee6a6d4554490f152aa@o4511581018914816.ingest.us.sentry.io/4511581024354304",
                environment: 'production',
                release: '1.0.0',
                tracesSampleRate: 0.1, // 10% das transações
                
                // Contexto do usuário (anônimo)
                initialScope: {
                    user: {
                        id: window.localStorage.getItem('sentry_user_id') || 'anonymous',
                        email: 'anon@menteedados.com'
                    },
                    tags: {
                        version: '1.0.0',
                        platform: navigator.platform
                    }
                },
                
                // Filtros para reduzir ruído
                ignoreErrors: [
                    'ResizeObserver loop',
                    'Script error.',
                    'Non-Error exception',
                    'NetworkError',
                    'The operation was aborted',
                    'Extension',
                    'chrome-extension://',
                    'moz-extension://'
                ],
                
                denyUrls: [
                    /extensions\//i,
                    /chrome-extension:/i
                ],
                
                // Filtrar erros antes de enviar
                beforeSend(event) {
                    if (event.exception) {
                        const exceptionValues = event.exception.values || [];
                        if (exceptionValues.some(e => 
                            e.value && (
                                e.value.includes('Extension') ||
                                e.value.includes('chrome-extension') ||
                                e.value.includes('ResizeObserver')
                            )
                        )) {
                            return null; // Não enviar
                        }
                    }
                    return event;
                }
            });
            
            console.log('🐛 Sentry inicializado com configuração avançada');
        };
        document.head.appendChild(script);
    } else {
        console.log('🔧 Sentry: Ambiente de desenvolvimento - monitoramento desativado');
    }
})();

// ============================================
// Funções auxiliares para capturar erros manuais
// ============================================

// Capturar erros de API
function captureApiError(error, endpoint) {
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(error, {
            tags: { endpoint: endpoint },
            extra: { 
                url: window.location.href,
                timestamp: new Date().toISOString()
            }
        });
    }
}

// Adicionar contexto para componentes
function setComponentContext(componentName, props) {
    if (typeof Sentry !== 'undefined') {
        Sentry.setContext('Component', {
            name: componentName,
            props: props
        });
    }
}

// Capturar erros de promise não tratados
window.addEventListener('unhandledrejection', function(event) {
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(event.reason, {
            tags: { type: 'unhandledrejection' }
        });
    }
});

console.log('🔧 Sentry: Funções auxiliares carregadas');
