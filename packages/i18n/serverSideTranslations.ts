// Separate file so it's loaded only on the server.

import { CreateClientReturn } from 'next-i18next'
// @ts-ignore
import { createConfig } from 'next-i18next/dist/commonjs/config/createConfig'
// @ts-ignore
import { default as createClient } from 'next-i18next/dist/commonjs/createClient/node'
import { serverSideTranslations as _serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Use English as default locale.
export const serverSideTranslations = async (
  initialLocale?: string,
  namespacesRequired?: string[] | undefined
) => _serverSideTranslations(initialLocale ?? 'en', namespacesRequired)

// Create t function for use in server side props loading.
export const serverSideTranslationsWithServerT = async (
  initialLocale?: string,
  namespacesRequired?: string[] | undefined
) => {
  const i18nProps = await serverSideTranslations(
    initialLocale,
    namespacesRequired
  )

  // For some reason, the T function on the server is not immediately loaded
  // after awaiting serverSideTranslations, so let's manually instantiate our
  // own version of the client given the config that was loaded by the library.
  // https://github.com/i18next/next-i18next/issues/1698#issuecomment-1046754181
  const internalConfig = createConfig({
    ...i18nProps._nextI18Next.userConfig,
    lng: i18nProps._nextI18Next.initialLocale,
  })
  const client: CreateClientReturn = await createClient(internalConfig)
  const serverT = await client.i18n.init(await client.initPromise)

  return {
    i18nProps,
    serverT,
  }
}
