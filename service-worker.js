/* ============================================================
   TUBARÃO DOGUERIA — service-worker.js
   Cache dos arquivos principais para funcionamento offline.
   ============================================================ */

const CACHE_NAME = 'tubarao-v3';

// Arquivos que serão salvos no cache na primeira visita
const ARQUIVOS_CACHE = [
  './',
  './index.html',
  './offline.html',
  './estilo/estilo.css',
  './js/app.js',
  './img/logozap.jpeg',
  './img/favicon/icon-192.png',
  './img/favicon/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap'
];

// Instalação: salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação: limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nomes) => {
      return Promise.all(
        nomes
          .filter((nome) => nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome))
      );
    })
  );
  self.clients.claim();
});

// Fetch: tenta a rede primeiro, cai no cache se offline
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não são GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((resposta) => {
        // Se a rede respondeu, atualiza o cache com a versão mais recente
        const respostaClone = resposta.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, respostaClone);
        });
        return resposta;
      })
      .catch(() => {
        // Sem internet: serve do cache
        return caches.match(event.request).then((respostaCache) => {
          if (respostaCache) return respostaCache;
          // Se não tiver no cache, serve a página offline personalizada
          return caches.match('./offline.html');
        });
      })
  );
});
