import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import { DaoCreationAdapter } from '../../types'

export const MembershipIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.handshake')} symbol="🤝" />
}

export const MembershipAdapter: DaoCreationAdapter = {
  id: 'membership',
  displayInfo: {
    Icon: MembershipIcon,
    nameI18nKey: 'daoCreationAdapter.membership.name',
    descriptionI18nKey: 'daoCreationAdapter.membership.description',
    suppliesI18nKey: 'daoCreationAdapter.membership.supplies',
    membershipI18nKey: 'daoCreationAdapter.membership.membership',
  },
  load: () => ({
    // Hooks
    hooks: {},

    // Components
    components: {},
  }),
}
