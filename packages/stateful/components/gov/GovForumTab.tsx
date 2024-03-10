import { WarningRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { NoContent, useConfiguredChainContext } from '@dao-dao/stateless'

export const GovForumTab = () => {
  const { t } = useTranslation()
  const {
    config: { forumUrl },
  } = useConfiguredChainContext()

  return forumUrl ? (
    <iframe className="h-full w-full min-h-[60vh]" src={forumUrl} />
  ) : (
    <NoContent Icon={WarningRounded} body={t('info.noForumConfigured')} />
  )
}
