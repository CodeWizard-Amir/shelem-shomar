const STATIC_CACHE_NAME = "static-25";
const DYNAMIC_CACHE_NAME = "dynamic-13";
const STATIC_CACHE_ASSETS = [
  "/",
  "https://codewizard-amir.github.io/shelem-shomar/index.html",
  "https://codewizard-amir.github.io/shelem-shomar/offline.html"
];
self.addEventListener("install", (event) => {
  console.log("service worker installing ...");
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_ASSETS);
      })
      .catch((e) => {
        console.log(e);
      })
  );
});
self.addEventListener("activate", () => {
  console.log("activating ...");
});
self.addEventListener("fetch", (event) => {
  console.log("service worker is fetching ...", event);
  const request = event.request;

    event.respondWith(
      caches
        .match(request)
        .then((res) => {
          return (
            res ||
            fetch(request)
              .then((res) => {
                caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                  cache.put(request, res);
                });
                return res.clone();
              })
              .catch((err) => {
                return caches.open(STATIC_CACHE_NAME)
                .then((cache) =>{
                  if(request.headers.get('accept').includes('text/html'))
                  {
                    return cache.match('./offline.html')
                  }
                  if(request.url.match(/\.(jpg?g|png|gif|svg)$/))
                  {
                    return
                  }

                })
              })
          );
        })
        .catch((err) => {
          console.log(err);
        })
    );
});