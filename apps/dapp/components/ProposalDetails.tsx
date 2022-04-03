import { ReactNode, useState } from 'react'

import { useRouter } from 'next/router'

import {
  SetterOrUpdater,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  CheckIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  MinusIcon,
  SparklesIcon,
  XIcon,
} from '@heroicons/react/outline'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from 'ui'

import { ProposalStatus } from '@components'

import ProposalVoteStatus from '@components/ProposalVoteStatus'
import { proposalUpdateCountAtom, proposalsUpdated } from 'atoms/proposals'
import { MarkdownPreview } from 'components/MarkdownPreview'
import { PaginatedProposalVotes } from 'components/ProposalVotes'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { isMemberSelector } from 'selectors/daos'
import {
  proposalExecutionTXHashSelector,
  proposalSelector,
  proposalStartBlockSelector,
  proposalTallySelector,
  votingPowerAtHeightSelector,
  walletVotedSelector,
} from 'selectors/proposals'
import { walletTokenBalanceLoading } from 'selectors/treasury'
import {
  FromCosmosMsgProps,
  MessageTemplate,
  messageTemplateAndValuesForDecodedCosmosMsg,
} from 'templates/templateList'
import { cleanChainError } from 'util/cleanChainError'
import { CHAIN_TXN_URL_PREFIX } from 'util/constants'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import {
  convertMicroDenomToDenomWithDecimals,
  getThresholdAndQuorumDisplay,
} from 'util/conversion'
import { decodedMessagesString, decodeMessages } from 'util/messagehelpers'

import { treasuryTokenListUpdates } from '../atoms/treasury'
import { CopyToClipboard } from './CopyToClipboard'
import { CosmosMessageDisplay } from './CosmosMessageDisplay'
import { Progress } from './Progress'
import { getEnd } from './ProposalList'
import { Button } from 'ui'
import { InputLabel } from './input/InputLabel'

function executeProposalVote(
  vote: 'yes' | 'no' | 'abstain',
  id: number,
  contractAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  onDone: Function,
  setLoading: SetterOrUpdater<boolean>
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }
  setLoading(true)
  signingClient
    .execute(
      walletAddress,
      contractAddress,
      {
        vote: { proposal_id: id, vote },
      },
      'auto'
    )
    .then((response) => {
      toast.success(`Success. Transaction hash: (${response.transactionHash})`)
    })
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
    .finally(() => {
      setLoading(false)
      onDone()
    })
}

function executeProposalExecute(
  id: number,
  contractAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  onDone: Function,
  setLoading: SetterOrUpdater<boolean>
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }
  setLoading(true)
  signingClient
    .execute(
      walletAddress,
      contractAddress,
      {
        execute: { proposal_id: id },
      },
      'auto'
    )
    .then((response) => {
      toast.success(
        `Success. Transaction hash (${response.transactionHash}) can be found in the sidebar.`
      )
    })
    .catch((err) => {
      console.error(err)
      console.error(err.message)
      toast.error(cleanChainError(err.message))
    })
    .finally(() => {
      setLoading(false)
      onDone()
    })
}

function LoadingButton() {
  return (
    <button className="btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px1 bg-base-300 btn-disabled loading">
      Loading
    </button>
  )
}

function ProposalVoteButtons({
  yesCount,
  noCount,
  abstainCount,
  proposalId,
  contractAddress,
  voted,
  setLoading,
  multisig = false,
}: {
  yesCount: string
  noCount: string
  abstainCount: string
  proposalId: number
  contractAddress: string
  voted: boolean
  setLoading: SetterOrUpdater<boolean>
  multisig: boolean
}) {
  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)

  const setProposalUpdates = useSetRecoilState(
    proposalUpdateCountAtom({ contractAddress, proposalId })
  )
  const setProposalsUpdated = useSetRecoilState(
    proposalsUpdated(contractAddress)
  )

  /* const height = useRecoilValue(
   *   proposalStartBlockSelector({ contractAddress, proposalId })
   * ) */

  // TODO: reactivate this check.
  //
  // After the chain recovering on 04/08 queries like `junod query tsx` which
  // this one relies on stopped working for the time before the halt. Removing this
  // for now, and then we need to add it back later.
  /* const stakedBalanceAtStart = useRecoilValue(
   *   votingPowerAtHeightSelector({
   *     contractAddress,
   *     height,
   *     multisig,
   *   })
   * ) */

  const ready = walletAddress && signingClient && !voted // && stakedBalanceAtStart !== 0
  const tooltip =
    ((!walletAddress || !signingClient) && 'Connect your wallet to vote') ||
    /* (stakedBalanceAtStart == 0 &&
     *   'You must have staked balance at the time of proposal creation to vote.') || */
    (voted && 'You already voted.') ||
    'Something went wrong.'

  const VoteButton = ({
    position,
    children,
  }: {
    position: 'yes' | 'no' | 'abstain'
    children: ReactNode
  }) => (
    <button
      className={`btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1 ${
        position === 'yes'
          ? ' hover:bg-green-500 hover:border-green-500'
          : position === 'no'
          ? ' hover:bg-red-500 hover:border-red-500'
          : ' hover:bg-primary hover:border-primary'
      } ${ready ? '' : ' btn-disabled bg-base-300'}`}
      onClick={() =>
        executeProposalVote(
          position,
          proposalId,
          contractAddress,
          signingClient,
          walletAddress,
          () => {
            setProposalUpdates((n) => n + 1)
            setProposalsUpdated((p) =>
              p.includes(proposalId) ? p : p.concat([proposalId])
            )
          },
          setLoading
        )
      }
    >
      {children}
    </button>
  )
  return (
    <div className={!ready ? 'tooltip tooltip-right' : ''} data-tip={tooltip}>
      <div className="flex gap-2">
        <VoteButton position="yes">
          <CheckIcon className="w-4 h-4 inline mr-2" />
          Yes
          <p className="text-secondary ml-2">{yesCount}</p>
        </VoteButton>
        <VoteButton position="no">
          <XIcon className="w-4 h-4 inline mr-2" />
          No
          <p className="text-secondary ml-2">{noCount}</p>
        </VoteButton>
        <VoteButton position="abstain">
          <MinusIcon className="w-4 h-4 inline mr-2" />
          Abstain
          <p className="text-secondary ml-2">{abstainCount}</p>
        </VoteButton>
      </div>
    </div>
  )
}

function ProposalExecuteButton({
  proposalId,
  contractAddress,
  setLoading,
}: {
  proposalId: number
  contractAddress: string
  member: boolean
  setLoading: SetterOrUpdater<boolean>
}) {
  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)

  const setProposalUpdates = useSetRecoilState(
    proposalUpdateCountAtom({ contractAddress, proposalId })
  )
  const setProposalsUpdated = useSetRecoilState(
    proposalsUpdated(contractAddress)
  )
  const setTreasuryTokenListUpdates = useSetRecoilState(
    treasuryTokenListUpdates(contractAddress)
  )

  const ready = walletAddress && signingClient
  const tooltip =
    ((!walletAddress || !signingClient) && 'Please connect your wallet.') ||
    'Something went wrong'

  const VoteButton = ({ children }: { children: ReactNode }) => (
    <button
      className={
        'btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1' +
        (ready ? '' : ' btn-disabled bg-base-300')
      }
      onClick={() =>
        executeProposalExecute(
          proposalId,
          contractAddress,
          signingClient,
          walletAddress,
          () => {
            setProposalUpdates((n) => n + 1)
            setProposalsUpdated((p) =>
              p.includes(proposalId) ? p : p.concat([proposalId])
            )
            setTreasuryTokenListUpdates((n) => n + 1)
          },
          setLoading
        )
      }
    >
      {children}
    </button>
  )
  return (
    <div className={!ready ? 'tooltip tooltip-right' : ''} data-tip={tooltip}>
      <div className="flex gap-3">
        <VoteButton>
          <SparklesIcon className="w-4 h-4 inline mr-2" />
          Execute
        </VoteButton>
      </div>
    </div>
  )
}

export function ProposalDetailsSidebar({
  contractAddress,
  proposalId,
  multisig,
}: {
  contractAddress: string
  proposalId: number
  multisig?: boolean
}) {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )
  const { state: proposalExecutionTXHashState, contents: txHashContents } =
    useRecoilValueLoadable(
      proposalExecutionTXHashSelector({ contractAddress, proposalId })
    )
  const proposalExecutionTXHash: string | null =
    proposalExecutionTXHashState === 'hasValue' ? txHashContents : null

  const sigConfig = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )
  const configWrapper = new ContractConfigWrapper(sigConfig)
  const tokenDecimals = configWrapper.gov_token_decimals

  const localeOptions = { maximumSignificantDigits: 3 }

  const yesVotes = Number(
    multisig
      ? proposalTally.votes.yes
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.votes.yes,
          tokenDecimals
        )
  )
  const noVotes = Number(
    multisig
      ? proposalTally.votes.no
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.votes.no,
          tokenDecimals
        )
  )
  const abstainVotes = Number(
    multisig
      ? proposalTally?.votes.abstain
      : convertMicroDenomToDenomWithDecimals(
          proposalTally?.votes.abstain ?? 0,
          tokenDecimals
        )
  )
  const totalWeight = Number(
    multisig
      ? proposalTally.total_weight
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.total_weight,
          tokenDecimals
        )
  )

  const turnoutPercent = (
    ((yesVotes + noVotes) / (totalWeight - abstainVotes)) *
    100
  ).toLocaleString(undefined, localeOptions)
  const yesPercent = ((yesVotes / totalWeight) * 100).toLocaleString(
    undefined,
    localeOptions
  )
  const noPercent = ((noVotes / totalWeight) * 100).toLocaleString(
    undefined,
    localeOptions
  )

  if (!proposal) {
    return <div>Error, no proposal</div>
  }

  const [threshold, quorum] = getThresholdAndQuorumDisplay(
    proposal.threshold,
    !!multisig,
    tokenDecimals
  )

  return (
    <div>
      <h2 className="font-medium text-medium mb-6">Details</h2>
      <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
        <p className="text-tertiary font-mono text-sm">Proposal</p>
        <p className="col-span-2 text-tertiary font-mono text-sm">
          # {proposal.id.toString().padStart(6, '0')}
        </p>
        <p className="text-tertiary font-mono text-sm">Status</p>
        <div className="col-span-2 text-sm">
          <ProposalStatus status={proposal.status} />
        </div>
        <p className="text-tertiary font-mono text-sm">Proposer</p>
        <p className="col-span-2">
          <CopyToClipboard value={proposal.proposer} />
        </p>
        {proposal.status === 'executed' &&
        proposalExecutionTXHashState === 'loading' ? (
          <>
            <p className="text-tertiary font-mono text-sm">TX</p>
            <p className="col-span-2">Loading...</p>
          </>
        ) : !!proposalExecutionTXHash ? (
          <>
            {CHAIN_TXN_URL_PREFIX ? (
              <a
                className="text-tertiary font-mono text-sm flex flex-row items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
                href={CHAIN_TXN_URL_PREFIX + proposalExecutionTXHash}
              >
                TX
                <ExternalLinkIcon width={16} />
              </a>
            ) : (
              <p className="text-tertiary font-mono text-sm">TX</p>
            )}
            <p className="col-span-2">
              <CopyToClipboard value={proposalExecutionTXHash} />
            </p>
          </>
        ) : null}
        {proposal.status === 'open' && (
          <>
            <p className="text-tertiary font-mono text-sm">Expires</p>
            <p className="col-span-2 text-sm font-mono">
              {getEnd(proposal.expires, proposal.status) || 'never'}
            </p>
          </>
        )}
      </div>

      <div>
        <h3 className="text-medium mt-8 mb-6">Referendum status</h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <p className="text-tertiary text-sm font-mono">Yes</p>
        <div className="col-span-3 flex items-center gap-2 grid grid-cols-4 text-right">
          <div className="col-span-3">
            <Progress turnout={Number(yesPercent)} color="rgb(var(--valid))" />
          </div>
          <p className="text-sm font-mono text-body">{yesPercent}%</p>
        </div>
        <p className="text-tertiary text-sm font-mono">No</p>
        <div className="col-span-3 flex items-center gap-2 grid grid-cols-4 text-right">
          <div className="col-span-3">
            <Progress turnout={Number(noPercent)} color="rgb(var(--error))" />
          </div>
          <p className="text-sm text-body font-mono">{noPercent}%</p>
        </div>
        <p className="text-tertiary text-sm font-mono">Threshold</p>
        <div className="col-span-3 flex items-center gap-2 grid grid-cols-4 text-right">
          <div className="col-span-3">
            <Progress
              turnout={Number(threshold?.substring(0, threshold.length - 1))}
              color="rgb(var(--brand))"
            />
          </div>
          <p className="text-sm text-body font-mono">{threshold}%</p>
        </div>
        {quorum && (
          <>
            <p className="text-tertiary text-sm font-mono">Quorum</p>
            <div className="col-span-3 flex items-center gap-2 grid grid-cols-4 text-right">
              <div className="col-span-3">
                <Progress
                  turnout={Number(quorum?.substring(0, quorum.length - 1))}
                  color="rgb(var(--brand))"
                />
              </div>
              <p className="text-sm text-body">{quorum}%</p>
            </div>
          </>
        )}
        <p className="text-tertiary text-sm font-mono">Turnout</p>
        <div className="col-span-3 flex items-center gap-2 grid grid-cols-4 text-right">
          <div className="col-span-3">
            <Progress
              turnout={Number(turnoutPercent)}
              color="rgb(var(--dark))"
            />
          </div>
          <p className="text-sm text-body font-mono">{turnoutPercent}%</p>
        </div>
      </div>
    </div>
  )
}

interface ProposalMessageTemplateListItemProps {
  template: MessageTemplate
  values: any
  contractAddress: string
  multisig?: boolean
}

function ProposalMessageTemplateListItem({
  template,
  values,
  contractAddress,
  multisig,
}: ProposalMessageTemplateListItemProps) {
  const formMethods = useForm({
    defaultValues: values,
  })

  return (
    <FormProvider {...formMethods}>
      <form>
        <template.component
          getLabel={(field) => field}
          readOnly
          contractAddress={contractAddress}
          multisig={multisig}
        />
      </form>
    </FormProvider>
  )
}

interface ProposalMessageTemplateListProps {
  msgs: CosmosMsgFor_Empty[]
  contractAddress: string
  multisig?: boolean
  fromCosmosMsgProps: FromCosmosMsgProps
}

function ProposalMessageTemplateList({
  msgs,
  contractAddress,
  multisig,
  fromCosmosMsgProps,
}: ProposalMessageTemplateListProps) {
  const components: ReactNode[] = msgs.map((msg, index) => {
    const decoded = decodeMessages([msg])[0]
    const data = messageTemplateAndValuesForDecodedCosmosMsg(
      decoded,
      fromCosmosMsgProps
    )

    return data ? (
      <ProposalMessageTemplateListItem
        key={index}
        template={data.template}
        values={data.values}
        contractAddress={contractAddress}
        multisig={multisig}
      />
    ) : (
      // If no message template found, render raw message.
      <CosmosMessageDisplay
        key={index}
        value={JSON.stringify(decoded, undefined, 2)}
      />
    )
  })

  return <>{components}</>
}

export function ProposalDetails({
  contractAddress,
  proposalId,
  multisig,
  fromCosmosMsgProps,
}: {
  contractAddress: string
  proposalId: number
  multisig?: boolean
  fromCosmosMsgProps: FromCosmosMsgProps
}) {
  const router = useRouter()
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const sigConfig = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )
  const configWrapper = new ContractConfigWrapper(sigConfig)
  const tokenDecimals = configWrapper.gov_token_decimals
  const member = useRecoilValue(isMemberSelector(contractAddress))

  const voted = useRecoilValue(
    walletVotedSelector({ contractAddress, proposalId })
  )

  const [actionLoading, setActionLoading] = useState(false)

  const wallet = useRecoilValue(walletAddressSelector)
  // If token balances are loading we don't know if the user is a
  // member or not.
  const tokenBalancesLoading = useRecoilValue(walletTokenBalanceLoading(wallet))

  const [showRaw, setShowRaw] = useState(false)

  if (!proposal) {
    router.replace(`/${multisig ? 'multisig' : 'dao'}/${contractAddress}`)
    return <div>Error</div>
  }

  const yesVotes = Number(
    multisig
      ? proposalTally?.votes.yes
      : convertMicroDenomToDenomWithDecimals(
          proposalTally?.votes.yes ?? '0',
          tokenDecimals
        )
  )
  const noVotes = Number(
    multisig
      ? proposalTally?.votes.no
      : convertMicroDenomToDenomWithDecimals(
          proposalTally?.votes.no ?? 0,
          tokenDecimals
        )
  )
  const abstainVotes = Number(
    multisig
      ? proposalTally?.votes.abstain
      : convertMicroDenomToDenomWithDecimals(
          proposalTally?.votes.abstain ?? 0,
          tokenDecimals
        )
  )

  const decodedMessages = decodeMessages(proposal.msgs)

  return (
    <div className="p-6">
      <div className="max-w-prose">
        <h1 className="text-4xl font-semibold">{proposal.title}</h1>
      </div>
      <div className="mt-[22px]">
        <MarkdownPreview markdown={proposal.description} />
      </div>
      <p className="caption-text font-mono mb-[12px] mt-[36px]">Messages</p>
      {decodedMessages?.length ? (
        showRaw ? (
          <CosmosMessageDisplay value={decodedMessagesString(proposal.msgs)} />
        ) : (
          <ProposalMessageTemplateList
            msgs={proposal.msgs}
            contractAddress={contractAddress}
            multisig={multisig}
            fromCosmosMsgProps={fromCosmosMsgProps}
          />
        )
      ) : (
        <pre></pre>
      )}
      <div className="mt-4">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setShowRaw((s) => !s)}
        >
          {showRaw ? (
            <>
              Hide raw data
              <EyeOffIcon className="inline h-4 stroke-current ml-1" />
            </>
          ) : (
            <>
              Show raw data
              <EyeIcon className="inline h-4 stroke-current ml-1" />
            </>
          )}
        </Button>
      </div>
      <div className="mt-6">
        <PaginatedProposalVotes
          contractAddress={contractAddress}
          proposalId={proposalId}
        />
      </div>
    </div>
  )
}
