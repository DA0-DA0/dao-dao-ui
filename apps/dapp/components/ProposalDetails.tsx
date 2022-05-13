import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { useWallet } from '@dao-dao/state'
import {
  StakingMode,
  ProposalDetails as StatelessProposalDetails,
  CosmosMessageDisplay,
} from '@dao-dao/ui'
import { VoteChoice } from '@dao-dao/ui'

import { StakingModal } from './StakingModal'
import { proposalUpdateCountAtom, proposalsUpdated } from '@/atoms/proposals'
import { treasuryTokenListUpdates } from '@/atoms/treasury'
import {
  proposalSelector,
  proposalStartBlockSelector,
  votingPowerAtHeightSelector,
  walletVoteSelector,
} from '@/selectors/proposals'
import { walletTokenBalanceLoading } from '@/selectors/treasury'
import {
  FromCosmosMsgProps,
  messageTemplateAndValuesForDecodedCosmosMsg,
} from '@/templates/templateList'
import { cleanChainError } from '@/util/cleanChainError'

function executeProposalVote(
  choice: VoteChoice,
  id: number,
  contractAddress: string,
  signingClient: SigningCosmWasmClient | null | undefined,
  walletAddress: string | undefined,
  onDone: Function,
  setLoading: SetterOrUpdater<boolean>
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet.')
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
  signingClient: SigningCosmWasmClient | null | undefined,
  walletAddress: string | undefined,
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
  const { address: walletAddress, signingClient } = useWallet()

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
  const walletVote = useRecoilValue(
    walletVoteSelector({ contractAddress, proposalId })
  )
  const setTokenBalancesLoading = useSetRecoilState(
    walletTokenBalanceLoading(walletAddress ?? '')
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
  const [showStaking, setShowStaking] = useState(false)

  if (!proposal) {
    router.replace(`/${multisig ? 'multisig' : 'dao'}/${contractAddress}`)
    return <div>Error</div>
  }

  return (
    <StatelessProposalDetails
      loading={loading}
      messageToDisplay={(message) => {
        const data = messageTemplateAndValuesForDecodedCosmosMsg(
          message,
          fromCosmosMsgProps
        )
        if (data) {
          const ThisIsAComponentBecauseReactIsAnnoying = () => {
            // Can't call `useForm` in a callback.
            const formMethods = useForm({ defaultValues: data.values })
            return (
              <FormProvider {...formMethods}>
                <form>
                  <data.template.component
                    contractAddress={contractAddress}
                    getLabel={(field: string) => field}
                    multisig={multisig}
                    readOnly
                  />
                </form>
              </FormProvider>
            )
          }
          return <ThisIsAComponentBecauseReactIsAnnoying />
        }
        return (
          <CosmosMessageDisplay value={JSON.stringify(message, undefined, 2)} />
        )
      }}
      onExecute={() =>
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
      onVote={(choice) =>
        executeProposalVote(
          choice,
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
      proposal={proposal}
      setShowStaking={(s) => setShowStaking(s)}
      showStaking={showStaking}
      stakingModal={
        <StakingModal
          afterExecute={() => setTokenBalancesLoading(false)}
          beforeExecute={() => setTokenBalancesLoading(true)}
          claimableTokens={0}
          contractAddress={contractAddress}
          defaultMode={StakingMode.Stake}
          onClose={() => setShowStaking(false)}
        />
      }
      walletVote={walletVote}
      walletWeightPercent={weightPercent}
    />
  )
}
