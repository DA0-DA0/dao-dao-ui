import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import { useRouter } from 'next/router'
import { useProposals } from 'hooks/proposals'
import ProposalList from 'components/ProposalList'

const Home: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const { proposals, hideLoadMore, loading, setStartBefore } =
    useProposals(contractAddress)

  return (
    <WalletLoader loading={proposals.length === 0 && loading}>
      <div className="flex flex-col w-96 lg:w-6/12 max-w-full px-2 py-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-bold sm:text-3xl">Proposals</h1>
          <button
            className="btn btn-primary btn-sm text-lg"
            onClick={() =>
              router.push(
                `/multisig/${encodeURIComponent(
                  contractAddress
                )}/proposals/create`
              )
            }
          >
            + Create
          </button>
        </div>
      </div>
      <ProposalList
        proposals={proposals}
        contractAddress={contractAddress}
        hideLoadMore={hideLoadMore}
        onLoadMore={() => {
          const proposal = proposals && proposals[proposals.length - 1]
          if (proposal) {
            setStartBefore(proposal.id)
          }
        }}
      />

      <div></div>
    </WalletLoader>
  )
}

export default Home
