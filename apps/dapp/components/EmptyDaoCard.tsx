import i18n from '@dao-dao/i18n'

import { EmptyContractCard } from './EmptyContractCard'

export const EmptyOrgCard = () => (
  <EmptyContractCard
    backgroundUrl={'/empty-state-dao.jpeg'}
    description={i18n.t('Create a DAO (long)')}
    href="/org/create"
    title={i18n.t('Create a DAO')}
  />
)
