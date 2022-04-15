import { ReactNode, useState } from 'react'

import { useRouter } from 'next/router'

import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  Button,
  StakingMode,
  ProposalDetails as StatelessProposalDetails,
} from '@dao-dao/ui'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { proposalUpdateCountAtom, proposalsUpdated } from 'atoms/proposals'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import {
  proposalSelector,
  proposalStartBlockSelector,
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
import { decodedMessagesString, decodeMessages } from 'util/messagehelpers'

import { treasuryTokenListUpdates } from '../atoms/treasury'
import { Execute } from './Execute'
import { StakingModal } from './StakingModal'
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
          contractAddress={contractAddress}
          getLabel={(field) => field}
          multisig={multisig}
          readOnly
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
        contractAddress={contractAddress}
        multisig={multisig}
        template={data.template}
        values={data.values}
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

  return <StatelessProposalDetails proposal={proposal} />

  return (
    <div className="p-6">
      <div className="max-w-prose">
        <h1 className="header-text">{proposal.title}</h1>
      </div>
      <div className="mt-[22px]">
        <MarkdownPreview markdown={proposal.description} />
      </div>
      <p className="mt-[36px] mb-[12px] font-mono caption-text">Messages</p>
      <div className="max-w-3xl">
        {decodedMessages?.length ? (
          showRaw ? (
            <CosmosMessageDisplay
              value={decodedMessagesString(proposal.msgs)}
            />
          ) : (
            <ProposalMessageTemplateList
              contractAddress={contractAddress}
              fromCosmosMsgProps={fromCosmosMsgProps}
              msgs={proposal.msgs}
              multisig={multisig}
            />
          )
        ) : (
          <pre>[]</pre>
        )}
      </div>
      {!!decodedMessages.length && (
        <div className="mt-4">
          <Button
            onClick={() => setShowRaw((s) => !s)}
            size="sm"
            variant="secondary"
          >
            {showRaw ? (
              <>
                Hide raw data
                <EyeOffIcon className="inline ml-1 h-4 stroke-current" />
              </>
            ) : (
              <>
                Show raw data
                <EyeIcon className="inline ml-1 h-4 stroke-current" />
              </>
            )}
          </Button>
        </div>
      )}
      {proposal.status === 'passed' && (
        <>
          <p className="mt-[30px] mb-[12px] font-mono caption-text">Status</p>
          <Execute
            loading={loading}
            messages={proposal.msgs.length}
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
          />
        </>
      )}
      <p className="mt-[30px] mb-[12px] font-mono caption-text">Vote</p>
      {proposal.status === 'open' && !walletVote && votingPower !== 0 && (
        <Vote
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
          voterWeight={weightPercent}
        />
      )}
      {walletVote && (
        <p className="body-text">You voted {walletVote} on this proposal.</p>
      )}
      {proposal.status !== 'open' && !walletVote && (
        <p className="body-text">You did not vote on this proposal.</p>
      )}
      {votingPower === 0 && (
        <p className="max-w-prose body-text">
          You must have voting power at the time of proposal creation to vote.{' '}
          {!multisig && (
            <button className="underline" onClick={() => setShowStakng(true)}>
              Stake some tokens?
            </button>
          )}
          {!multisig && showStaking && (
            <StakingModal
              afterExecute={() => setTokenBalancesLoading(false)}
              beforeExecute={() => setTokenBalancesLoading(true)}
              claimableTokens={0}
              contractAddress={contractAddress}
              defaultMode={StakingMode.Stake}
              onClose={() => setShowStakng(false)}
            />
          )}
        </p>
      )}
    </div>
  )
}
