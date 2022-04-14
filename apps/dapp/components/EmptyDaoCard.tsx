import { EmptyContractCard } from './EmptyContractCard'

export const EmptyDaoCard = () => {
  return (
    <EmptyContractCard
      backgroundUrl={'/empty-state-dao.jpeg'}
      description={'You are not a member of any DAOs. Why not create one?'}
      href="/dao/create"
      title={'Create a DAO'}
    />
  )
}
