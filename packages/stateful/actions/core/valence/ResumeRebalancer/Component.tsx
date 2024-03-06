import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types/actions'

export type ResumeRebalancerData = {
  account: string
}

export const ResumeRebalancerComponent: ActionComponent<
  undefined,
  ResumeRebalancerData
> = () => {
  const { t } = useTranslation()
  return <p>{t('info.resumeRebalancerExplanation')}</p>
}
