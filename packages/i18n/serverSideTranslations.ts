// Separate file so it's loaded only on the server.

import { serverSideTranslations as _serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Use English as default locale.
export const serverSideTranslations = async (
  initialLocale?: string,
  namespacesRequired?: string[] | undefined
) => _serverSideTranslations(initialLocale ?? 'en', namespacesRequired)
