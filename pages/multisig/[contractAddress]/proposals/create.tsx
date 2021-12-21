import ProposalEditor from 'components/ProposalEditor'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCreateProposal } from 'hooks/proposals'
import { Proposal } from 'models/proposal/proposal'
import { successNotify } from 'util/toast'

const ProposalCreate: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const { walletAddress, loading, error, proposalID, execute } =
    useCreateProposal(contractAddress)

  const handleProposal = (proposal: Proposal, contractAddress: string) => {
    execute(proposal).then(() => {
      successNotify('New Proposal Created')
    })
  }

  if (proposalID) {
    router.push(`/multisig/${contractAddress}/proposals/${proposalID}`)
  }

  return (
    <WalletLoader>
      <div className="flex flex-col w-full">
        <ProposalEditor
          onProposal={handleProposal}
          error={error}
          loading={loading}
          contractAddress={contractAddress}
          recipientAddress={walletAddress}
          multisig={true}
        />
      </div>
    </WalletLoader>
  )
}

export default ProposalCreate
