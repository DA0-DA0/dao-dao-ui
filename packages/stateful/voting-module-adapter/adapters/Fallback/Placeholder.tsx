import { useTranslation } from 'react-i18next'

export const Placeholder = () => {
  const { t } = useTranslation()

  return (
    <p className="mt-1 grow rounded-md border border-border-primary p-3 text-text-tertiary">
      {t('info.votingModuleNotYetSupported')}
    </p>
  )
}
