import { EmptyContractCard } from './EmptyContractCard'

export function EmptyMultisigCard() {
  return (
    <EmptyContractCard
      backgroundUrl={'/empty-state-multisig.jpeg'}
      description={'You are not a member of any Multisigs. Why not create one?'}
      href="/multisig/create"
      title={'Create a Multisig'}
    />
  )
}
