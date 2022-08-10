import { useTranslation } from 'react-i18next'

import { MobileMenuTab } from '@dao-dao/ui'

import { MembershipMobileTabProps } from '../../types'

export const MembershipMobileTab = (props: MembershipMobileTabProps) => {
  const { t } = useTranslation()

  return <MobileMenuTab {...props} icon="👥" text={t('title.members')} />
}
