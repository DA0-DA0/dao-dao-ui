import { CreateProposal, PageLoader } from '@dao-dao/stateless'

import { GovActionsProvider } from '../../actions'
import { useWallet } from '../../hooks/useWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { NewGovProposal } from './NewGovProposal'

export const CreateGovProposal = () => {
  const { isWalletConnected } = useWallet()

  return (
    <CreateProposal
      newProposal={
        <GovActionsProvider>
          <SuspenseLoader fallback={<PageLoader />}>
            <NewGovProposal />
          </SuspenseLoader>
        </GovActionsProvider>
      }
      rightSidebarContent={
        isWalletConnected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
    />
  )
}
