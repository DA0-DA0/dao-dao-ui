export {
  // Use the wrapped `Trans` component in the `@dao-dao/ui` package because
  // it is wrapped in a SuspenseLoader that prevents it from trying to
  // render invalid interpolated objects before translations are loaded.
  // This is relevant on fallback pages while `getStaticProps` is loading
  // since the translations are not loaded until static props are ready.
  // Previously, we set `fallback: 'blocking'` on the dynamically generated
  // pages which prevented communication to the user that a page is
  // loading and made the UI look stuck when navigating to dynamic pages
  // such as a DAO or proposal page.
  Trans as _probablyDontUseThisTrans,
  appWithTranslation,
  useTranslation,
  withTranslation,
  // Can only use this on the server after `serverSideTranslations` is
  // awaited. Can be used on the client after the app is mounted but IT
  // REALLY SHOULDN'T BE USED ON THE CLIENT. USE THE `useTranslation` HOOK
  // OR `withTranslation` HOC.
  i18n as _probablyDontUseThisI18n,
} from 'next-i18next'
