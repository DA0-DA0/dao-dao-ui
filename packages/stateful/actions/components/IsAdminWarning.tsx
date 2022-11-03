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
    <div className="border-border-interactive-error flex items-center gap-3 rounded-lg border py-2 px-4">
      <WarningRounded className="text-text-interactive-error !h-6 !w-6" />
      <p>{t('info.notAdmin')}</p>
    </div>
  ) : null
}
