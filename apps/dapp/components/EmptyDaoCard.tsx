import { EmptyContractCard } from './EmptyContractCard'

export const EmptyDaoCard = () => {
  return (
    <EmptyContractCard
      href="/dao/create"
      backgroundUrl={'/empty-state-dao.jpeg'}
      title={'Create a DAO'}
      description={'You are not a member of any DAOs. Why not create one?'}
    />
  )
}
