import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types/actions'

export type PauseRebalancerData = {
  account: string
}

export const PauseRebalancerComponent: ActionComponent<
  undefined,
  PauseRebalancerData
> = () => {
  const { t } = useTranslation()
  return <p>{t('info.pauseRebalancerExplanation')}</p>
}
