import { useTranslation } from 'react-i18next'

export const Placeholder = () => {
  const { t } = useTranslation()

  return (
    <p className="secondary-text">{t('info.votingModuleNotYetSupported')}</p>
  )
}
