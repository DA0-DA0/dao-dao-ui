// Separate file so it's loaded only on the server.

import i18next from 'i18next'
import { SSRConfig, TFunction } from 'next-i18next'
import { serverSideTranslations as _serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Use English as default locale.
export const serverSideTranslations = async (
  initialLocale?: string,
  namespacesRequired?: string[] | undefined
): Promise<SSRConfig> =>
  import('./next-i18next.config').then(({ default: config }) =>
    _serverSideTranslations(initialLocale ?? 'en', namespacesRequired, config)
  )

// Create t function for use in server side props loading.
export const serverSideTranslationsWithServerT = async (
  initialLocale?: string,
  namespacesRequired?: string[] | undefined
): Promise<{ i18nProps: SSRConfig; serverT: TFunction }> => {
  const i18nProps = await serverSideTranslations(
    initialLocale,
    namespacesRequired
  )

  // For some reason, the T function on the server is not immediately loaded
  // after awaiting serverSideTranslations, so let's manually instantiate our
  // own version of the client given the config that was loaded by the library.
  // https://github.com/i18next/next-i18next/issues/1698#issuecomment-3008006028
  const i18nLocal = i18next.createInstance()
  await i18nLocal.init({
    lng: initialLocale ?? 'en',
    fallbackLng: 'en',
    ns: namespacesRequired ?? ['translation'],
    defaultNS: namespacesRequired?.[0] ?? 'translation',
    resources: i18nProps._nextI18Next.initialI18nStore,
    interpolation: { escapeValue: false },
  })

  return {
    i18nProps,
    serverT: i18nLocal.t,
  }
}
