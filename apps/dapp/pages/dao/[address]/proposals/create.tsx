import { findAttribute } from '@cosmjs/stargate/build/logs'
import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import { CreateProposalForm } from '@dao-dao/common'
import {
  Cw20BaseHooks,
  Cw20BaseSelectors,
  CwProposalSingleHooks,
  blockHeightSelector,
  refreshProposalsIdAtom,
  useProposalModule,
  useVotingModule,
  useWalletBalance,
} from '@dao-dao/state'
import {
  Breadcrumbs,
  CopyToClipboard,
  Loader,
  PageLoader,
  SuspenseLoader,
} from '@dao-dao/ui'
import { cleanChainError, expirationExpired } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import {
  DAOPageWrapper,
  DAOPageWrapperProps,
  ProposalsInfo,
  SmallScreenNav,
  useDAOInfoContext,
} from '@/components'
import { makeGetDAOStaticProps } from '@/server/makeGetDAOStaticProps'

const InnerProposalCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, name } = useDAOInfoContext()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletBalance()
  const [loading, setLoading] = useState(false)

  const blockHeight = useRecoilValue(blockHeightSelector)
  const { isMember } = useVotingModule(coreAddress, { fetchMembership: true })
  const { proposalModuleAddress, proposalModuleConfig } =
    useProposalModule(coreAddress)
  const {
    ui: { ProposalCreateAddresses },
  } = useVotingModuleAdapter()

  if (
    !proposalModuleAddress ||
    !proposalModuleConfig ||
    blockHeight === undefined
  ) {
    throw new Error('Failed to load info.')
  }

  const requiredProposalDeposit = Number(
    proposalModuleConfig.deposit_info?.deposit ?? '0'
  )

  const allowanceResponse = useRecoilValue(
    proposalModuleConfig.deposit_info &&
      requiredProposalDeposit &&
      walletAddress
      ? Cw20BaseSelectors.allowanceSelector({
          contractAddress: proposalModuleConfig.deposit_info.token,
          params: [{ owner: walletAddress, spender: proposalModuleAddress }],
        })
      : constSelector(undefined)
  )

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefreshProposalsId((id) => id + 1),
    [setRefreshProposalsId]
  )

  const increaseAllowance = Cw20BaseHooks.useIncreaseAllowance({
    contractAddress: proposalModuleConfig.deposit_info?.token ?? '',
    sender: walletAddress ?? '',
  })
  const createProposal = CwProposalSingleHooks.usePropose({
    contractAddress: proposalModuleAddress,
    sender: walletAddress ?? '',
  })

  const onProposalSubmit = useCallback(
    async (d: any) => {
      if (
        !connected ||
        !proposalModuleConfig ||
        !proposalModuleAddress ||
        // If required deposit, ensure the allowance and unstaked balance
        // data have loaded.
        (requiredProposalDeposit && !allowanceResponse)
      ) {
        throw new Error('Failed to load required info to create a proposal.')
      }

      setLoading(true)

      // Typecheck for TS; should've already been verified above.
      if (requiredProposalDeposit && allowanceResponse) {
        const remainingAllowanceNeeded =
          requiredProposalDeposit -
          // If allowance expired, none.
          (expirationExpired(allowanceResponse.expires, blockHeight)
            ? 0
            : Number(allowanceResponse.allowance))

        // Request to increase the contract's allowance for the proposal
        // deposit if needed.
        if (remainingAllowanceNeeded) {
          try {
            await increaseAllowance({
              amount: remainingAllowanceNeeded.toString(),
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
            setLoading(false)
            return
          }
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
        router.push(`/dao/${coreAddress}/proposals/${proposalId}`)
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
      connected,
      proposalModuleConfig,
      proposalModuleAddress,
      requiredProposalDeposit,
      allowanceResponse,
      blockHeight,
      increaseAllowance,
      refreshBalances,
      createProposal,
      refreshProposals,
      router,
      coreAddress,
    ]
  )

  return (
    <>
      <SmallScreenNav />

      <div className="flex flex-col gap-14 justify-center p-6 md:flex-row md:gap-8">
        <div className="md:w-2/3">
          <Breadcrumbs
            className="mb-6"
            crumbs={[
              ['/home', t('title.home')],
              [`/dao/${coreAddress}`, name],
              [router.asPath, t('title.createAProposal')],
            ]}
          />

          <h2 className="mb-6 font-medium lg:hidden">
            {t('title.createAProposal')}
          </h2>

          {!isMember && (
            <p className="-mt-4 mb-6 text-error caption-text">
              {t('error.mustBeMemberToCreateProposal')}
            </p>
          )}

          <SuspenseLoader fallback={<Loader />}>
            <CreateProposalForm
              Loader={Loader}
              coreAddress={coreAddress}
              loading={loading}
              onSubmit={onProposalSubmit}
            />
          </SuspenseLoader>
        </div>

        <div className="flex-1">
          <h2 className="mb-4 font-medium text-medium">
            {t('title.addresses')}
          </h2>

          <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center mb-8">
            <p className="font-mono text-sm text-tertiary">
              {t('info.daoAddress')}
            </p>
            <div className="col-span-2">
              <CopyToClipboard value={coreAddress} />
            </div>

            <ProposalCreateAddresses />
          </div>

          <h2 className="mb-4 font-medium text-medium">
            {t('title.proposalInfo')}
          </h2>
          <ProposalsInfo className="md:flex-col md:items-stretch md:p-0 md:border-0" />
        </div>
      </div>
    </>
  )
}

const ProposalCreatePage: NextPage<DAOPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DAOPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      <InnerProposalCreate />
    </SuspenseLoader>
  </DAOPageWrapper>
)

export default ProposalCreatePage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  // Need to block until i18n translations are ready, since i18n depends
  // on server side translations being loaded.
  fallback: true,
})

export const getStaticProps = makeGetDAOStaticProps(({ t }) => ({
  followingTitle: t('title.createAProposal'),
}))
