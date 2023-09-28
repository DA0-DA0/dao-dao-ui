// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

type PushNotificationPayload = {
  title: string
  message: string
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
  // To disable all workbox logging during development, you can set
  // this.__WB_DISABLE_DEV_LOGS to true
  // https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
  //
  // this.__WB_DISABLE_DEV_LOGS = true

  this.addEventListener('push', (event) => {
    const data: PushNotificationPayload = event.data?.json() || {}
    event.waitUntil(
      this.registration.showNotification(data.title, {
        body: data.message,
        icon: '/android-chrome-192x192.png',
        data,
      })
    )
  })

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
}.call(self))
