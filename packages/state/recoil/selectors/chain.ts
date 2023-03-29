import { Contract, CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { fromBase64, toHex } from '@cosmjs/encoding'
import {
  Coin,
  IndexedTx,
  StargateClient,
  decodeCosmosSdkDecFromProto,
} from '@cosmjs/stargate'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { ProposalStatus } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { cosmos, juno } from 'interchain-rpc'
import { DelegationDelegatorReward } from 'interchain-rpc/types/codegen/cosmos/distribution/v1beta1/distribution'
import {
  Proposal as GovProposal,
  WeightedVoteOption,
} from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'
import {
  DelegationResponse,
  UnbondingDelegation as RpcUnbondingDelegation,
  Validator as RpcValidator,
} from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'
import Long from 'long'
import { selector, selectorFamily, waitForAll } from 'recoil'

import {
  AmountWithTimestamp,
  Delegation,
  GenericTokenBalance,
  GovProposalWithDecodedContent,
  NativeDelegationInfo,
  TokenType,
  UnbondingDelegation,
  Validator,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  CHAIN_ID,
  JUNO_USDC_DENOM,
  MAINNET,
  NATIVE_TOKEN,
  cosmWasmClientRouter,
  cosmosValidatorToValidator,
  decodeGovProposalContent,
  getAllRpcResponse,
  getRpcForChainId,
  isJunoIbcUsdc,
  stargateClientRouter,
} from '@dao-dao/utils'

import {
  refreshBlockHeightAtom,
  refreshNativeTokenStakingInfoAtom,
  refreshWalletBalancesIdAtom,
} from '../atoms/refresh'
import { queryValidatorIndexerSelector } from './indexer'
import { genericTokenSelector } from './token'

export const stargateClientForChainSelector = selectorFamily<
  StargateClient,
  string | undefined
>({
  key: 'stargateClientForChain',
  get: (chainId) => async () =>
    await stargateClientRouter.connect(
      chainId ? getRpcForChainId(chainId) : getRpcForChainId(CHAIN_ID)
    ),
  dangerouslyAllowMutability: true,
})

export const cosmWasmClientForChainSelector = selectorFamily<
  CosmWasmClient,
  string | undefined
>({
  key: 'cosmWasmClientForChain',
  get: (chainId) => async () =>
    await cosmWasmClientRouter.connect(
      chainId ? getRpcForChainId(chainId) : getRpcForChainId(CHAIN_ID)
    ),
  dangerouslyAllowMutability: true,
})

export const cosmosRpcClientForChainSelector = selectorFamily({
  key: 'cosmosRpcClientForChain',
  get: (chainId?: string) => async () =>
    (
      await cosmos.ClientFactory.createRPCQueryClient({
        rpcEndpoint: chainId
          ? getRpcForChainId(chainId)
          : getRpcForChainId(CHAIN_ID),
      })
    ).cosmos,
  dangerouslyAllowMutability: true,
})

export const junoRpcClientSelector = selector({
  key: 'junoRpcClient',
  get: async () =>
    (
      await juno.ClientFactory.createRPCQueryClient({
        rpcEndpoint: getRpcForChainId(ChainInfoID.Juno1),
      })
    ).juno,
  dangerouslyAllowMutability: true,
})

export const blockHeightSelector = selectorFamily<number, WithChainId<{}>>({
  key: 'blockHeight',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      get(refreshBlockHeightAtom)
      return await client.getHeight()
    },
})

export const blockHeightTimestampSelector = selectorFamily<
  Date,
  WithChainId<{ blockHeight: number }>
>({
  key: 'blockHeightTimestamp',
  get:
    ({ blockHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      const block = await client.getBlock(blockHeight)
      return new Date(Date.parse(block.header.time))
    },
})

export const blockHeightTimestampSafeSelector = selectorFamily<
  Date | undefined,
  WithChainId<{ blockHeight: number }>
>({
  key: 'blockHeightTimestamp',
  get:
    ({ blockHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      try {
        const block = await client.getBlock(blockHeight)
        return new Date(Date.parse(block.header.time))
      } catch (error) {
        console.error(error)
      }
    },
})

export const nativeBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{ address: string }>
>({
  key: 'nativeBalances',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

      get(refreshWalletBalancesIdAtom(address))

      const balances = [...(await client.getAllBalances(address))]
      // Add native denom if not present.
      if (
        !balances.some(({ denom }) => denom === NATIVE_TOKEN.denomOrAddress)
      ) {
        balances.push({
          amount: '0',
          denom: NATIVE_TOKEN.denomOrAddress,
        })
      }
      // Add USDC if not present and on mainnet.
      if (MAINNET && !balances.some(({ denom }) => isJunoIbcUsdc(denom))) {
        balances.push({
          amount: '0',
          denom: JUNO_USDC_DENOM,
        })
      }

      const tokens = get(
        waitForAll(
          balances.map(({ denom }) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: denom,
              chainId,
            })
          )
        )
      )

      return tokens.map((token, index) => ({
        token,
        balance: balances[index].amount,
      }))
    },
})

// Refreshes when wallet balances refresh.
export const nativeBalancesFetchedAtSelector = selectorFamily<
  Date,
  WithChainId<{ address: string }>
>({
  key: 'nativeBalancesFetchedAt',
  get:
    ({ address }) =>
    ({ get }) => {
      get(refreshWalletBalancesIdAtom(address))
      return new Date()
    },
})

export const nativeBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ address: string }>
>({
  key: 'nativeBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

      get(refreshWalletBalancesIdAtom(address))

      return await client.getBalance(address, NATIVE_TOKEN.denomOrAddress)
    },
})

export const nativeDenomBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ walletAddress: string; denom: string }>
>({
  key: 'nativeDenomBalance',
  get:
    ({ walletAddress, denom, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

      get(refreshWalletBalancesIdAtom(walletAddress))

      return await client.getBalance(walletAddress, denom)
    },
})

export const nativeDenomBalanceWithTimestampSelector = selectorFamily<
  AmountWithTimestamp,
  WithChainId<{ walletAddress: string; denom: string }>
>({
  key: 'nativeDenomBalanceWithTimestamp',
  get:
    ({ walletAddress, denom, chainId }) =>
    ({ get }) => {
      const amount = Number(
        get(nativeDenomBalanceSelector({ walletAddress, denom, chainId }))
          .amount
      )

      return {
        amount,
        timestamp: new Date(),
      }
    },
})

// Get the SUM of native tokens delegated across all validators
export const nativeDelegatedBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ address: string }>
>({
  key: 'nativeDelegatedBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

      get(refreshWalletBalancesIdAtom(address))

      const balance = await client.getBalanceStaked(address)

      // Only allow native denom
      if (!balance || balance.denom !== NATIVE_TOKEN.denomOrAddress) {
        return {
          amount: '0',
          denom: NATIVE_TOKEN.denomOrAddress,
        }
      }

      return balance
    },
})

export const nativeSupplySelector = selectorFamily<
  number,
  WithChainId<{ denom: string }>
>({
  key: 'nativeSupply',
  get:
    ({ denom, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      return Number(
        (
          await client.bank.v1beta1.supplyOf({
            denom,
          })
        ).amount.amount
      )
    },
})

export const blocksPerYearSelector = selectorFamily<number, WithChainId<{}>>({
  key: 'blocksPerYear',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      // If on juno mainnet or testnet, use juno RPC.
      if (CHAIN_BECH32_PREFIX === 'juno') {
        const client = get(junoRpcClientSelector)
        return (await client.mint.params()).params.blocksPerYear.toNumber()
      }

      const client = get(cosmosRpcClientForChainSelector(chainId))
      try {
        return (
          await client.mint.v1beta1.params()
        ).params.blocksPerYear.toNumber()
      } catch (err) {
        console.error(err)
        return 0
      }
    },
})

// Queries the chain for the commission of a given validator address.
export const validatorSelector = selectorFamily<
  Validator,
  WithChainId<{ address: string }>
>({
  key: 'validator',
  get:
    ({ address: validatorAddr, chainId }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(''))
      get(refreshWalletBalancesIdAtom(validatorAddr))

      const client = get(cosmosRpcClientForChainSelector(chainId))

      const { validator } = await client.staking.v1beta1.validator({
        validatorAddr,
      })

      return cosmosValidatorToValidator(validator)
    },
})

export const nativeUnstakingDurationSecondsSelector = selectorFamily<
  number,
  WithChainId<{}>
>({
  key: 'nativeUnstakingDurationSeconds',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
      const { params } = await client.staking.v1beta1.params()
      return params.unbondingTime.seconds.toNumber()
    },
})

// Queries the chain for governance proposals, defaulting to those that are
// currently open for voting.
export const govProposalsSelector = selectorFamily<
  GovProposalWithDecodedContent[],
  WithChainId<{ status?: ProposalStatus }>
>({
  key: 'govProposals',
  get:
    ({ status = ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      let proposals: GovProposal[]
      try {
        proposals = await getAllRpcResponse(
          client.gov.v1beta1.proposals,
          {
            proposalStatus: status,
            voter: '',
            depositor: '',
          },
          'proposals'
        )
      } catch (err) {
        console.error(err)
        proposals = []
      }

      return proposals
        .map((proposal) => decodeGovProposalContent(proposal))
        .sort((a, b) => a.votingEndTime.getTime() - b.votingEndTime.getTime())
    },
})

// Queries the chain for a specific governance proposal.
export const govProposalSelector = selectorFamily<
  GovProposalWithDecodedContent | undefined,
  WithChainId<{ proposalId: number }>
>({
  key: 'govProposal',
  get:
    ({ proposalId, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      const proposal = (
        await client.gov.v1beta1.proposal({
          proposalId: Long.fromInt(proposalId),
        })
      )?.proposal

      return proposal && decodeGovProposalContent(proposal)
    },
})

// Queries the chain for a vote on a governance proposal.
export const govProposalVoteSelector = selectorFamily<
  WeightedVoteOption[] | undefined,
  WithChainId<{ proposalId: number; voter: string }>
>({
  key: 'govProposalVote',
  get:
    ({ proposalId, voter, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      return (
        await client.gov.v1beta1.vote({
          proposalId: Long.fromInt(proposalId),
          voter,
        })
      )?.vote.options
    },
})

export const validatorsSelector = selectorFamily<Validator[], WithChainId<{}>>({
  key: 'validators',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(''))

      const client = get(cosmosRpcClientForChainSelector(chainId))

      let validators: RpcValidator[]
      try {
        validators = await getAllRpcResponse(
          client.staking.v1beta1.validators,
          {
            status: '',
          },
          'validators'
        )
      } catch (err) {
        console.error(err)
        return []
      }

      return validators
        .map((validator) => cosmosValidatorToValidator(validator))
        .sort((a, b) => b.tokens - a.tokens)
    },
})

export const nativeDelegationInfoSelector = selectorFamily<
  NativeDelegationInfo | undefined,
  WithChainId<{ address: string }>
>({
  key: 'nativeDelegationInfo',
  get:
    ({ address: delegatorAddr, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      get(refreshNativeTokenStakingInfoAtom(delegatorAddr))

      let delegations: DelegationResponse[]
      let validators: RpcValidator[]
      let rewards: DelegationDelegatorReward[]
      let unbondingDelegations: RpcUnbondingDelegation[]
      try {
        delegations = await getAllRpcResponse(
          client.staking.v1beta1.delegatorDelegations,
          {
            delegatorAddr,
          },
          'delegationResponses'
        )
        validators = await getAllRpcResponse(
          client.staking.v1beta1.delegatorValidators,
          {
            delegatorAddr,
          },
          'validators'
        )
        rewards = (
          await client.distribution.v1beta1.delegationTotalRewards({
            delegatorAddress: delegatorAddr,
          })
        ).rewards
        unbondingDelegations = await getAllRpcResponse(
          client.staking.v1beta1.delegatorUnbondingDelegations,
          {
            delegatorAddr,
          },
          'unbondingResponses'
        )
      } catch (error) {
        console.error(error)
        return undefined
      }

      return {
        delegations: delegations
          .map(
            ({
              delegation: { validatorAddress: address },
              balance: delegationBalance,
            }): Delegation | undefined => {
              // Only allow NATIVE_TOKEN.denomOrAddress.
              if (delegationBalance.denom !== NATIVE_TOKEN.denomOrAddress) {
                return
              }

              const validator = validators.find(
                ({ operatorAddress }) => operatorAddress === address
              )
              let pendingReward = rewards
                .find(({ validatorAddress }) => validatorAddress === address)
                ?.reward.find(
                  ({ denom }) => denom === NATIVE_TOKEN.denomOrAddress
                )

              if (!validator || !pendingReward) {
                return
              }

              // pendingReward is represented as a Decimal Coin (DecCoin), which
              // includes 18 decimals and no decimal point, so it needs to be
              // converted manually. See issues:
              // https://github.com/osmosis-labs/telescope/issues/247
              // https://github.com/cosmos/cosmos-sdk/issues/10863
              pendingReward.amount = decodeCosmosSdkDecFromProto(
                pendingReward.amount
              )
                .floor()
                .toString()

              return {
                validator: cosmosValidatorToValidator(validator),
                delegated: delegationBalance,
                pendingReward,
              }
            }
          )
          .filter(Boolean) as Delegation[],

        // Only returns native token unbondings, no need to check.
        unbondingDelegations: unbondingDelegations.flatMap(
          ({ validatorAddress, entries }) => {
            const validator = get(
              validatorSelector({
                address: validatorAddress,
                chainId,
              })
            )

            return entries.map(
              ({
                creationHeight,
                completionTime,
                balance,
              }): UnbondingDelegation => ({
                validator,
                balance: {
                  amount: balance,
                  denom: NATIVE_TOKEN.denomOrAddress,
                },
                startedAtHeight: creationHeight.toNumber(),
                finishesAt: completionTime,
              })
            )
          }
        ),
      }
    },
})

export const transactionSelector = selectorFamily<
  IndexedTx | undefined,
  WithChainId<{ txHash: string }>
>({
  key: 'transactionEvents',
  get:
    ({ txHash, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const tx = await client.getTx(txHash)
      return tx ?? undefined
    },
})

export const walletHexPublicKeySelector = selectorFamily<
  string | undefined,
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletHexPublicKey',
  get:
    ({ walletAddress, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      const account = await client.getAccount(walletAddress)
      if (!account?.pubkey?.value) {
        return
      }
      return toHex(fromBase64(account.pubkey.value))
    },
})

export type ValidatorSlash = {
  registeredBlockHeight: string
  registeredBlockTimeUnixMs: string
  infractionBlockHeight: string
  // Slash fraction applied to validator's undelegating and redelegating tokens.
  slashFactor: string
  amountSlashed: string
  // Slash fraction applied to validator's current delegations. It may be less
  // than `slashFactor`.
  effectiveFraction: string
  // Amount of tokens slashed from delegations. This should be `amountSlashed`
  // minus the amount slashed from the validator's undelegating and redelegating
  // tokens.
  stakedTokensBurned: string
}

export const validatorSlashesSelector = selectorFamily<
  ValidatorSlash[],
  WithChainId<{ validatorOperatorAddress: string }>
>({
  key: 'validatorSlashes',
  get:
    ({ validatorOperatorAddress, chainId }) =>
    async ({ get }) =>
      (await get(
        queryValidatorIndexerSelector({
          validatorOperatorAddress,
          chainId,
          formula: 'staking/slashes',
        })
      )) ?? [],
})

export const contractSelector = selectorFamily<
  Contract,
  WithChainId<{ contractAddress: string }>
>({
  key: 'contract',
  get:
    ({ contractAddress, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return await client.getContract(contractAddress)
    },
})
