import { CreateProposal, PageLoader } from '@dao-dao/stateless'

import { useWallet } from '../../hooks/useWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { NewGovProposal } from './NewGovProposal'

export const CreateGovProposal = () => {
  const { isWalletConnected } = useWallet()

  return (
    <CreateProposal
      newProposal={
        <SuspenseLoader fallback={<PageLoader />}>
          <NewGovProposal />
        </SuspenseLoader>
      }
      rightSidebarContent={
        isWalletConnected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
    />
  )
}
