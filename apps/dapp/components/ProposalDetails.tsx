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
  SparklesIcon,
  XIcon,
} from '@heroicons/react/outline'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from 'ui'

import { ProposalStatus } from '@components'

import { proposalUpdateCountAtom, proposalsUpdated } from 'atoms/proposals'
import { MarkdownPreview } from 'components/MarkdownPreview'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import {
  proposalExecutionTXHashSelector,
  proposalSelector,
  proposalStartBlockSelector,
  proposalTallySelector,
  votingPowerAtHeightSelector,
  walletVoteSelector,
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
import { Execute } from './Execute'
import SvgAbstain from './icons/Abstain'
import { Progress } from './Progress'
import { getEnd } from './ProposalList'
import { Vote, VoteChoice } from './Vote'

function executeProposalVote(
  choice: VoteChoice,
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
  let vote
  switch (choice) {
    case VoteChoice.Yes:
      vote = 'yes'
      break
    case VoteChoice.No:
      vote = 'no'
      break
    case VoteChoice.Abstain:
      vote = 'abstain'
      break
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
  const walletVote = useRecoilValue(
    walletVoteSelector({ contractAddress, proposalId })
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
      ? proposalTally.votes.abstain
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.votes.abstain,
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
    ((yesVotes + noVotes + abstainVotes) / totalWeight) *
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
        <p className="text-tertiary text-sm font-mono">Yours</p>
        {!walletVote && (
          <p className="col-span-3 text-tertiary text-sm font-mono">
            Pending...
          </p>
        )}
        {walletVote === 'yes' && (
          <p className="col-span-3 text-valid text-sm font-mono flex items-center gap-1">
            <CheckIcon className="inline w-4" /> Yes
          </p>
        )}
        {walletVote === 'no' && (
          <p className="col-span-3 text-error text-sm font-mono flex items-center gap-1">
            <XIcon className="inline w-4" /> No
          </p>
        )}
        {walletVote === 'abstain' && (
          <p className="col-span-3 text-secondary text-sm font-mono flex items-center gap-1">
            <SvgAbstain fill="currentColor" /> Abstain
          </p>
        )}
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
          <p className="text-sm text-body font-mono">{threshold}</p>
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
  )!

  const height = useRecoilValue(
    proposalStartBlockSelector({ proposalId, contractAddress })
  )
  const votingPower = useRecoilValue(
    votingPowerAtHeightSelector({
      contractAddress,
      multisig: !!multisig,
      height,
    })
  )
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletVote = useRecoilValue(
    walletVoteSelector({ contractAddress, proposalId })
  )

  const setProposalUpdates = useSetRecoilState(
    proposalUpdateCountAtom({ contractAddress, proposalId })
  )
  const setProposalsUpdated = useSetRecoilState(
    proposalsUpdated(contractAddress)
  )
  const setTreasuryTokenListUpdates = useSetRecoilState(
    treasuryTokenListUpdates(contractAddress)
  )

  const threshold = proposal.threshold
  // :D
  // All the threshold variants have a total_weight key so we just index into
  // whatever this is and get that.
  const totalPower = Number(
    ((threshold as any)[Object.keys(threshold)[0] as string] as any)
      .total_weight
  )
  const weightPercent = (votingPower / totalPower) * 100

  const wallet = useRecoilValue(walletAddressSelector)
  const [loading, setLoading] = useState(false)

  const [showRaw, setShowRaw] = useState(false)

  if (!proposal) {
    router.replace(`/${multisig ? 'multisig' : 'dao'}/${contractAddress}`)
    return <div>Error</div>
  }

  const decodedMessages = decodeMessages(proposal.msgs)

  return (
    <div className="p-6">
      <div className="max-w-prose">
        <h1 className="header-text text-xl">{proposal.title}</h1>
      </div>
      <div className="mt-[22px]">
        <MarkdownPreview markdown={proposal.description} />
      </div>
      <p className="caption-text font-mono mb-[12px] mt-[36px]">Messages</p>
      <div className="max-w-3xl">
        {decodedMessages?.length ? (
          showRaw ? (
            <CosmosMessageDisplay
              value={decodedMessagesString(proposal.msgs)}
            />
          ) : (
            <ProposalMessageTemplateList
              msgs={proposal.msgs}
              contractAddress={contractAddress}
              multisig={multisig}
              fromCosmosMsgProps={fromCosmosMsgProps}
            />
          )
        ) : (
          <pre>[]</pre>
        )}
      </div>
      {!!decodedMessages.length && (
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
      )}
      {proposal.status === 'passed' && (
        <>
          <p className="caption-text font-mono mb-[12px] mt-[30px]">Status</p>
          <Execute
            loading={loading}
            onExecute={() =>
              executeProposalExecute(
                proposalId,
                contractAddress,
                signingClient,
                wallet,
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
            messages={proposal.msgs.length}
          />
        </>
      )}
      <p className="caption-text font-mono mb-[12px] mt-[30px]">Vote</p>
      {proposal.status === 'open' && !walletVote && (
        <Vote
          voterWeight={weightPercent}
          loading={loading}
          onVote={(position) => {
            executeProposalVote(
              position,
              proposalId,
              contractAddress,
              signingClient,
              wallet,
              () => {
                setProposalUpdates((n) => n + 1)
                setProposalsUpdated((p) =>
                  p.includes(proposalId) ? p : p.concat([proposalId])
                )
              },
              setLoading
            )
          }}
        />
      )}
      {walletVote && (
        <p className="body-text">You voted {walletVote} on this proposal.</p>
      )}
    </div>
  )
}
