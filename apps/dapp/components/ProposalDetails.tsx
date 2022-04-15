import { useState } from 'react'

import { useRouter } from 'next/router'

import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { Button, StakingMode } from '@dao-dao/ui'
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
  messageTemplateAndValuesForDecodedCosmosMsg,
} from 'templates/templateList'
import { cleanChainError } from 'util/cleanChainError'

import { treasuryTokenListUpdates } from '../atoms/treasury'
import { CosmosMessageDisplay } from './CosmosMessageDisplay'
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
      onVote={(choice) =>
        executeProposalVote(
          choice,
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
