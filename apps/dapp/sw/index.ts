// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

const CACHE = 'pwa-offline'
// const OFFLINE_FALLBACK_PAGE = '/fallback.js'
// const assets = []

type PushNotificationPayload = {
  title: string
  message: string
  imageUrl: string | undefined
  deepLink:
    | {
        type: 'dao'
        coreAddress: string
      }
    | {
        type: 'proposal'
        coreAddress: string
        proposalId: string
      }
}

const getPathFromNotification = ({ deepLink }: PushNotificationPayload) => {
  switch (deepLink.type) {
    case 'dao':
      return `/dao/${deepLink.coreAddress}`
    case 'proposal':
      return `/dao/${deepLink.coreAddress}/proposals/${deepLink.proposalId}`
    default:
      return '/'
  }
}

// TypeScript work-around to type `self` as `this` correctly.
;(function (this: ServiceWorkerGlobalScope) {
  // Cache offline page on install.
  // self.addEventListener('install', function (event) {
  //   event.waitUntil(
  //     caches.open(CACHE).then(function (cache) {
  //       console.log('[PWA] Cached offline page during install')

  //       if (offlineFallbackPage === '/fallback.js') {
  //         return cache.add(
  //           new Response(
  //             'TODO: Update the value of the offlineFallbackPage constant in the serviceworker.'
  //           )
  //         )
  //       }

  //       return cache.add(offlineFallbackPage, assets)
  //     })
  //   )
  // })

  // Push notification event.
  this.addEventListener('push', (event) => {
    const data: PushNotificationPayload = event.data?.json() || {}
    event.waitUntil(
      this.registration.showNotification(data.title, {
        body: data.message,
        icon: data.imageUrl || '/daodao.png',
        data,
      })
    )
  })

  // Notification click event.
  this.addEventListener('notificationclick', (event) => {
    event.notification.close()
    event.waitUntil(
      this.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          if (clientList.length > 0) {
            let client = clientList[0]
            for (let i = 0; i < clientList.length; i++) {
              if (clientList[i].focused) {
                client = clientList[i]
              }
            }
            return client.focus()
          }
          return this.clients.openWindow(
            getPathFromNotification(event.notification.data)
          )
        })
    )
  })

  // Offline support. If any fetch fails, it will check the cache for the
  // request.
  self.addEventListener('fetch', (event: FetchEvent) => {
    if (
      event.request.method !== 'GET' ||
      event.request.url.startsWith('chrome-extension:')
    ) {
      return
    }

    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If request was success, update it in the cache.
          event.waitUntil(updateCache(event.request, response.clone()))
          return response
        })
        .catch((error) => {
          // If request failed, try to get it from the cache.
          console.log(
            '[PWA] Network request Failed. Serving content from cache: ' + error
          )
          return fromCache(event.request)
        })
    )
  })
}.call(self))

const fromCache = async (request) => {
  const matching = await (await caches.open(CACHE)).match(request)
  if (!matching || matching.status === 404) {
    return Promise.reject('no-match')
  }

  return matching
}

const updateCache: (
  ...params: Parameters<Cache['put']>
) => Promise<void> = async (...params) =>
  (await caches.open(CACHE)).put(...params)
