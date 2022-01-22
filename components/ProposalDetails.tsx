import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ThresholdResponse } from '@dao-dao/types/contracts/cw3-dao'
import { CheckIcon, SparklesIcon, XIcon } from '@heroicons/react/outline'
import { proposalUpdateCountAtom, proposalsUpdated } from 'atoms/proposals'
import { Address } from './Address'
import ProposalVotes from 'components/ProposalVotes'
import { useSigningClient } from 'contexts/cosmwasm'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import toast from 'react-hot-toast'
import { ProposalStatus } from '@components'
import {
  atom,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil'
import { isMemberSelector } from 'selectors/daos'
import {
  proposalSelector,
  proposalTallySelector,
  proposalVotesSelector
} from 'selectors/proposals'
import { walletAddress, walletTokenBalanceLoading } from 'selectors/treasury'
import { cleanChainError } from 'util/cleanChainError'
import { convertMicroDenomToDenom } from 'util/conversion'
import { defaultExecuteFee } from 'util/fee'
import { decodedMessagesString, decodeMessages } from 'util/messagehelpers'
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
      defaultExecuteFee
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
      defaultExecuteFee
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

// Fake button which shows an loader while we are executing proposal actions.
function ExecutingButton() {
  return (
    <button className="btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px1 bg-base-300 btn-disabled loading">
      Executing
    </button>
  )
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
  member,
  voted,
  setLoading,
}: {
  yesCount: string
  noCount: string
  proposalId: number
  contractAddress: string
  member: boolean
  voted: boolean
  setLoading: SetterOrUpdater<boolean>
}) {
  const { signingClient, walletAddress } = useSigningClient()
  const setProposalUpdates = useSetRecoilState(
    proposalUpdateCountAtom({ contractAddress, proposalId })
  )
  const setProposalsUpdated = useSetRecoilState(
    proposalsUpdated(contractAddress)
  )

  const ready = walletAddress && signingClient && member && !voted
  const tooltip =
    ((!walletAddress || !signingClient) && 'Connect your wallet to vote') ||
    (!member &&
      'You must have voting power to vote. Consider staking some tokens.') ||
    (voted && 'You already voted') ||
    'Something went wrong'

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
      <div className="flex gap-3">
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
  member,
  setLoading,
}: {
  proposalId: number
  contractAddress: string
  member: boolean
  setLoading: SetterOrUpdater<boolean>
}) {
  const { signingClient, walletAddress } = useSigningClient()
  const setProposalUpdates = useSetRecoilState(
    proposalUpdateCountAtom({ contractAddress, proposalId })
  )
  const setProposalsUpdated = useSetRecoilState(
    proposalsUpdated(contractAddress)
  )

  const ready = walletAddress && signingClient && member
  const tooltip =
    ((!walletAddress || !signingClient) &&
      'Please connect your wallet to vote') ||
    (!member &&
      'You must have voting power to vote. Consider staking some tokens.') ||
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

const thresholdString = (t: ThresholdResponse, multisig: boolean) => {
  if ('absolute_count' in t) {
    const count = t.absolute_count.weight
    return `${multisig ? count : convertMicroDenomToDenom(count)} votes`
  } else if ('absolute_percentage' in t) {
    const threshold = t.absolute_percentage.percentage
    return `${Number(threshold) * 100}%`
  } else if ('threshold_quorum' in t) {
    const quorum = t.threshold_quorum.quorum
    const threshold = t.threshold_quorum.threshold
    return `${quorum}% quorum; ${threshold}% threshold`
  } else {
    return 'unknown'
  }
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

  const localeOptions = { maximumSignificantDigits: 3 }

  const yesVotes = Number(
    multisig
      ? proposalTally.votes.yes
      : convertMicroDenomToDenom(proposalTally.votes.yes)
  )
  const noVotes = Number(
    multisig
      ? proposalTally.votes.no
      : convertMicroDenomToDenom(proposalTally.votes.no)
  )
  const totalWeight = Number(
    multisig
      ? proposalTally.total_weight
      : convertMicroDenomToDenom(proposalTally.total_weight)
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
        {!multisig && (
          // https://github.com/DA0-DA0/dao-contracts/issues/136
          <>
            <p className="text-secondary">Proposer</p>
            <p className="col-span-2">
              <Address address={proposal.proposer} />
            </p>
          </>
        )}
        {proposal.status === 'open' && (
          <>
            <p className="text-secondary">Expires</p>
            <p className="col-span-2">{getEnd(proposal.expires) || 'never'}</p>
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
        <div className="col-span-2">
          {thresholdString(proposal.threshold, !!multisig)}
        </div>
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
  const proposalVotes = useRecoilValue(
    proposalVotesSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const member = useRecoilValue(isMemberSelector(contractAddress))
  const visitorAddress = useRecoilValue(walletAddress)
  const voted = proposalVotes.some((v) => v.voter === visitorAddress)

  const [actionLoading, setActionLoading] = useRecoilState(
    proposalActionLoading
  )

  const wallet = useRecoilValue(walletAddress)
  // If token balances are loading we don't know if the user is a
  // member or not.
  const tokenBalancesLoading = useRecoilValue(walletTokenBalanceLoading(wallet))

  if (!proposal) {
    router.replace(`/dao/${contractAddress}`)
    return <div>Error</div>
  }

  const yesVotes = Number(
    multisig
      ? proposalTally?.votes.yes
      : convertMicroDenomToDenom(proposalTally?.votes.yes ?? '0')
  )
  const noVotes = Number(
    multisig
      ? proposalTally?.votes.no
      : convertMicroDenomToDenom(proposalTally?.votes.no ?? 0)
  )

  const decodedMessages = decodeMessages(proposal)

  return (
    <div className="p-6">
      <h1 className="text-4xl font-medium font-semibold">{proposal.title}</h1>
      {actionLoading && (
        <div className="mt-3">
          <ExecutingButton />
        </div>
      )}
      {!actionLoading && proposal.status === 'open' && (
        <div className="mt-3">
          {tokenBalancesLoading ? (
            <LoadingButton />
          ) : (
            <ProposalVoteButtons
              yesCount={yesVotes.toString()}
              noCount={noVotes.toString()}
              proposalId={proposalId}
              contractAddress={contractAddress}
              member={member.member}
              voted={voted}
              setLoading={setActionLoading}
            />
          )}
        </div>
      )}
      {!actionLoading && proposal.status === 'passed' && member.member && (
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
      <p className="text-medium mt-6">{proposal.description}</p>
      {proposal.msgs.length > 0 || decodedMessages ? (
        <pre className="overflow-auto mt-6 border rounded-lg p-3 text-secondary border-secondary">
          {decodedMessagesString(proposal)}
        </pre>
      ) : (
        <pre></pre>
      )}
      <div className="mt-6">
        <ProposalVotes votes={proposalVotes} />
      </div>
    </div>
  )
}
