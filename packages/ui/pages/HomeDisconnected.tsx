import { useTranslation } from 'react-i18next'

export const HomeDisconnected = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-8 items-stretch">
      <p className="px-24 mt-12 header-text">{t('title.home')}</p>

      <div className="mx-24 h-[1px] bg-border-secondary"></div>

      <p className="px-24 title-text">{t('title.featuredDaos')}</p>
    </div>
  )
}
