import { ExclamationIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

export const IsAdminWarning = ({
  admin,
  maybeAdmin,
}: {
  admin: string | undefined
  maybeAdmin: string
}) => {
  const { t } = useTranslation()

  if (admin !== undefined && admin !== maybeAdmin) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-error py-2 px-4">
        <ExclamationIcon className="h-6 w-6 text-error" />
        <p>{t('info.notAdmin')}</p>
      </div>
    )
  }

  return null
}
