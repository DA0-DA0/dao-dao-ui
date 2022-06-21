export {
  Trans,
  appWithTranslation,
  useTranslation,
  withTranslation,
  // Can only use this on the server after `serverSideTranslations` is
  // awaited. Can be used on the client after the app is mounted but IT
  // REALLY SHOULDN'T BE USED ON THE CLIENT. USE THE `useTranslation` HOOK
  // OR `withTranslation` HOC.
  i18n as _probablyDontUseThisI18n,
} from 'next-i18next'
