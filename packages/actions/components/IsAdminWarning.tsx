import { WarningRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export const IsAdminWarning = ({
  admin,
  maybeAdmin,
}: {
  admin: string | undefined
  maybeAdmin: string
}) => {
  const { t } = useTranslation()

  return admin !== undefined && admin !== maybeAdmin ? (
    <div className="flex items-center gap-3 rounded-lg border border-border-interactive-error py-2 px-4">
      <WarningRounded className="!h-6 !w-6 text-text-interactive-error" />
      <p>{t('info.notAdmin')}</p>
    </div>
  ) : null
}
