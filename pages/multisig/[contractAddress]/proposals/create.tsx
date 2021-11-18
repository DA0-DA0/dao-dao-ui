import LineAlert from 'components/LineAlert'
import ProposalEditor from 'components/ProposalEditor'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCreateProposal } from 'hooks/proposals'
import { Proposal } from 'models/proposal/proposal'

const ProposalCreate: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const ROUTE_PREFIX = `/multisig/${contractAddress}/proposals`

  const { walletAddress, loading, error, proposalID, execute } =
    useCreateProposal(contractAddress)

  const handleProposal = (proposal: Proposal) => {
    execute(proposal).then(() => {
      const paramStr = `initialMessageStatus=success`
      router.push(`${ROUTE_PREFIX}/${proposalID}?${paramStr}`)
    })
  }

  const content = proposalID ? (
    <div>
      <LineAlert className="mt-2" variant="success" msg="Proposal Saved" />
      <a
        href={`${ROUTE_PREFIX}/${proposalID}`}
      >{`Proposal ${proposalID} saved`}</a>
    </div>
  ) : (
    <ProposalEditor
      onProposal={handleProposal}
      error={error}
      loading={loading}
      contractAddress={contractAddress}
      recipientAddress={walletAddress}
    />
  )

  return (
    <WalletLoader>
      <div className="flex flex-col w-full">{content}</div>
    </WalletLoader>
  )
}

export default ProposalCreate
