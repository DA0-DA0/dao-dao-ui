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
  isMemberSelector,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import {
  proposalExecutionTXHashSelector,
  proposalSelector,
  proposalStartBlockSelector,
  proposalTallySelector,
  votingPowerAtHeightSelector,
  WalletVote,
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
  expirationAtTimeToSecondsFromNow,
  getThresholdAndQuorumDisplay,
  secondsToWdhms,
} from 'util/conversion'
import { decodedMessagesString, decodeMessages } from 'util/messagehelpers'

import { treasuryTokenListUpdates } from '../atoms/treasury'
import { CopyToClipboard } from './CopyToClipboard'
import { CosmosMessageDisplay } from './CosmosMessageDisplay'
import { Execute } from './Execute'
import SvgAbstain from './icons/Abstain'
import { Progress } from './Progress'
import { getEnd } from './ProposalList'
import { StakingModal, StakingMode } from './StakingModal'
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

  const { member } = useRecoilValue(isMemberSelector(contractAddress))

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

  const turnoutTotal = yesVotes + noVotes + abstainVotes
  const turnoutYesPercent = turnoutTotal ? (yesVotes / turnoutTotal) * 100 : 0
  const turnoutNoPercent = turnoutTotal ? (noVotes / turnoutTotal) * 100 : 0
  const turnoutAbstainPercent = turnoutTotal
    ? (abstainVotes / turnoutTotal) * 100
    : 0

  const turnoutPercent = (turnoutTotal / totalWeight) * 100
  const totalYesPercent = (yesVotes / totalWeight) * 100
  const totalNoPercent = (noVotes / totalWeight) * 100
  const totalAbstainPercent = (abstainVotes / totalWeight) * 100

  if (!proposal) {
    return <div>Error, no proposal</div>
  }

  // TODO: Replace this function.
  const [threshold, quorum] = getThresholdAndQuorumDisplay(
    proposal.threshold,
    !!multisig,
    tokenDecimals
  )
  const thresholdValue = threshold.endsWith('%')
    ? Number(threshold.slice(0, -1))
    : 0
  const quorumValue = quorum?.endsWith('%')
    ? Number(quorum.slice(0, -1))
    : undefined

  const maxVotingSeconds =
    'time' in sigConfig.config.max_voting_period
      ? sigConfig.config.max_voting_period.time
      : undefined
  const expiresInSeconds =
    proposal.expires && 'at_time' in proposal.expires
      ? expirationAtTimeToSecondsFromNow(proposal.expires)
      : undefined

  return (
    <div>
      <h2 className="font-medium mb-6">Details</h2>
      <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
        <p className="text-tertiary font-mono text-sm text-ellipsis overflow-hidden">
          Proposal
        </p>
        <p className="col-span-2 text-tertiary font-mono text-sm">
          # {proposal.id.toString().padStart(6, '0')}
        </p>
        <p className="text-tertiary font-mono text-sm text-ellipsis overflow-hidden">
          Status
        </p>
        <div className="col-span-2 text-sm">
          <ProposalStatus status={proposal.status} />
        </div>
        <p className="text-tertiary font-mono text-sm text-ellipsis overflow-hidden">
          Proposer
        </p>
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
        <h3 className="font-medium mt-8 mb-6">Referendum status</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {member && (
          <>
            <p className="text-tertiary text-sm font-mono text-ellipsis overflow-hidden">
              Your vote
            </p>

            {walletVote === WalletVote.Yes ? (
              <p className="col-span-2 text-valid text-sm font-mono flex items-center gap-1">
                <CheckIcon className="inline w-4" /> Yes
              </p>
            ) : walletVote === WalletVote.No ? (
              <p className="col-span-2 text-error text-sm font-mono flex items-center gap-1">
                <XIcon className="inline w-4" /> No
              </p>
            ) : walletVote === WalletVote.Abstain ? (
              <p className="col-span-2 text-secondary text-sm font-mono flex items-center gap-1">
                <SvgAbstain fill="currentColor" /> Abstain
              </p>
            ) : walletVote === WalletVote.Veto ? (
              <p className="col-span-2 text-error text-sm font-mono flex items-center gap-1">
                <XIcon className="inline w-4" /> Veto
              </p>
            ) : walletVote ? (
              <p className="col-span-2 text-secondary text-sm font-mono break-all">
                Unknown: {walletVote}
              </p>
            ) : (
              <p className="col-span-2 text-tertiary text-sm font-mono">
                {proposal.status === 'open' ? 'Pending...' : 'None'}
              </p>
            )}
          </>
        )}

        {quorumValue === undefined ? (
          <>
            <div className="col-span-3 mb-3 flex flex-row justify-between items-center">
              <p className="text-tertiary text-sm font-mono text-ellipsis overflow-hidden">
                Turnout
              </p>

              {totalYesPercent > thresholdValue ? (
                <p className="text-xs text-valid font-mono">Yes</p>
              ) : totalNoPercent > thresholdValue ? (
                <p className="text-xs text-error font-mono">No</p>
              ) : (
                <p className="text-xs text-tertiary font-mono">
                  {totalYesPercent > totalNoPercent
                    ? "'Yes' leads"
                    : totalNoPercent > totalYesPercent
                    ? "'No' leads"
                    : 'Tied'}
                </p>
              )}
            </div>

            <p className="col-span-2 text-xs font-mono flex flex-row items-center gap-4">
              {[
                <span key="yes" className="text-valid">
                  Yes {totalYesPercent.toLocaleString(undefined, localeOptions)}
                  %
                </span>,
                <span key="no" className="text-error">
                  No {totalNoPercent.toLocaleString(undefined, localeOptions)}%
                </span>,
              ].sort((a, b) => totalYesPercent - totalNoPercent)}
            </p>
            <p className="col-span-1 text-xs font-mono text-dark text-right">
              Abstain{' '}
              {totalAbstainPercent.toLocaleString(undefined, localeOptions)}%
            </p>

            <div className="col-span-3 my-2">
              <Progress
                rows={[
                  {
                    thickness: 3,
                    data: [
                      ...[
                        {
                          value: Number(totalYesPercent),
                          color: 'rgb(var(--valid))',
                        },
                        {
                          value: Number(totalNoPercent),
                          color: 'rgb(var(--error))',
                        },
                      ].sort((a, b) => b.value - a.value),
                      {
                        value: Number(totalAbstainPercent),
                        color: 'rgb(var(--dark))',
                      },
                    ],
                  },
                ]}
                // TODO: Handle absolute_count.
                verticalBars={
                  'absolute_count' in proposal.threshold
                    ? []
                    : [
                        {
                          value: thresholdValue,
                          color: 'rgba(var(--dark), 0.5)',
                        },
                      ]
                }
              />
            </div>

            <div className="col-span-3 bg-light px-4 py-3 rounded-md flex flex-row justify-between items-center">
              <p className="text-tertiary text-sm">Passing threshold</p>
              <p className="text-tertiary text-xs font-mono">{threshold}</p>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-3 flex flex-row justify-between items-center mb-3">
              <p className="text-tertiary text-sm font-mono text-ellipsis overflow-hidden">
                Ratio of votes
              </p>

              {proposal.status === 'open' || proposal.status === 'pending' ? (
                <p className="text-xs text-tertiary font-mono">
                  {turnoutYesPercent > turnoutNoPercent
                    ? "'Yes' leads"
                    : turnoutNoPercent > turnoutYesPercent
                    ? "'No' leads"
                    : 'Tied'}
                </p>
              ) : turnoutYesPercent > thresholdValue ? (
                <p className="text-xs text-valid font-mono">Yes</p>
              ) : turnoutNoPercent > thresholdValue ? (
                <p className="text-xs text-error font-mono">No</p>
              ) : (
                // TODO: Decide what to show if proposal is no longer open but nothing is past the threshold.
                <p className="text-xs text-tertiary font-mono">Tied</p>
              )}
            </div>

            <p className="col-span-2 text-xs font-mono flex flex-row items-center gap-4">
              {[
                <span key="yes" className="text-valid">
                  Yes{' '}
                  {turnoutYesPercent.toLocaleString(undefined, localeOptions)}%
                </span>,
                <span key="no" className="text-error">
                  No {turnoutNoPercent.toLocaleString(undefined, localeOptions)}
                  %
                </span>,
              ].sort((a, b) => turnoutYesPercent - turnoutNoPercent)}
            </p>
            <p className="col-span-1 text-xs font-mono text-dark text-right">
              Abstain{' '}
              {turnoutAbstainPercent.toLocaleString(undefined, localeOptions)}%
            </p>

            <div className="col-span-3 my-2">
              <Progress
                rows={[
                  {
                    thickness: 3,
                    data: [
                      ...[
                        {
                          value: Number(turnoutYesPercent),
                          color: 'rgb(var(--valid))',
                        },
                        {
                          value: Number(turnoutNoPercent),
                          color: 'rgb(var(--error))',
                        },
                      ].sort((a, b) => b.value - a.value),
                      {
                        value: Number(turnoutAbstainPercent),
                        color: 'rgb(var(--dark))',
                      },
                    ],
                  },
                ]}
                // TODO: Handle absolute_count.
                verticalBars={
                  'absolute_count' in proposal.threshold
                    ? []
                    : [
                        {
                          value: thresholdValue,
                          color: 'rgba(var(--dark), 0.5)',
                        },
                      ]
                }
              />
            </div>

            <div className="col-span-3 bg-light px-4 py-3 rounded-md flex flex-row justify-between items-center">
              <p className="text-tertiary text-sm">Passing threshold</p>
              <p className="text-tertiary text-xs font-mono">{threshold}</p>
            </div>

            <div className="col-span-3 flex flex-row justify-between mt-4 mb-3">
              <p className="text-tertiary text-sm font-mono text-ellipsis overflow-hidden">
                Turnout
              </p>

              {turnoutPercent > quorumValue && (
                <p className="text-xs text-valid font-mono flex flex-row items-center gap-1">
                  Quorum reached <CheckIcon className="inline w-4" />
                </p>
              )}
            </div>

            <p className="col-span-3 text-tertiary text-xs font-mono">
              {turnoutPercent.toLocaleString(undefined, localeOptions)}%
            </p>

            <div className="col-span-3 my-2">
              <Progress
                rows={[
                  {
                    thickness: 3,
                    data: [
                      {
                        value: turnoutPercent,
                        color: 'rgb(var(--dark))',
                      },
                    ],
                  },
                ]}
                verticalBars={[
                  {
                    value: quorumValue,
                    color: 'rgba(var(--dark), 0.5)',
                  },
                ]}
              />
            </div>

            <div className="col-span-3 bg-light px-4 py-3 rounded-md flex flex-row justify-between items-center">
              <p className="text-tertiary text-sm">Quorum</p>
              <p className="text-tertiary text-xs font-mono">{quorum}</p>
            </div>
          </>
        )}

        {expiresInSeconds !== undefined && expiresInSeconds > 0 && (
          <>
            <p className="col-span-3 text-tertiary text-sm font-mono text-ellipsis overflow-hidden mt-4">
              Time left
            </p>

            <p className="col-span-3 text-dark text-xs font-mono text-right">
              {/* TODO: Do not need to show in full detail. */}
              {secondsToWdhms(expiresInSeconds)}
            </p>

            {maxVotingSeconds !== undefined && (
              <div className="col-span-3 mt-1">
                <Progress
                  rows={[
                    {
                      thickness: 3,
                      data: [
                        {
                          value: (expiresInSeconds / maxVotingSeconds) * 100,
                          color: 'rgb(var(--dark))',
                        },
                      ],
                    },
                  ]}
                  alignEnd
                />
              </div>
            )}
          </>
        )}
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
  const wallet = useRecoilValue(walletAddressSelector)

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
  const setTokenBalancesLoading = useSetRecoilState(
    walletTokenBalanceLoading(wallet)
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

  const [loading, setLoading] = useState(false)

  const [showRaw, setShowRaw] = useState(false)
  const [showStaking, setShowStakng] = useState(false)

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
      {proposal.status === 'open' && !walletVote && votingPower !== 0 && (
        <Vote
          voterWeight={weightPercent}
          loading={loading}
          onVote={(position) =>
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
          }
        />
      )}
      {walletVote && (
        <p className="body-text">You voted {walletVote} on this proposal.</p>
      )}
      {proposal.status !== 'open' && !walletVote && (
        <p className="body-text">You did not vote on this proposal.</p>
      )}
      {votingPower === 0 && (
        <p className="body-text max-w-prose">
          You must have voting power at the time of proposal creation to vote.{' '}
          {!multisig && (
            <button className="underline" onClick={() => setShowStakng(true)}>
              Stake some tokens?
            </button>
          )}
          {!multisig && showStaking && (
            <StakingModal
              defaultMode={StakingMode.Stake}
              contractAddress={contractAddress}
              claimAmount={0}
              onClose={() => setShowStakng(false)}
              beforeExecute={() => setTokenBalancesLoading(true)}
              afterExecute={() => setTokenBalancesLoading(false)}
            />
          )}
        </p>
      )}
    </div>
  )
}
