import { findAttribute } from '@cosmjs/stargate/build/logs'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import { CreateProposalForm } from '@dao-dao/common'
import { t, useTranslation } from '@dao-dao/i18n'
import {
  Cw20BaseHooks,
  Cw20BaseSelectors,
  CwProposalSingleHooks,
  blockHeightSelector,
  refreshProposalsIdAtom,
  useProposalModule,
  useWallet,
} from '@dao-dao/state'
import { CopyToClipboard, SuspenseLoader } from '@dao-dao/ui'
import { cleanChainError, expirationExpired } from '@dao-dao/utils'

import {
  Loader,
  PageWrapper,
  PageWrapperProps,
  ProposalsInfo,
  useDAOInfoContext,
} from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'
import { DAO_ADDRESS } from '@/util'

const InnerProposalCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { votingModuleType } = useDAOInfoContext()
  const { address: walletAddress, connected, refreshBalances } = useWallet()
  const [loading, setLoading] = useState(false)

  const { proposalModuleAddress, proposalModuleConfig } =
    useProposalModule(DAO_ADDRESS)

  const currentAllowance = useRecoilValue(
    proposalModuleConfig?.deposit_info && proposalModuleAddress && walletAddress
      ? Cw20BaseSelectors.allowanceSelector({
          contractAddress: proposalModuleConfig.deposit_info.token,
          params: [{ owner: walletAddress, spender: proposalModuleAddress }],
        })
      : constSelector(undefined)
  )
  const blockHeight = useRecoilValue(blockHeightSelector)

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefreshProposalsId((id) => id + 1),
    [setRefreshProposalsId]
  )

  const increaseAllowance = Cw20BaseHooks.useIncreaseAllowance({
    contractAddress: proposalModuleConfig?.deposit_info?.token ?? '',
    sender: walletAddress ?? '',
  })
  const createProposal = CwProposalSingleHooks.usePropose({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })

  const onProposalSubmit = useCallback(
    async (d: any) => {
      if (
        !connected ||
        !blockHeight ||
        !proposalModuleConfig ||
        (proposalModuleConfig.deposit_info && !currentAllowance) ||
        !proposalModuleAddress
      )
        throw new Error('Required info not loaded to create a proposal.')

      const proposalDeposit = Number(
        proposalModuleConfig?.deposit_info?.deposit ?? '0'
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
            spender: proposalModuleAddress,
          })

          // Allowances will not update until the next block has been added.
          setTimeout(refreshBalances, 6500)
        } catch (err) {
          console.error(err)
          toast.error(
            `Failed to increase allowance to pay proposal deposit: (${cleanChainError(
              err instanceof Error ? err.message : `${err}`
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
        router.push(`/vote/${proposalId}`)
        // Don't stop loading indicator since we are navigating.
      } catch (err) {
        console.error(err)
        toast.error(
          cleanChainError(err instanceof Error ? err.message : `${err}`)
        )
        setLoading(false)
      }
    },
    [
      blockHeight,
      connected,
      createProposal,
      currentAllowance,
      proposalModuleAddress,
      increaseAllowance,
      proposalModuleConfig,
      refreshBalances,
      router,
      refreshProposals,
    ]
  )

  return (
    <div className="flex flex-col gap-14 justify-center md:flex-row md:gap-8">
      <div className="md:w-2/3">
        <h2 className="mb-4 font-medium text-medium">
          {t('Create a proposal')}
        </h2>

        <SuspenseLoader fallback={<Loader />}>
          <CreateProposalForm
            coreAddress={DAO_ADDRESS}
            loading={loading}
            onSubmit={onProposalSubmit}
            votingModuleType={votingModuleType}
          />
        </SuspenseLoader>
      </div>

      <div className="flex-1">
        <h2 className="mb-4 font-medium text-medium">{t('addresses')}</h2>

        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center mb-8">
          <p className="font-mono text-sm text-tertiary">{t('daoTreasury')}</p>
          <div className="col-span-2">
            <CopyToClipboard value={DAO_ADDRESS} />
          </div>
        </div>

        <h2 className="mb-4 font-medium text-medium">{t('proposalInfo')}</h2>
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
  followingTitle: t('Create a proposal'),
})
