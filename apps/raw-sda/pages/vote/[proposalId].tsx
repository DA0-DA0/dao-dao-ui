import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  FormProposalData,
  useActionsWithoutDisabledKeys,
} from '@dao-dao/actions'
import { ConnectWalletButton } from '@dao-dao/common'
import {
  CwCoreQueryClient,
  CwProposalSingleHooks,
  CwProposalSingleQueryClient,
  useProposalInfo,
  useProposalModule,
} from '@dao-dao/state'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import {
  ErrorPage,
  LinkText,
  ProposalInfoCard,
  ProposalInfoVoteStatus,
  Trans,
} from '@dao-dao/ui'
import {
  CHAIN_RPC_ENDPOINT,
  CI,
  cleanChainError,
  cosmWasmClientRouter,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { PageWrapper, PageWrapperProps } from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'
import { DAO_ADDRESS, OLD_PROPOSALS_ADDRESS } from '@/util'

const InnerProposal: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { address: walletAddress, connected } = useWallet()

  const [showStaking, setShowStaking] = useState(false)
  const [loading, setLoading] = useState(false)

  const oldQuery = router.query.old
  const proposalIdQuery = router.query.proposalId
  const proposalId =
    typeof proposalIdQuery === 'string' && !isNaN(Number(proposalIdQuery))
      ? Number(proposalIdQuery)
      : undefined

  const { proposalModuleAddress, proposalModuleConfig } = useProposalModule(
    DAO_ADDRESS,
    {
      oldProposalsAddress: oldQuery ? OLD_PROPOSALS_ADDRESS : undefined,
    }
  )

  const {
    fields: { disabledActionKeys },
    hooks: { useVoteConversionDecimals },
    ui: { ProposalDetails },
  } = useVotingModuleAdapter()
  const actions = useActionsWithoutDisabledKeys(disabledActionKeys)
  const voteConversionDecimals = useVoteConversionDecimals(DAO_ADDRESS)

  const {
    proposalResponse,
    voteResponse,
    votingPowerAtHeight,
    txHash,
    refreshProposalAndAll,
  } = useProposalInfo(DAO_ADDRESS, proposalId, {
    oldProposalsAddress: oldQuery ? OLD_PROPOSALS_ADDRESS : undefined,
  })

  const castVote = CwProposalSingleHooks.useCastVote({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const executeProposal = CwProposalSingleHooks.useExecute({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const closeProposal = CwProposalSingleHooks.useClose({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })

  if (!proposalResponse || !proposalModuleConfig || proposalId === undefined) {
    throw new Error('Failed to load page data.')
  }

  const onVote = useCallback(
    async (vote: Vote) => {
      if (!connected || proposalId === undefined) return

      setLoading(true)

      try {
        await castVote({
          proposalId,
          vote,
        })

        refreshProposalAndAll()
        toast.success('Vote successfully cast.')
      } catch (err) {
        console.error(err)
        toast.error(
          cleanChainError(err instanceof Error ? err.message : `${err}`)
        )
      }

      setLoading(false)
    },
    [castVote, connected, proposalId, setLoading, refreshProposalAndAll]
  )

  const onExecute = useCallback(async () => {
    if (!connected || proposalId === undefined) return

    setLoading(true)

    try {
      const response = await executeProposal({
        proposalId,
      })

      refreshProposalAndAll()
      toast.success(
        `Executed successfully. Transaction hash (${response.transactionHash}) can be found in the proposal details.`
      )
    } catch (err) {
      console.error(err)
      toast.error(
        cleanChainError(err instanceof Error ? err.message : `${err}`)
      )
    }

    setLoading(false)
  }, [
    executeProposal,
    connected,
    proposalId,
    setLoading,
    refreshProposalAndAll,
  ])

  const onClose = useCallback(async () => {
    if (!connected || proposalId === undefined) return

    setLoading(true)

    try {
      await closeProposal({
        proposalId,
      })

      refreshProposalAndAll()
      toast.success(t('success.proposalClosed'))
    } catch (err) {
      console.error(err)
      toast.error(
        cleanChainError(err instanceof Error ? err.message : `${err}`)
      )
    }

    setLoading(false)
  }, [connected, proposalId, closeProposal, refreshProposalAndAll, t])

  const onDuplicate = useCallback(
    (actionData) => {
      const duplicateFormData: FormProposalData = {
        title: proposalResponse.proposal.title,
        description: proposalResponse.proposal.description,
        actionData: actionData.map(({ action: { key }, data }) => ({
          key,
          data,
        })),
      }

      router.push(
        `/propose?prefill=${encodeURIComponent(
          JSON.stringify(duplicateFormData)
        )}`
      )
    },
    [
      proposalResponse.proposal.description,
      proposalResponse.proposal.title,
      router,
    ]
  )

  const memberWhenProposalCreated =
    !!votingPowerAtHeight && Number(votingPowerAtHeight.power) > 0

  return (
    <div className="grid grid-cols-2 gap-4 mx-auto max-w-screen-md lg:grid-cols-3 lg:max-w-page">
      <div className="col-span-2">
        <div className="mb-6 lg:hidden">
          <ProposalInfoCard
            connected={connected}
            memberWhenProposalCreated={memberWhenProposalCreated}
            proposalExecutionTXHash={txHash}
            proposalResponse={proposalResponse}
            walletVote={voteResponse?.vote?.vote ?? undefined}
          />
        </div>

        <ProposalDetails
          actions={actions}
          allowRevoting={proposalModuleConfig.allow_revoting}
          connectWalletButton={<ConnectWalletButton />}
          connected={connected}
          loading={loading}
          onClose={onClose}
          onDuplicate={onDuplicate}
          onExecute={onExecute}
          onVote={onVote}
          proposal={proposalResponse.proposal}
          proposalId={proposalId}
          setShowStaking={setShowStaking}
          showStaking={showStaking}
          walletVote={voteResponse?.vote?.vote ?? undefined}
          walletWeightPercent={
            votingPowerAtHeight
              ? (Number(votingPowerAtHeight.power) /
                  Number(proposalResponse.proposal.total_power)) *
                100
              : 0
          }
        />

        <div className="pb-6 mt-6 lg:hidden">
          <h3 className="mb-6 text-base font-medium">
            {t('title.voteStatus')}
          </h3>

          <ProposalInfoVoteStatus
            maxVotingSeconds={
              'time' in proposalModuleConfig.max_voting_period
                ? proposalModuleConfig.max_voting_period.time
                : undefined
            }
            proposal={proposalResponse.proposal}
            voteConversionDecimals={voteConversionDecimals}
          />
        </div>
      </div>

      <div className="hidden min-h-screen lg:block bg-base-200">
        <h2 className="mb-6 text-base font-medium">{t('title.details')}</h2>
        <ProposalInfoCard
          connected={connected}
          memberWhenProposalCreated={memberWhenProposalCreated}
          proposalExecutionTXHash={txHash}
          proposalResponse={proposalResponse}
          walletVote={voteResponse?.vote?.vote ?? undefined}
        />

        <h3 className="mt-8 mb-6 text-base font-medium">
          {t('title.voteStatus')}
        </h3>
        <ProposalInfoVoteStatus
          maxVotingSeconds={
            'time' in proposalModuleConfig.max_voting_period
              ? proposalModuleConfig.max_voting_period.time
              : undefined
          }
          proposal={proposalResponse.proposal}
          voteConversionDecimals={voteConversionDecimals}
        />
      </div>
    </div>
  )
}

const ProposalNotFound = () => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.proposalNotFound')}>
      <p>
        <Trans i18nKey="error.couldntFindProposal">
          We couldn&apos;t find a proposal with that ID. See all proposals on
          the{' '}
          <LinkText aProps={{ className: 'underline link-text' }} href="/vote">
            Vote page
          </LinkText>
          .
        </Trans>
      </p>
    </ErrorPage>
  )
}

interface ProposalPageProps extends PageWrapperProps {
  exists: boolean
}

const ProposalPage: NextPage<ProposalPageProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    {/* Need optional chaining due to static path generation.
     *  Fallback page renders without any props on the server.
     */}
    {props?.exists ? <InnerProposal /> : <ProposalNotFound />}
  </PageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  // Need to block until i18n translations are ready, since i18n depends
  // on server side translations being loaded.
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<ProposalPageProps> = async (
  ...props
) => {
  // Don't query chain if running in CI.
  if (CI) {
    return { notFound: true }
  }

  const proposalIdQuery = props[0].params?.proposalId
  if (typeof proposalIdQuery !== 'string' || isNaN(Number(proposalIdQuery))) {
    const staticProps = await makeGetStaticProps((t) => ({
      followingTitle: t('error.proposalNotFound'),
    }))(...props)

    return 'props' in staticProps
      ? {
          ...staticProps,
          props: {
            ...staticProps.props,
            exists: false,
          },
        }
      : staticProps
  }

  const proposalId = Number(proposalIdQuery)

  try {
    // Verify proposal exists.
    const rpcClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
    // Get proposal module address.
    const daoClient = new CwCoreQueryClient(rpcClient, DAO_ADDRESS)
    const proposalAddress = (await daoClient.proposalModules({}))[0]
    // Get proposal.
    const proposalClient = new CwProposalSingleQueryClient(
      rpcClient,
      proposalAddress
    )

    let exists = false
    try {
      exists = !!(await proposalClient.proposal({ proposalId })).proposal
    } catch (err) {
      // If proposal doesn't exist, handle 404 manually on frontend.
      // Rethrow all other errors.
      if (
        !(err instanceof Error) ||
        !err.message.includes('Proposal not found')
      ) {
        throw err
      }

      console.error(err)
    }

    const staticProps = await makeGetStaticProps((t) => ({
      followingTitle: exists
        ? `${t('title.proposal')} #${proposalId}`
        : t('error.proposalNotFound'),
    }))(...props)

    return 'props' in staticProps
      ? {
          ...staticProps,
          props: {
            ...staticProps.props,
            exists,
          },
        }
      : staticProps
  } catch (error) {
    console.error(error)
    // Throw error to trigger 500.
    throw new Error('An unexpected error occurred. Please try again later.')
  }
}
