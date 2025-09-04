// Define um nome e versão para o cache
const CACHE_NAME = 'ficha-paleo-cache-v1';

// Lista de arquivos que o App precisa para funcionar offline
const urlsToCache = [
  '/',
  'index.html' 
];

// Evento de 'install': Roda quando o service worker é instalado
self.addEventListener('install', event => {
  // Espera até que o cache seja aberto e todos os arquivos sejam adicionados
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de 'fetch': Roda toda vez que o app tenta buscar um arquivo
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar o arquivo no cache primeiro
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna o arquivo do cache
        if (response) {
          return response;
        }
        // Se não encontrar, busca o arquivo na rede (internet)
        return fetch(event.request);
      })
  );
});