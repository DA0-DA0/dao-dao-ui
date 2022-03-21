import { ReactNode } from 'react'

import { useRouter } from 'next/router'

import {
  atom,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

import { cleanChainError } from 'util/cleanChainError'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import {
  convertMicroDenomToDenomWithDecimals,
  getThresholdAndQuorumDisplay,
} from 'util/conversion'
import { decodedMessagesString, decodeMessages } from 'util/messagehelpers'

import ProposalVoteStatus from '@components/ProposalVoteStatus'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { CheckIcon, SparklesIcon, XIcon } from '@heroicons/react/outline'
import { proposalUpdateCountAtom, proposalsUpdated } from 'atoms/proposals'
import { MarkdownPreview } from 'components/MarkdownPreview'
import { PaginatedProposalVotes } from 'components/ProposalVotes'
import toast from 'react-hot-toast'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { isMemberSelector } from 'selectors/daos'
import {
  proposalSelector,
  proposalStartBlockSelector,
  proposalTallySelector,
  votingPowerAtHeightSelector,
  walletVotedSelector,
} from 'selectors/proposals'
import { walletTokenBalanceLoading } from 'selectors/treasury'

import { ProposalStatus } from '@components'

import { treasuryTokenListUpdates } from '../atoms/treasury'
import { Address } from './Address'
import { CosmosMessageDisplay } from './CosmosMessageDisplay'
import { getEnd } from './ProposalList'

function executeProposalVote(
  vote: 'yes' | 'no',
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
      toast.success(`Success. Transaction hash: (${response.transactionHash})`)
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
  proposalId,
  contractAddress,
  voted,
  setLoading,
  multisig = false,
}: {
  yesCount: string
  noCount: string
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

  const height = useRecoilValue(
    proposalStartBlockSelector({ contractAddress, proposalId })
  )
  const stakedBalanceAtStart = useRecoilValue(
    votingPowerAtHeightSelector({
      contractAddress,
      height,
      multisig,
    })
  )

  const ready =
    walletAddress && signingClient && !voted && stakedBalanceAtStart != 0
  const tooltip =
    ((!walletAddress || !signingClient) && 'Connect your wallet to vote') ||
    (stakedBalanceAtStart == 0 &&
      'You must have staked balance at the time of proposal creation to vote.') ||
    (voted && 'You already voted.') ||
    'Something went wrong.'

  const VoteButton = ({
    position,
    children,
  }: {
    position: 'yes' | 'no'
    children: ReactNode
  }) => (
    <button
      className={
        'btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1' +
        (position === 'yes' ? ' hover:bg-green-500' : ' hover:bg-red-500') +
        (ready ? '' : ' btn-disabled bg-base-300')
      }
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
  const totalWeight = Number(
    multisig
      ? proposalTally.total_weight
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.total_weight,
          tokenDecimals
        )
  )

  const turnoutPercent = (
    ((yesVotes + noVotes) / totalWeight) *
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
      <h2 className="font-medium text-sm font-mono mb-8 text-secondary">
        Proposal {proposal.id}
      </h2>
      <div className="grid grid-cols-3">
        <p className="text-secondary">Status</p>
        <div className="col-span-2">
          <ProposalStatus status={proposal.status} />
        </div>
        <p className="text-secondary">Proposer</p>
        <p className="col-span-2">
          <Address address={proposal.proposer} />
        </p>
        {proposal.status === 'open' && (
          <>
            <p className="text-secondary">Expires</p>
            <p className="col-span-2">
              {getEnd(proposal.expires, proposal.status) || 'never'}
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 mt-6">
        <p className="text-secondary">Yes votes</p>
        <div className="col-span-2">
          {yesVotes} <p className="text-secondary inline">({yesPercent}%)</p>
        </div>
        <p className="text-secondary">No votes</p>
        <div className="col-span-2">
          {noVotes} <p className="text-secondary inline">({noPercent}%)</p>
        </div>
        <p className="text-secondary">Threshold</p>
        <div className="col-span-2">{threshold}</div>
        {quorum && (
          <>
            <p className="text-secondary">Quorum</p>
            <div className="col-span-2">{quorum}</div>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 mt-6">
        <p className="text-secondary">Turnout</p>
        <div className="col-span-2">{turnoutPercent}%</div>
      </div>
    </div>
  )
}

const proposalActionLoading = atom({
  key: 'proposalActionLoading',
  default: false,
})

export function ProposalDetails({
  contractAddress,
  proposalId,
  multisig,
}: {
  contractAddress: string
  proposalId: number
  multisig?: boolean
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

  const [actionLoading, setActionLoading] = useRecoilState(
    proposalActionLoading
  )

  const wallet = useRecoilValue(walletAddressSelector)
  // If token balances are loading we don't know if the user is a
  // member or not.
  const tokenBalancesLoading = useRecoilValue(walletTokenBalanceLoading(wallet))

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

  const decodedMessages = decodeMessages(proposal.msgs)

  return (
    <div className="p-6">
      <div className="max-w-prose">
        <h1 className="text-4xl font-semibold">{proposal.title}</h1>
      </div>
      {actionLoading && (
        <div className="mt-3">
          <LoadingButton />
        </div>
      )}
      {!actionLoading && proposal.status === 'open' && (
        <div className="mt-3 flex flex-row flex-wrap items-center gap-3">
          {tokenBalancesLoading ? (
            <LoadingButton />
          ) : (
            <>
              <ProposalVoteButtons
                yesCount={yesVotes.toString()}
                noCount={noVotes.toString()}
                proposalId={proposalId}
                contractAddress={contractAddress}
                voted={voted}
                setLoading={setActionLoading}
                multisig={!!multisig}
              />
              <ProposalVoteStatus
                contractAddress={contractAddress}
                proposalId={proposalId}
              />
            </>
          )}
        </div>
      )}
      {!actionLoading && proposal.status === 'passed' && (
        <div className="mt-3">
          {tokenBalancesLoading ? (
            <LoadingButton />
          ) : (
            <ProposalExecuteButton
              proposalId={proposalId}
              contractAddress={contractAddress}
              member={member.member}
              setLoading={setActionLoading}
            />
          )}
        </div>
      )}
      <div className="py-4">
        <MarkdownPreview markdown={proposal.description} />
      </div>
      {decodedMessages?.length ? (
        <CosmosMessageDisplay value={decodedMessagesString(proposal.msgs)} />
      ) : (
        <pre></pre>
      )}
      <div className="mt-6">
        <PaginatedProposalVotes
          contractAddress={contractAddress}
          proposalId={proposalId}
        />
      </div>
    </div>
  )
}
