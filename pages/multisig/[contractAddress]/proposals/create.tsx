import { ProposalEditor } from 'components/ProposalEditor'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCreateProposal } from 'hooks/proposals'
import { Proposal } from 'models/proposal/proposal'
import { successNotify } from 'util/toast'
import LineAlert from 'components/LineAlert'
import { cleanChainError } from 'util/cleanChainError'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { useRecoilValue } from 'recoil'
import { sigSelector } from 'selectors/multisigs'

const ProposalCreate: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))

  const { walletAddress, loading, error, proposalID, execute } =
    useCreateProposal(contractAddress)

  const handleProposal = (proposal: Proposal) => {
    execute(proposal).then(() => {
      if (!error) {
        successNotify('New Proposal Created')
      }
    })
  }

  if (proposalID) {
    router.push(`/multisig/${contractAddress}/proposals/${proposalID}`)
  }

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/multisig/list', 'Multisigs'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, 'Create proposal'],
          ]}
        />

        <ProposalEditor
          onProposal={handleProposal}
          loading={loading}
          contractAddress={contractAddress}
          recipientAddress={walletAddress}
          multisig={true}
        />
        {error && (
          <div className="mt-8">
            <LineAlert variant="error" msg={cleanChainError(error)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProposalCreate
