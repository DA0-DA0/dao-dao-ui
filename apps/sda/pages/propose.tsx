import { findAttribute } from '@cosmjs/stargate/build/logs'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  blockHeightSelector,
  refreshProposalsIdAtom,
  useWallet,
} from '@dao-dao/state'
import { usePropose } from '@dao-dao/state/hooks/cw-proposal-single'
import { useIncreaseAllowance } from '@dao-dao/state/hooks/cw20-base'
import { allowanceSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { CopyToClipboard } from '@dao-dao/ui'

import {
  Loader,
  makeGetStaticProps,
  PageWrapper,
  PageWrapperProps,
  ProposalForm,
  ProposalsInfo,
  SuspenseLoader,
} from '@/components'
import { useGovernanceModule } from '@/hooks'
import { cleanChainError, DAO_ADDRESS, expirationExpired } from '@/util'

const InnerProposalCreate = () => {
  const router = useRouter()
  const { address: walletAddress, connected, refreshBalances } = useWallet()
  const [loading, setLoading] = useState(false)

  const { governanceModuleAddress, governanceModuleConfig } =
    useGovernanceModule()

  const currentAllowance = useRecoilValue(
    governanceModuleConfig?.deposit_info &&
      governanceModuleAddress &&
      walletAddress
      ? allowanceSelector({
          contractAddress: governanceModuleConfig.deposit_info.token,
          params: [{ owner: walletAddress, spender: governanceModuleAddress }],
        })
      : constSelector(undefined)
  )
  const blockHeight = useRecoilValue(blockHeightSelector)

  const setRefrehProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefrehProposalsId((id) => id + 1),
    [setRefrehProposalsId]
  )

  const increaseAllowance = useIncreaseAllowance({
    contractAddress: governanceModuleConfig?.deposit_info?.token ?? '',
    sender: walletAddress ?? '',
  })
  const createProposal = usePropose({
    contractAddress: governanceModuleAddress ?? '',
    sender: walletAddress ?? '',
  })

  const onProposalSubmit = useCallback(
    async (d: any) => {
      if (
        !connected ||
        !blockHeight ||
        !governanceModuleConfig ||
        (governanceModuleConfig.deposit_info && !currentAllowance) ||
        !governanceModuleAddress
      )
        throw new Error('Required info not loaded to create a proposal.')

      const proposalDeposit = Number(
        governanceModuleConfig?.deposit_info?.deposit ?? '0'
      )

      setLoading(true)

      // Request to increase the contract's allowance for the proposal deposit if needed.
      if (
        proposalDeposit &&
        currentAllowance &&
        // Ensure current allowance is insufficient or expired.
        (expirationExpired(currentAllowance.expires, blockHeight) ||
          Number(currentAllowance.allowance) < proposalDeposit)
      ) {
        try {
          await increaseAllowance({
            amount: (
              proposalDeposit - Number(currentAllowance.allowance)
            ).toString(),
            spender: governanceModuleAddress,
          })

          // Allowances will not update until the next block has been added.
          setTimeout(refreshBalances, 6500)
        } catch (err) {
          console.error(err)
          toast.error(
            `Failed to increase allowance to pay proposal deposit: (${cleanChainError(
              err.message
            )})`
          )
          return
        }
      }

      try {
        const response = await createProposal({
          title: d.title,
          description: d.description,
          msgs: d.messages,
        })

        const proposalId = findAttribute(
          response.logs,
          'wasm',
          'proposal_id'
        ).value
        refreshProposals()
        router.push(`/proposal/${proposalId}`)
      } catch (err) {
        console.error(err)
        toast.error(cleanChainError(err.message))
      }

      setLoading(false)
    },
    [
      blockHeight,
      connected,
      createProposal,
      currentAllowance,
      governanceModuleAddress,
      increaseAllowance,
      governanceModuleConfig,
      refreshBalances,
      router,
      refreshProposals,
    ]
  )

  return (
    <div className="flex flex-col gap-14 justify-center md:flex-row md:gap-8">
      <div className="md:w-2/3">
        <h2 className="mb-4 font-medium text-medium">Create Proposal</h2>

        <SuspenseLoader fallback={<Loader />}>
          <ProposalForm loading={loading} onSubmit={onProposalSubmit} />
        </SuspenseLoader>
      </div>

      <div className="flex-1">
        <h2 className="mb-4 font-medium text-medium">Addresses</h2>

        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center mb-8">
          <p className="font-mono text-sm text-tertiary">DAO Treasury</p>
          <div className="col-span-2">
            <CopyToClipboard value={DAO_ADDRESS} />
          </div>
        </div>

        <h2 className="mb-4 font-medium text-medium">Proposal Info</h2>
        <ProposalsInfo className="md:flex-col md:items-stretch md:p-0 md:border-0" />
      </div>
    </div>
  )
}

const ProposalCreatePage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerProposalCreate />
  </PageWrapper>
)

export default ProposalCreatePage

export const getStaticProps = makeGetStaticProps({
  followingTitle: 'Create Proposal',
})
