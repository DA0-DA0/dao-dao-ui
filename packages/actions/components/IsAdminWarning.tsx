import { ExclamationIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next'

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
      <div className="flex gap-3 items-center py-2 px-4 rounded-lg border border-error">
        <ExclamationIcon className="w-6 h-6 text-error" />
        <p>{t('info.notAdmin')}</p>
      </div>
    )
  }

  return null
}
