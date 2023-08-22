import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { fromBase64, toHex } from '@cosmjs/encoding'
import {
  Coin,
  IndexedTx,
  StargateClient,
  decodeCosmosSdkDecFromProto,
} from '@cosmjs/stargate'
import { selector, selectorFamily, waitForAll } from 'recoil'

import { cosmos, juno } from '@dao-dao/protobuf'
import { ModuleAccount } from '@dao-dao/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { Metadata } from '@dao-dao/protobuf/codegen/cosmos/bank/v1beta1/bank'
import {
  ProposalStatus,
  TallyResult,
  Vote,
  WeightedVoteOption,
} from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import {
  Pool,
  Validator as RpcValidator,
} from '@dao-dao/protobuf/codegen/cosmos/staking/v1beta1/staking'
import {
  AllGovParams,
  AmountWithTimestamp,
  ChainId,
  Delegation,
  GenericTokenBalance,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  NativeDelegationInfo,
  ProposalV1,
  ProposalV1Beta1,
  TokenType,
  UnbondingDelegation,
  Validator,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  cosmWasmClientRouter,
  cosmosSdkVersionIs47OrHigher,
  cosmosValidatorToValidator,
  decodeGovProposal,
  getAllRpcResponse,
  getNativeIbcUsdc,
  getNativeTokenForChainId,
  getRpcForChainId,
  isNativeIbcUsdc,
  stargateClientRouter,
} from '@dao-dao/utils'

import {
  refreshBlockHeightAtom,
  refreshGovProposalsAtom,
  refreshNativeTokenStakingInfoAtom,
  refreshWalletBalancesIdAtom,
} from '../atoms/refresh'
import { queryValidatorIndexerSelector } from './indexer'
import { genericTokenSelector } from './token'

export const stargateClientForChainSelector = selectorFamily<
  StargateClient,
  string
>({
  key: 'stargateClientForChain',
  get: (chainId) => async () =>
    await stargateClientRouter.connect(getRpcForChainId(chainId)),
  dangerouslyAllowMutability: true,
})

export const cosmWasmClientForChainSelector = selectorFamily<
  CosmWasmClient,
  string
>({
  key: 'cosmWasmClientForChain',
  get: (chainId) => async () =>
    await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
  dangerouslyAllowMutability: true,
})

export const cosmosRpcClientForChainSelector = selectorFamily({
  key: 'cosmosRpcClientForChain',
  get: (chainId: string) => async () =>
    (
      await cosmos.ClientFactory.createRPCQueryClient({
        rpcEndpoint: getRpcForChainId(chainId),
      })
    ).cosmos,
  dangerouslyAllowMutability: true,
})

export const junoRpcClientSelector = selector({
  key: 'junoRpcClient',
  get: async () =>
    (
      await juno.ClientFactory.createRPCQueryClient({
        rpcEndpoint: getRpcForChainId(ChainId.JunoMainnet),
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

export const cosmosSdkVersionSelector = selectorFamily<string, WithChainId<{}>>(
  {
    key: 'cosmosSdkVersion',
    get:
      ({ chainId }) =>
      async ({ get }) => {
        const client = get(cosmosRpcClientForChainSelector(chainId))
        const { applicationVersion } =
          await client.base.tendermint.v1beta1.getNodeInfo()
        // Remove `v` prefix.
        return applicationVersion?.cosmosSdkVersion.slice(1) || '0.0.0'
      },
  }
)

export const chainAtOrAboveCosmosSdk47Selector = selectorFamily<
  boolean,
  WithChainId<{}>
>({
  key: 'chainAtOrAboveCosmosSdk47',
  get:
    (params) =>
    async ({ get }) => {
      const version = get(cosmosSdkVersionSelector(params))
      return cosmosSdkVersionIs47OrHigher(version)
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
      const nativeToken = getNativeTokenForChainId(chainId)
      if (!balances.some(({ denom }) => denom === nativeToken.denomOrAddress)) {
        balances.push({
          amount: '0',
          denom: nativeToken.denomOrAddress,
        })
      }

      // Add USDC if not present and on mainnet.
      const nativeIbcUsdcDenom = getNativeIbcUsdc(chainId)?.denomOrAddress
      if (
        MAINNET &&
        nativeIbcUsdcDenom &&
        !balances.some(({ denom }) => isNativeIbcUsdc(chainId, denom))
      ) {
        balances.push({
          amount: '0',
          denom: nativeIbcUsdcDenom,
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
        chainId,
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

      return await client.getBalance(
        address,
        getNativeTokenForChainId(chainId).denomOrAddress
      )
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
      return (
        balance ?? {
          amount: '0',
          denom: getNativeTokenForChainId(chainId).denomOrAddress,
        }
      )
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
        ).amount?.amount ?? -1
      )
    },
})

export const blocksPerYearSelector = selectorFamily<number, WithChainId<{}>>({
  key: 'blocksPerYear',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      // If on juno mainnet or testnet, use juno RPC.
      if (chainId === ChainId.JunoMainnet || chainId === ChainId.JunoTestnet) {
        const client = get(junoRpcClientSelector)
        return Number((await client.mint.params()).params?.blocksPerYear ?? -1)
      }

      const client = get(cosmosRpcClientForChainSelector(chainId))
      try {
        return Number(
          (await client.mint.v1beta1.params()).params?.blocksPerYear ?? -1
        )
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes('unknown query path')
        ) {
          return -1
        }

        // Rethrow other errors.
        throw err
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
      if (!validator) {
        throw new Error('Validator not found')
      }

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
      return Number(params?.unbondingTime?.seconds ?? -1)
    },
})

// Queries the chain for governance proposals, defaulting to those that are
// currently open for voting.
export const govProposalsSelector = selectorFamily<
  {
    proposals: GovProposalWithDecodedContent[]
    total: number
  },
  WithChainId<{
    status?: ProposalStatus
    offset?: number
    limit?: number
    // If all, get all pages. If true, offset and limit are ignored.
    all?: boolean
  }>
>({
  key: 'govProposals',
  get:
    ({
      status = ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
      offset,
      limit,
      all,
      chainId,
    }) =>
    async ({ get }) => {
      get(refreshGovProposalsAtom(chainId))

      const client = get(cosmosRpcClientForChainSelector(chainId))
      const supports47 = get(chainAtOrAboveCosmosSdk47Selector({ chainId }))

      let v1Proposals: ProposalV1[] | undefined
      let v1Beta1Proposals: ProposalV1Beta1[] | undefined
      let total = 0
      if (supports47) {
        try {
          if (all) {
            v1Proposals = await getAllRpcResponse(
              client.gov.v1.proposals,
              {
                proposalStatus: status,
                voter: '',
                depositor: '',
                pagination: undefined,
              },
              'proposals',
              true
            )
            total = v1Proposals.length
          } else {
            const response = await client.gov.v1.proposals({
              proposalStatus: status,
              voter: '',
              depositor: '',
              pagination: {
                key: new Uint8Array(),
                offset: BigInt(offset || 0),
                limit: BigInt(limit || 0),
                countTotal: true,
                reverse: true,
              },
            })
            v1Proposals = response.proposals
            total = Number(response.pagination?.total || 0)
          }
        } catch (err) {
          // Fallback to v1beta1 query if v1 not supported.
          if (
            !(err instanceof Error) ||
            !err.message.includes('unknown query path')
          ) {
            // Rethrow other errors.
            throw err
          }
        }
      }

      if (!v1Proposals) {
        if (all) {
          v1Beta1Proposals = await getAllRpcResponse(
            client.gov.v1beta1.proposals,
            {
              proposalStatus: status,
              voter: '',
              depositor: '',
              pagination: undefined,
            },
            'proposals',
            true
          )
          total = v1Beta1Proposals.length
        } else {
          const response = await client.gov.v1beta1.proposals({
            proposalStatus: status,
            voter: '',
            depositor: '',
            pagination: {
              key: new Uint8Array(),
              offset: BigInt(offset || 0),
              limit: BigInt(limit || 0),
              countTotal: true,
              reverse: true,
            },
          })
          v1Beta1Proposals = response.proposals
          total = Number(response.pagination?.total || 0)
        }
      }

      const proposals = [
        ...(v1Beta1Proposals || []).map((proposal) =>
          decodeGovProposal({
            version: GovProposalVersion.V1_BETA_1,
            id: proposal.proposalId,
            proposal,
          })
        ),
        ...(v1Proposals || []).map((proposal) =>
          decodeGovProposal({
            version: GovProposalVersion.V1,
            id: proposal.id,
            proposal,
          })
        ),
      ]

      return {
        proposals,
        total,
      }
    },
})

// Queries the chain for a specific governance proposal.
export const govProposalSelector = selectorFamily<
  GovProposalWithDecodedContent,
  WithChainId<{ proposalId: number }>
>({
  key: 'govProposal',
  get:
    ({ proposalId, chainId }) =>
    async ({ get }) => {
      get(refreshGovProposalsAtom(chainId))

      const client = get(cosmosRpcClientForChainSelector(chainId))
      const supports47 = get(chainAtOrAboveCosmosSdk47Selector({ chainId }))

      if (supports47) {
        try {
          const proposal = (
            await client.gov.v1.proposal({
              proposalId: BigInt(proposalId),
            })
          ).proposal
          if (!proposal) {
            throw new Error('Proposal not found')
          }

          return decodeGovProposal({
            version: GovProposalVersion.V1,
            id: BigInt(proposalId),
            proposal: proposal,
          })
        } catch (err) {
          // Fallback to v1beta1 query if v1 not supported.
          if (
            !(err instanceof Error) ||
            !err.message.includes('unknown query path')
          ) {
            // Rethrow other errors.
            throw err
          }
        }
      }

      const proposal = (
        await client.gov.v1beta1.proposal({
          proposalId: BigInt(proposalId),
        })
      ).proposal
      if (!proposal) {
        throw new Error('Proposal not found')
      }

      return decodeGovProposal({
        version: GovProposalVersion.V1_BETA_1,
        id: BigInt(proposalId),
        proposal: proposal,
      })
    },
})

// Queries the chain for a vote on a governance proposal.
export const govProposalVoteSelector = selectorFamily<
  WeightedVoteOption[],
  WithChainId<{ proposalId: number; voter: string }>
>({
  key: 'govProposalVote',
  get:
    ({ proposalId, voter, chainId }) =>
    async ({ get }) => {
      get(refreshGovProposalsAtom(chainId))

      const client = get(cosmosRpcClientForChainSelector(chainId))

      try {
        return (
          (
            await client.gov.v1beta1.vote({
              proposalId: BigInt(proposalId),
              voter,
            })
          ).vote?.options || []
        )
      } catch (err) {
        // If not found, the voter has not yet voted.
        if (
          err instanceof Error &&
          err.message.includes('not found for proposal')
        ) {
          return []
        }

        throw err
      }
    },
})

// Queries the chain for a vote on a governance proposal.
export const govProposalVotesSelector = selectorFamily<
  {
    votes: (Vote & { staked: bigint })[]
    total: number
  },
  WithChainId<{
    proposalId: number
    offset: number
    limit: number
  }>
>({
  key: 'govProposalVotes',
  get:
    ({ proposalId, offset, limit, chainId }) =>
    async ({ get }) => {
      get(refreshGovProposalsAtom(chainId))

      const client = get(cosmosRpcClientForChainSelector(chainId))

      const { votes, pagination } = await client.gov.v1beta1.votes({
        proposalId: BigInt(proposalId),
        pagination: {
          key: new Uint8Array(),
          offset: BigInt(offset),
          limit: BigInt(limit),
          countTotal: true,
          reverse: true,
        },
      })
      const stakes = get(
        waitForAll(
          votes.map(({ voter }) =>
            nativeDelegatedBalanceSelector({
              chainId,
              address: voter,
            })
          )
        )
      )

      return {
        votes: votes.map((vote, index) => ({
          ...vote,
          staked: BigInt(stakes[index].amount),
        })),
        total: Number(pagination?.total ?? 0),
      }
    },
})

export const govProposalTallySelector = selectorFamily<
  TallyResult | undefined,
  WithChainId<{ proposalId: number }>
>({
  key: 'govProposalTally',
  get:
    ({ proposalId, chainId }) =>
    async ({ get }) => {
      get(refreshGovProposalsAtom(chainId))

      const client = get(cosmosRpcClientForChainSelector(chainId))

      const tally = (
        await client.gov.v1beta1.tallyResult({
          proposalId: BigInt(proposalId),
        })
      )?.tally

      return tally
    },
})

// Queries the chain for the governance module params.
export const govParamsSelector = selectorFamily<AllGovParams, WithChainId<{}>>({
  key: 'govParams',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
      const supports47 = get(chainAtOrAboveCosmosSdk47Selector({ chainId }))

      if (supports47) {
        try {
          const { params } = await client.gov.v1.params({
            // Does not matter.
            paramsType: 'tallying',
          })
          if (!params) {
            throw new Error('Gov params failed to load')
          }

          return {
            ...params,
            quorum: Number(params.quorum),
            threshold: Number(params.threshold),
            vetoThreshold: Number(params.vetoThreshold),
            minInitialDepositRatio: Number(params.minInitialDepositRatio),
          }
        } catch (err) {
          // Fallback to v1beta1 query if v1 not supported.
          if (
            !(err instanceof Error) ||
            !err.message.includes('unknown query path')
          ) {
            // Rethrow other errors.
            throw err
          }
        }
      }

      const [{ votingParams }, { depositParams }, { tallyParams }] =
        await Promise.all([
          client.gov.v1beta1.params({
            paramsType: 'voting',
          }),
          client.gov.v1beta1.params({
            paramsType: 'deposit',
          }),
          client.gov.v1beta1.params({
            paramsType: 'tallying',
          }),
        ])

      if (!votingParams || !depositParams || !tallyParams) {
        throw new Error('Gov params failed to load')
      }

      return {
        minDeposit: depositParams.minDeposit,
        maxDepositPeriod: depositParams.maxDepositPeriod,
        votingPeriod: votingParams.votingPeriod,
        quorum: decodeCosmosSdkDecFromProto(
          tallyParams.quorum
        ).toFloatApproximation(),
        threshold: decodeCosmosSdkDecFromProto(
          tallyParams.threshold
        ).toFloatApproximation(),
        vetoThreshold: decodeCosmosSdkDecFromProto(
          tallyParams.vetoThreshold
        ).toFloatApproximation(),
        // Cannot retrieve this from v1beta1 query, so just assume 0.25 as it is
        // a conservative estimate. Osmosis uses 0.25 and Juno uses 0.2 as of
        // 2023-08-13
        minInitialDepositRatio: 0.25,
      }
    },
})

// Get module address.
export const moduleAddressSelector = selectorFamily<
  string,
  WithChainId<{ name: string }>
>({
  key: 'moduleAddress',
  get:
    ({ name, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
      let account: ModuleAccount | undefined
      try {
        const response = await client.auth.v1beta1.moduleAccountByName({
          name,
        })
        account = response?.account
      } catch (err) {
        // Some chains don't support getting a module account by name
        // directly, so fallback to getting all module accounts.
        if (
          err instanceof Error &&
          err.message.includes('unknown query path')
        ) {
          const { accounts } = await client.auth.v1beta1.moduleAccounts({})
          account = accounts.find(
            (acc) =>
              'name' in acc && (acc as unknown as ModuleAccount).name === name
          ) as ModuleAccount | undefined
        } else {
          // Rethrow other errors.
          throw err
        }
      }

      if (!account) {
        throw new Error(`Failed to find ${name} module address.`)
      }
      return 'baseAccount' in account ? account.baseAccount?.address ?? '' : ''
    },
})

// Get module name for address or undefined if not a module account.
export const moduleNameForAddressSelector = selectorFamily<
  string | undefined,
  WithChainId<{ address: string }>
>({
  key: 'moduleNameForAddress',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
      try {
        const response = await client.auth.v1beta1.account({
          address,
        })

        if (
          response.account &&
          'typeUrl' in response.account &&
          response.account.typeUrl === ModuleAccount.typeUrl
        ) {
          const moduleAccount = ModuleAccount.decode(response.account.value)
          return moduleAccount.name
        }
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes('not found: key not found')
        ) {
          return
        }

        // Rethrow other errors.
        throw err
      }
    },
})

// Get bonded and unbonded tokens. Bonded tokens represent all possible
// governance voting power.
export const chainStakingPoolSelector = selectorFamily<Pool, WithChainId<{}>>({
  key: 'chainStakingPool',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
      const { pool } = await client.staking.v1beta1.pool()
      if (!pool) {
        throw new Error('Staking pool not found')
      }
      return pool
    },
})

export const communityPoolBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{}>
>({
  key: 'communityPoolBalances',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      const { pool } = await client.distribution.v1beta1.communityPool()
      const tokens = get(
        waitForAll(
          pool.map(({ denom }) =>
            genericTokenSelector({
              chainId,
              type: TokenType.Native,
              denomOrAddress: denom,
            })
          )
        )
      )

      const balances = tokens.map(
        (token, i): GenericTokenBalance => ({
          token,
          balance: decodeCosmosSdkDecFromProto(pool[i].amount)
            .toFloatApproximation()
            .toFixed(0),
        })
      )

      return balances
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
            pagination: undefined,
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
  NativeDelegationInfo,
  WithChainId<{ address: string }>
>({
  key: 'nativeDelegationInfo',
  get:
    ({ address: delegatorAddr, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      get(refreshNativeTokenStakingInfoAtom(delegatorAddr))

      const delegations = await getAllRpcResponse(
        client.staking.v1beta1.delegatorDelegations,
        {
          delegatorAddr,
          pagination: undefined,
        },
        'delegationResponses'
      )
      const validators = await getAllRpcResponse(
        client.staking.v1beta1.delegatorValidators,
        {
          delegatorAddr,
          pagination: undefined,
        },
        'validators'
      )
      const rewards = (
        await client.distribution.v1beta1.delegationTotalRewards({
          delegatorAddress: delegatorAddr,
        })
      ).rewards
      const unbondingDelegations = await getAllRpcResponse(
        client.staking.v1beta1.delegatorUnbondingDelegations,
        {
          delegatorAddr,
          pagination: undefined,
        },
        'unbondingResponses'
      )

      return {
        delegations: delegations
          .map(
            ({
              delegation: { validatorAddress: address } = {
                validatorAddress: '',
              },
              balance: delegationBalance,
            }): Delegation | undefined => {
              if (
                !delegationBalance ||
                delegationBalance.denom !==
                  getNativeTokenForChainId(chainId).denomOrAddress
              ) {
                return
              }

              const validator = validators.find(
                ({ operatorAddress }) => operatorAddress === address
              )
              let pendingReward = rewards
                .find(({ validatorAddress }) => validatorAddress === address)
                ?.reward.find(
                  ({ denom }) =>
                    denom === getNativeTokenForChainId(chainId).denomOrAddress
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
                  denom: getNativeTokenForChainId(chainId).denomOrAddress,
                },
                startedAtHeight: Number(creationHeight),
                finishesAt: completionTime || new Date(0),
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
      // x/group (multisig) addresses are not strings but sets of public keys
      // with a threshold, so they don't have a valid single public key.
      if (!account?.pubkey?.value || typeof account.pubkey.value !== 'string') {
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

// TODO(indexer): Use TX events indexer for this instead.
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

export const denomMetadataSelector = selectorFamily<
  Metadata,
  WithChainId<{ denom: string }>
>({
  key: 'denomMetadata',
  get:
    ({ denom, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
      const { metadata } = await client.bank.v1beta1.denomMetadata({
        denom,
      })
      if (!metadata) {
        throw new Error('Denom metadata not found')
      }
      return metadata
    },
})
