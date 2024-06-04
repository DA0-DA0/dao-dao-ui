import { parsePacketsFromTendermintEvents } from '@confio/relayer/build/lib/utils'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { fromBase64, toHex } from '@cosmjs/encoding'
import { Coin, IndexedTx, StargateClient } from '@cosmjs/stargate'
import uniq from 'lodash.uniq'
import {
  noWait,
  selector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
  waitForAny,
} from 'recoil'

import {
  AccountType,
  AllGovParams,
  AmountWithTimestamp,
  ChainId,
  Delegation,
  GenericTokenBalance,
  GenericTokenBalanceWithOwner,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  NativeDelegationInfo,
  ProposalV1,
  ProposalV1Beta1,
  TokenType,
  UnbondingDelegation,
  Validator,
  ValidatorSlash,
  WithChainId,
} from '@dao-dao/types'
import { ModuleAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { Metadata } from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/bank'
import { DecCoin } from '@dao-dao/types/protobuf/codegen/cosmos/base/v1beta1/coin'
import {
  ProposalStatus,
  TallyResult,
  Vote,
  WeightedVoteOption,
} from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import {
  Pool,
  Validator as RpcValidator,
} from '@dao-dao/types/protobuf/codegen/cosmos/staking/v1beta1/staking'
import { Packet } from '@dao-dao/types/protobuf/codegen/ibc/core/channel/v1/channel'
import { Fee as NeutronFee } from '@dao-dao/types/protobuf/codegen/neutron/feerefunder/fee'
import { Params as NobleTariffParams } from '@dao-dao/types/protobuf/codegen/tariff/params'
import {
  MAINNET,
  cosmWasmClientRouter,
  cosmosProtoRpcClientRouter,
  cosmosSdkVersionIs46OrHigher,
  cosmosSdkVersionIs47OrHigher,
  cosmosValidatorToValidator,
  cosmwasmProtoRpcClientRouter,
  decodeGovProposal,
  getAllRpcResponse,
  getNativeTokenForChainId,
  ibcProtoRpcClientRouter,
  junoProtoRpcClientRouter,
  neutronProtoRpcClientRouter,
  nobleProtoRpcClientRouter,
  osmosisProtoRpcClientRouter,
  stargateClientRouter,
} from '@dao-dao/utils'

import { SearchGovProposalsOptions } from '../../indexer'
import {
  refreshBlockHeightAtom,
  refreshGovProposalsAtom,
  refreshIbcDataAtom,
  refreshNativeTokenStakingInfoAtom,
  refreshOpenProposalsAtom,
  refreshWalletBalancesIdAtom,
} from '../atoms/refresh'
import {
  queryGenericIndexerSelector,
  queryValidatorIndexerSelector,
  searchGovProposalsSelector,
} from './indexer'
import { genericTokenSelector } from './token'
import { walletTokenDaoStakedDenomsSelector } from './wallet'

export const stargateClientForChainSelector = selectorFamily<
  StargateClient,
  string
>({
  key: 'stargateClientForChain',
  get: (chainId) => async () => await stargateClientRouter.connect(chainId),
  dangerouslyAllowMutability: true,
})

export const cosmWasmClientForChainSelector = selectorFamily<
  CosmWasmClient,
  string
>({
  key: 'cosmWasmClientForChain',
  get: (chainId) => async () => await cosmWasmClientRouter.connect(chainId),
  dangerouslyAllowMutability: true,
})

export const cosmosRpcClientForChainSelector = selectorFamily({
  key: 'cosmosRpcClientForChain',
  get: (chainId: string) => async () =>
    await cosmosProtoRpcClientRouter.connect(chainId),
  dangerouslyAllowMutability: true,
})

export const ibcRpcClientForChainSelector = selectorFamily({
  key: 'ibcRpcClientForChain',
  get: (chainId: string) => async () =>
    await ibcProtoRpcClientRouter.connect(chainId),
  dangerouslyAllowMutability: true,
})

export const cosmwasmRpcClientForChainSelector = selectorFamily({
  key: 'cosmwasmRpcClientForChain',
  get: (chainId: string) => async () =>
    await cosmwasmProtoRpcClientRouter.connect(chainId),
  dangerouslyAllowMutability: true,
})

export const osmosisRpcClientForChainSelector = selectorFamily({
  key: 'osmosisRpcClientForChain',
  get: (chainId: string) => async () =>
    await osmosisProtoRpcClientRouter.connect(chainId),
  dangerouslyAllowMutability: true,
})

export const nobleRpcClientSelector = selector({
  key: 'nobleRpcClient',
  get: async () =>
    await nobleProtoRpcClientRouter.connect(ChainId.NobleMainnet),
  dangerouslyAllowMutability: true,
})

export const neutronRpcClientSelector = selector({
  key: 'neutronRpcClient',
  get: async () =>
    await neutronProtoRpcClientRouter.connect(
      MAINNET ? ChainId.NeutronMainnet : ChainId.NeutronTestnet
    ),
  dangerouslyAllowMutability: true,
})

export const junoRpcClientSelector = selector({
  key: 'junoRpcClient',
  get: async () =>
    await junoProtoRpcClientRouter.connect(
      MAINNET ? ChainId.JunoMainnet : ChainId.JunoTestnet
    ),
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

/**
 * A chain supports the v1 gov module if it uses Cosmos SDK v0.46 or higher.
 */
export const chainSupportsV1GovModuleSelector = selectorFamily<
  boolean,
  WithChainId<{
    // Whether or not v0.47 or higher is required. V1 gov is supported by
    // v0.46+, but some other things, like unified gov params, are supported
    // only on v0.47+.
    require47?: boolean
  }>
>({
  key: 'chainSupportsV1GovModule',
  get:
    ({ require47, ...params }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(params.chainId))
      const version = get(cosmosSdkVersionSelector(params))

      if (
        !(
          require47
            ? cosmosSdkVersionIs47OrHigher
            : cosmosSdkVersionIs46OrHigher
        )(version)
      ) {
        return false
      }

      // Double-check by testing a v1 gov route.
      try {
        await client.gov.v1.params({
          paramsType: 'voting',
        })
        return true
      } catch {
        return false
      }
    },
})

export const justNativeBalancesSelector = selectorFamily<
  readonly Coin[],
  WithChainId<{ address: string }>
>({
  key: 'justNativeBalances',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))
      get(refreshWalletBalancesIdAtom(address))
      return await client.getAllBalances(address)
    },
})

export const nativeBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{ address: string }>
>({
  key: 'nativeBalances',
  get:
    ({ address, chainId }) =>
    ({ get }) => {
      get(refreshWalletBalancesIdAtom(address))

      const balances = [
        ...get(justNativeBalancesSelector({ address, chainId })),
      ]
      const nativeToken = getNativeTokenForChainId(chainId)
      const stakedDenoms =
        get(
          noWait(
            walletTokenDaoStakedDenomsSelector({
              walletAddress: address,
              chainId,
            })
          )
        ).valueMaybe() || []

      const uniqueDenoms = new Set(balances.map(({ denom }) => denom))

      // Add native denom if not present.
      if (!uniqueDenoms.has(nativeToken.denomOrAddress)) {
        balances.push({
          amount: '0',
          denom: nativeToken.denomOrAddress,
        })
        uniqueDenoms.add(nativeToken.denomOrAddress)
      }

      // Add denoms staked to DAOs if not present.
      stakedDenoms.forEach((denom) => {
        if (!uniqueDenoms.has(denom)) {
          balances.push({ amount: '0', denom })
          uniqueDenoms.add(denom)
        }
      })

      const tokenLoadables = get(
        waitForAny(
          balances.map(({ denom }) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: denom,
              chainId,
            })
          )
        )
      )

      return tokenLoadables
        .map((token, index) => ({
          token: token.state === 'hasValue' ? token.contents : undefined,
          balance: balances[index].amount,
        }))
        .filter(({ token }) => token !== undefined) as GenericTokenBalance[]
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

export const tokenFactoryDenomCreationFeeSelector = selectorFamily<
  Coin[] | undefined,
  string
>({
  key: 'tokenFactoryDenomCreationFee',
  get:
    (chainId) =>
    async ({ get }) => {
      const osmosisClient = get(osmosisRpcClientForChainSelector(chainId))
      try {
        return (await osmosisClient.tokenfactory.v1beta1.params()).params
          ?.denomCreationFee
      } catch (err) {
        // If Osmosis query failed, try CosmWasm tokenfactory.
        if (
          err instanceof Error &&
          err.message.includes('unknown query path')
        ) {
          const cosmwasmClient = get(cosmwasmRpcClientForChainSelector(chainId))
          return (await cosmwasmClient.tokenfactory.v1beta1.params()).params
            ?.denomCreationFee
        }

        throw err
      }
    },
})

export const nobleTariffTransferFeeSelector = selector<
  NobleTariffParams | undefined
>({
  key: 'nobleTariffTransferFee',
  get: async ({ get }) => {
    const nobleClient = get(nobleRpcClientSelector)
    try {
      const { params } = await nobleClient.tariff.params()
      return params
    } catch (err) {
      console.error(err)
    }
  },
})

export const neutronIbcTransferFeeSelector = selector<
  | {
      fee: NeutronFee
      // Total fees summed together.
      sum: GenericTokenBalance[]
    }
  | undefined
>({
  key: 'neutronIbcTransferFee',
  get: async ({ get }) => {
    const neutronClient = get(neutronRpcClientSelector)
    try {
      const { params } = await neutronClient.feerefunder.params()
      const fee = params?.minFee
      if (fee) {
        const fees = [...fee.ackFee, ...fee.recvFee, ...fee.timeoutFee]
        const uniqueDenoms = uniq(fees.map((fee) => fee.denom))
        const tokens = get(
          waitForAll(
            uniqueDenoms.map((denom) =>
              genericTokenSelector({
                type: TokenType.Native,
                chainId: MAINNET
                  ? ChainId.NeutronMainnet
                  : ChainId.NeutronTestnet,
                denomOrAddress: denom,
              })
            )
          )
        )

        return {
          fee,
          sum: uniqueDenoms.map((denom) => ({
            token: tokens.find((token) => token.denomOrAddress === denom)!,
            balance: fees
              .filter(({ denom: feeDenom }) => feeDenom === denom)
              .reduce((acc, { amount }) => acc + BigInt(amount), 0n)
              .toString(),
          })),
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err)
        return
      }

      // Rethrow non errors (like promises) since `get` throws a Promise while
      // the data is still loading.
      throw err
    }
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

// Get the sum of native tokens delegated across all validators
export const nativeDelegatedBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ address: string }>
>({
  key: 'nativeDelegatedBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      // Neutron does not have staking.
      if (
        chainId === ChainId.NeutronMainnet ||
        chainId === ChainId.NeutronTestnet
      ) {
        return {
          amount: '0',
          denom: getNativeTokenForChainId(chainId).denomOrAddress,
        }
      }

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
      // Neutron does not have staking.
      if (
        chainId === ChainId.NeutronMainnet ||
        chainId === ChainId.NeutronTestnet
      ) {
        return 0
      }

      const client = get(cosmosRpcClientForChainSelector(chainId))
      try {
        const { params } = await client.staking.v1beta1.params()
        return Number(params?.unbondingTime?.seconds ?? -1)
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes('unknown query path')
        ) {
          return 0
        }

        // Rethrow other errors.
        throw err
      }
    },
})

/**
 * Search gov proposals in the indexer and decode their content.
 */
export const searchedDecodedGovProposalsSelector = selectorFamily<
  {
    proposals: GovProposalWithDecodedContent[]
    total: number
  },
  SearchGovProposalsOptions
>({
  key: 'searchedDecodedGovProposals',
  get:
    (options) =>
    async ({ get }) => {
      const supportsV1Gov = get(
        chainSupportsV1GovModuleSelector({ chainId: options.chainId })
      )

      const { results, total } = get(searchGovProposalsSelector(options))

      const proposals = (
        await Promise.allSettled(
          results.map(async ({ value: { id, data } }) =>
            decodeGovProposal(
              supportsV1Gov
                ? {
                    version: GovProposalVersion.V1,
                    id: BigInt(id),
                    proposal: ProposalV1.decode(fromBase64(data)),
                  }
                : {
                    version: GovProposalVersion.V1_BETA_1,
                    id: BigInt(id),
                    proposal: ProposalV1Beta1.decode(
                      fromBase64(data),
                      undefined,
                      true
                    ),
                  }
            )
          )
        )
      ).flatMap((p) => (p.status === 'fulfilled' ? p.value : []))

      return {
        proposals,
        total,
      }
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
  }>
>({
  key: 'govProposals',
  get:
    ({ chainId, status, offset, limit }) =>
    async ({ get }) => {
      get(refreshGovProposalsAtom(chainId))
      if (
        status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
        status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
      ) {
        get(refreshOpenProposalsAtom)
      }

      // Try to load from indexer first.
      const indexerProposals = get(
        waitForAllSettled([
          searchedDecodedGovProposalsSelector({
            chainId,
            status,
            offset,
            limit,
          }),
        ])
      )[0].valueMaybe()

      if (indexerProposals?.proposals.length) {
        return indexerProposals
      }

      // Fallback to querying chain if indexer failed.
      const supportsV1Gov = get(chainSupportsV1GovModuleSelector({ chainId }))

      let v1Proposals: ProposalV1[] | undefined
      let v1Beta1Proposals: ProposalV1Beta1[] | undefined
      let total = 0

      const client = get(cosmosRpcClientForChainSelector(chainId))
      if (supportsV1Gov) {
        try {
          if (limit === undefined && offset === undefined) {
            v1Proposals = await getAllRpcResponse(
              client.gov.v1.proposals,
              {
                proposalStatus:
                  status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
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
              proposalStatus:
                status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
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
        if (limit === undefined && offset === undefined) {
          v1Beta1Proposals = await getAllRpcResponse(
            client.gov.v1beta1.proposals,
            {
              proposalStatus:
                status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
              voter: '',
              depositor: '',
              pagination: undefined,
            },
            'proposals',
            true,
            true
          )
          total = v1Beta1Proposals.length
        } else {
          const response = await client.gov.v1beta1.proposals(
            {
              proposalStatus:
                status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
              voter: '',
              depositor: '',
              pagination: {
                key: new Uint8Array(),
                offset: BigInt(offset || 0),
                limit: BigInt(limit || 0),
                countTotal: true,
                reverse: true,
              },
            },
            true
          )
          v1Beta1Proposals = response.proposals
          total = Number(response.pagination?.total || 0)
        }
      }

      const proposals = await Promise.all([
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
      ])

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
      const id = get(refreshGovProposalsAtom(chainId))

      const supportsV1Gov = get(chainSupportsV1GovModuleSelector({ chainId }))

      // Try to load from indexer first.
      let indexerProposal:
        | {
            id: string
            version: string
            data: string
          }
        | undefined
        | null
      try {
        indexerProposal = get(
          queryGenericIndexerSelector({
            chainId,
            formula: 'gov/proposal',
            args: {
              id: proposalId,
            },
            id,
          })
        )
      } catch (err) {
        // Ignore error if not Promise thrown by recoil. Otherwise rethrow.
        if (err instanceof Promise) {
          throw err
        }
      }

      let govProposal: GovProposalWithDecodedContent | undefined

      if (indexerProposal) {
        if (supportsV1Gov) {
          govProposal = await decodeGovProposal({
            version: GovProposalVersion.V1,
            id: BigInt(proposalId),
            proposal: ProposalV1.decode(fromBase64(indexerProposal.data)),
          })
        } else {
          govProposal = await decodeGovProposal({
            version: GovProposalVersion.V1_BETA_1,
            id: BigInt(proposalId),
            proposal: ProposalV1Beta1.decode(
              fromBase64(indexerProposal.data),
              undefined,
              true
            ),
          })
        }
      }

      // Fallback to querying chain if indexer failed.
      if (!govProposal) {
        const client = get(cosmosRpcClientForChainSelector(chainId))

        if (supportsV1Gov) {
          try {
            const proposal = (
              await client.gov.v1.proposal({
                proposalId: BigInt(proposalId),
              })
            ).proposal
            if (!proposal) {
              throw new Error('Proposal not found')
            }

            govProposal = await decodeGovProposal({
              version: GovProposalVersion.V1,
              id: BigInt(proposalId),
              proposal,
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

        if (!govProposal) {
          const proposal = (
            await client.gov.v1beta1.proposal(
              {
                proposalId: BigInt(proposalId),
              },
              true
            )
          ).proposal
          if (!proposal) {
            throw new Error('Proposal not found')
          }

          govProposal = await decodeGovProposal({
            version: GovProposalVersion.V1_BETA_1,
            id: BigInt(proposalId),
            proposal,
          })
        }
      }

      // If gov proposal is in deposit or voting period, refresh when open
      // proposals refresh since it may have just opened (for voting) or closed.
      if (
        govProposal.proposal.status ===
          ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
        govProposal.proposal.status ===
          ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
      ) {
        get(refreshOpenProposalsAtom)
      }

      return govProposal
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
      const supportsUnifiedV1GovParams = get(
        chainSupportsV1GovModuleSelector({ chainId, require47: true })
      )

      if (supportsUnifiedV1GovParams) {
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
        quorum: Number(tallyParams.quorum),
        threshold: Number(tallyParams.threshold),
        vetoThreshold: Number(tallyParams.vetoThreshold),
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
  GenericTokenBalanceWithOwner[],
  WithChainId<{}>
>({
  key: 'communityPoolBalances',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      let pool: DecCoin[]

      const poolMap: Record<string, string> | undefined = get(
        queryGenericIndexerSelector({
          chainId,
          formula: 'communityPool/balances',
        })
      )
      if (poolMap) {
        pool = Object.entries(poolMap).map(
          ([denom, amount]): DecCoin => ({
            denom,
            amount,
          })
        )

        // Fallback to querying chain if indexer failed.
      } else {
        const client = get(cosmosRpcClientForChainSelector(chainId))
        pool = (await client.distribution.v1beta1.communityPool()).pool
      }

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

      // In case any chain has a community pool but no gov module, handle
      // gracefully by falling back to chain ID. I doubt this will ever happen,
      // but why not be safe... Cosmos is crazy.
      const owner =
        get(
          waitForAllSettled([
            moduleAddressSelector({
              name: 'gov',
              chainId,
            }),
          ])
        )[0].valueMaybe() || chainId

      const balances = tokens.map(
        (token, i): GenericTokenBalanceWithOwner => ({
          owner: {
            type: AccountType.Native,
            chainId,
            address: owner,
          },
          token,
          // Truncate.
          balance: pool[i].amount.split('.')[0],
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

              // Truncate.
              pendingReward.amount = pendingReward.amount.split('.')[0]

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
  key: 'transaction',
  get:
    ({ txHash, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const tx = await client.getTx(txHash)
      return tx ?? undefined
    },
})

export const transactionPacketsSelector = selectorFamily<
  Packet[] | undefined,
  WithChainId<{ txHash: string }>
>({
  key: 'transactionPackets',
  get:
    (params) =>
    async ({ get }) => {
      const tx = get(transactionSelector(params))
      return tx && parsePacketsFromTendermintEvents(tx.events)
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
          noFallback: true,
        })
      )) ?? [],
})

export const denomMetadataSelector = selectorFamily<
  Metadata | undefined,
  WithChainId<{ denom: string }>
>({
  key: 'denomMetadata',
  get:
    ({ denom, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      try {
        const { metadata } = await client.bank.v1beta1.denomMetadata({
          denom,
        })
        return metadata
      } catch (err) {
        // If denom not found, return undefined.
        if (err instanceof Error && err.message.includes('key not found')) {
          return
        }

        // Rethrow other errors.
        throw err
      }
    },
})

export const ibcUnreceivedPacketsSelector = selectorFamily<
  // Returns whether or not all of the IBC packet sequences have been received.
  boolean,
  WithChainId<{
    portId: string
    channelId: string
    packetCommitmentSequences: number[]
  }>
>({
  key: 'ibcUnreceivedPackets',
  get:
    ({ chainId, portId, channelId, packetCommitmentSequences }) =>
    async ({ get }) => {
      get(refreshIbcDataAtom(chainId))
      const ibcClient = get(ibcRpcClientForChainSelector(chainId))
      const { sequences } = await ibcClient.core.channel.v1.unreceivedPackets({
        portId,
        channelId,
        packetCommitmentSequences: packetCommitmentSequences.map((v) =>
          BigInt(v)
        ),
      })
      return sequences.some((s) =>
        packetCommitmentSequences.includes(Number(s))
      )
    },
})

export const ibcUnreceivedAcksSelector = selectorFamily<
  // Returns whether or not all of the IBC packet acks have been received.
  boolean,
  WithChainId<{
    portId: string
    channelId: string
    packetAckSequences: number[]
  }>
>({
  key: 'ibcUnreceivedAcks',
  get:
    ({ chainId, portId, channelId, packetAckSequences }) =>
    async ({ get }) => {
      get(refreshIbcDataAtom(chainId))
      const ibcClient = get(ibcRpcClientForChainSelector(chainId))
      const { sequences } = await ibcClient.core.channel.v1.unreceivedAcks({
        portId,
        channelId,
        packetAckSequences: packetAckSequences.map((v) => BigInt(v)),
      })
      return sequences.some((s) => packetAckSequences.includes(Number(s)))
    },
})

export const ibcAckReceivedSelector = selectorFamily<
  // Returns whether or not the IBC packet acknowledgement was received.
  boolean,
  WithChainId<{
    portId: string
    channelId: string
    sequence: number
  }>
>({
  key: 'ibcAckReceived',
  get:
    ({ chainId, portId, channelId, sequence }) =>
    async ({ get }) => {
      get(refreshIbcDataAtom(chainId))
      const ibcClient = get(ibcRpcClientForChainSelector(chainId))
      try {
        await ibcClient.core.channel.v1.packetAcknowledgement({
          portId,
          channelId,
          sequence: BigInt(sequence),
        })
        return true
      } catch (err) {
        return false
      }
    },
})
