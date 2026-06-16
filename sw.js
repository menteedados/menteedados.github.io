// Service Worker para Mente & Dados
// Cache de assets para melhor performance em mobile

const CACHE_NAME = 'mente-dados-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/analytics.js',
  '/assets/js/faq-accordion.js',
  '/assets/js/sticky-cta.js',
  '/offline.html'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retornar resposta do cache
        if (response) {
          return response;
        }
        
        // Clonar requisição
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Verificar se é uma resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar resposta
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Atualizar cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
