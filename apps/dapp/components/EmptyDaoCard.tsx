import i18n from '@dao-dao/i18n'

import { EmptyContractCard } from './EmptyContractCard'

export const EmptyDAOCard = () => (
  <EmptyContractCard
    backgroundUrl={'/empty-state-dao.jpeg'}
    description={i18n.t('Create a DAO (long)')}
    href="/dao/create"
    title={i18n.t('Create a DAO')}
  />
)
