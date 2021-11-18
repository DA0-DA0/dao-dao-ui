import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useProposals } from 'hooks/proposals'
import ProposalList from 'components/ProposalList'

const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''

const Home: NextPage = () => {
  const router = useRouter()
  const { proposals, hideLoadMore, loading, setStartBefore } =
    useProposals(contractAddress)

  return (
    <WalletLoader loading={!proposals || (proposals.length === 0 && loading)}>
      <div className="flex flex-col w-96 lg:w-6/12 max-w-full px-2 py-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-bold sm:text-3xl">Proposals</h1>
          <button
            className="btn btn-primary btn-sm text-lg"
            onClick={() => router.push(`/proposals/create`)}
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
