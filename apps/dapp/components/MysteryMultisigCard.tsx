import { EmptyContractCard } from './EmptyContractCard'

export function MysteryMultisigCard() {
  return (
    <EmptyContractCard
      href="/multisig/create"
      backgroundUrl={'/empty-state-multisig.jpeg'}
      title={'+ Create a Multisig'}
      description={'You are not a member of any Multisigs. Why not create one?'}
    />
  )
}
