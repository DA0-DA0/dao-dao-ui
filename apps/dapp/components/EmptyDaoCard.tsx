import { EmptyContractCard } from './EmptyContractCard'

export const EmptyOrgCard = () => (
  <EmptyContractCard
    backgroundUrl={'/empty-state-dao.jpeg'}
    description={'You are not a member of any orgs. Why not create one?'}
    href="/org/create"
    title="Create an Org"
  />
)
