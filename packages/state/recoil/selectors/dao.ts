import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import { proposalModuleAdapterProposalCountSelector } from '@dao-dao/proposal-module-adapter'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
  NftCardInfo,
  TokenCardInfo,
  TokenCardStakingInfo,
} from '@dao-dao/tstypes'
import { DaoDropdownInfo, UnstakingTaskStatus } from '@dao-dao/ui'
import {
  CWCORE_CONTRACT_NAME,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
} from '@dao-dao/utils'

import {
  ConfigResponse as CwCoreV0_1_0ConfigResponse,
  DumpStateResponse as CwCoreV0_1_0DumpStateResponse,
} from '../../clients/cw-core/0.1.0'
import {
  ConfigResponse as CwCoreV0_2_0ConfigResponse,
  DumpStateResponse as CwCoreV0_2_0DumpStateResponse,
} from '../../clients/cw-core/0.2.0'
import { NftInfoResponse } from '../../clients/cw721-base'
import {
  nativeBalancesSelector,
  nativeStakingInfoSelector,
  nativeUnstakingDurationSecondsSelector,
} from './chain'
import {
  Cw721BaseSelectors,
  CwCoreV0_1_0Selectors,
  CwCoreV0_2_0Selectors,
} from './clients'
import {
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
} from './contract'
import { daoTvlSelector, usdcPerMacroTokenSelector } from './price'
import { cwCoreProposalModulesSelector } from './proposal'

export const daoDropdownInfoSelector: (
  coreAddress: string
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    (coreAddress) =>
    ({ get }) => {
      const version = get(contractVersionSelector(coreAddress))
      const config =
        version === ContractVersion.V0_2_0
          ? get(
              CwCoreV0_2_0Selectors.configSelector({
                contractAddress: coreAddress,
                params: [],
              })
            )
          : get(
              CwCoreV0_1_0Selectors.configSelector({
                contractAddress: coreAddress,
              })
            )

      const subdaoAddresses: string[] =
        version === ContractVersion.V0_2_0
          ? get(
              CwCoreV0_2_0Selectors.listAllSubDaosSelector({
                contractAddress: coreAddress,
              })
            ).map(({ addr }) => addr)
          : []

      return {
        coreAddress,
        imageUrl: config.image_url || undefined,
        name: config.name,
        subdaos: get(
          waitForAll(
            subdaoAddresses.map((subdaoAddress) =>
              daoDropdownInfoSelector(subdaoAddress)
            )
          )
        ),
      }
    },
})

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo,
  { coreAddress: string; daoUrlPrefix: string }
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, daoUrlPrefix }) =>
    ({ get }) => {
      const {
        config,
        created_timestamp, // Only present for v2.
        admin,
      }: CwCoreV0_1_0DumpStateResponse | CwCoreV0_2_0DumpStateResponse = get(
        // Both v1 and v2 have a dump_state query.
        CwCoreV0_2_0Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          params: [],
        })
      )

      const established =
        typeof created_timestamp === 'number'
          ? new Date(created_timestamp)
          : get(contractInstantiateTimeSelector(coreAddress))

      // Get parent DAO if exists.
      let parentDao: DaoCardInfo['parentDao']
      if (
        admin &&
        // A DAO without a parent DAO may be its own admin.
        admin !== coreAddress &&
        get(
          isContractSelector({
            contractAddress: admin,
            name: CWCORE_CONTRACT_NAME,
          })
        )
      ) {
        const {
          image_url,
        }: CwCoreV0_1_0ConfigResponse | CwCoreV0_2_0ConfigResponse = get(
          // Both v1 and v2 have a config query.
          CwCoreV0_2_0Selectors.configSelector({
            contractAddress: admin,
            params: [],
          })
        )

        parentDao = {
          coreAddress: admin,
          imageUrl: image_url || undefined,
          href: daoUrlPrefix + admin,
        }
      }

      return {
        coreAddress,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || undefined,
        href: daoUrlPrefix + coreAddress,
        established,
        parentDao,
        lazyData: { loading: true },
      }
    },
})

export const daoCardInfoLazyDataSelector = selectorFamily<
  DaoCardInfoLazyData,
  { coreAddress: string; walletAddress?: string }
>({
  key: 'daoCardInfoLazyData',
  get:
    ({ coreAddress, walletAddress }) =>
    ({ get }) => {
      const tvl = get(daoTvlSelector(coreAddress))

      const walletVotingWeight = walletAddress
        ? Number(
            get(
              CwCoreV0_2_0Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const proposalModules = get(cwCoreProposalModulesSelector(coreAddress))
      const proposalModuleCounts = get(
        waitForAll(
          proposalModules.map(({ address }) =>
            proposalModuleAdapterProposalCountSelector(address)
          )
        )
      ).filter(Boolean) as number[]

      return {
        isMember: walletVotingWeight > 0,
        tokenBalance: tvl,
        tokenSymbol: 'USDC',
        proposalCount: proposalModuleCounts.reduce(
          (acc, curr) => acc + curr,
          0
        ),
      }
    },
})

export const subDaoCardInfosSelector = selectorFamily<
  DaoCardInfo[],
  { coreAddress: string; daoUrlPrefix: string }
>({
  key: 'subDaoCardInfos',
  get:
    ({ coreAddress, daoUrlPrefix }) =>
    ({ get }) => {
      const subdaos = get(
        CwCoreV0_2_0Selectors.listAllSubDaosSelector({
          contractAddress: coreAddress,
        })
      )

      return get(
        waitForAll(
          subdaos.map(({ addr }) =>
            daoCardInfoSelector({
              coreAddress: addr,
              daoUrlPrefix,
            })
          )
        )
      )
    },
})

export const treasuryTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  string
>({
  key: 'treasuryTokenCardInfos',
  get:
    (coreAddress) =>
    ({ get }) => {
      const nativeBalances = get(nativeBalancesSelector(coreAddress))
      const cw20s = get(
        CwCoreV0_2_0Selectors.cw20BalancesInfoSelector(coreAddress)
      )

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(
          ({ denom, amount, decimals, label, imageUrl }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            )
            const usdcUnitPrice =
              get(usdcPerMacroTokenSelector({ denom, decimals })) ?? 0

            let stakingInfo: TokenCardStakingInfo | undefined
            // For now, stakingInfo only exists for native token, until ICA.
            if (denom === NATIVE_DENOM) {
              const { delegations, unbondingDelegations } = get(
                nativeStakingInfoSelector(coreAddress)
              )

              stakingInfo = {
                unstakingTasks: unbondingDelegations.map(
                  ({ balance, finishesAt }) => ({
                    status: UnstakingTaskStatus.Unstaking,
                    amount: convertMicroDenomToDenomWithDecimals(
                      balance.amount,
                      decimals
                    ),
                    tokenSymbol: label,
                    tokenDecimals: decimals,
                    date: finishesAt,
                  })
                ),
                unstakingDurationSeconds: get(
                  nativeUnstakingDurationSecondsSelector
                ),
                stakes: delegations.map(
                  ({ validator, delegated, pendingReward }) => ({
                    validator,
                    amount: convertMicroDenomToDenomWithDecimals(
                      delegated.amount,
                      decimals
                    ),
                    rewards: convertMicroDenomToDenomWithDecimals(
                      pendingReward.amount,
                      decimals
                    ),
                  })
                ),
              }
            }

            return {
              // TODO: Make true if native token DAO and using this denom.
              crown: false,
              tokenSymbol: label,
              tokenDecimals: decimals,
              // TODO: Retrieve subtitle.
              // subtitle: '',
              imageUrl: imageUrl || getFallbackImage(denom),
              unstakedBalance,
              usdcUnitPrice,

              stakingInfo,
            }
          }
        ),
        ...cw20s.map(
          ({
            symbol,
            denom,
            amount,
            decimals,
            imageUrl,
            isGovernanceToken,
          }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            )
            const usdcUnitPrice =
              get(usdcPerMacroTokenSelector({ denom, decimals })) ?? 0

            return {
              crown: isGovernanceToken,
              tokenSymbol: symbol,
              tokenDecimals: decimals,
              // TODO: Choose subtitle.
              // subtitle: '',
              // `denom` is an address, so all would fallback to the same image
              // if using `denom` instead of `symbol` here (since fallback image
              // is based on the first character).
              imageUrl: imageUrl || getFallbackImage(symbol),
              unstakedBalance,
              usdcUnitPrice,
              cw20Address: denom,
              // No unstaking info for CW20.
            }
          }
        ),
      ]

      return infos
    },
})

export const nftTokenUriDataSelector = selectorFamily<unknown, string>({
  key: 'nftTokenUriData',
  get: (tokenUri) => async () => {
    const response = await fetch(tokenUri)
    return response
  },
})

export const nftCardInfosSelector = selectorFamily<NftCardInfo[], string>({
  key: 'nftCardInfos',
  get:
    (coreAddress) =>
    ({ get }) => {
      const nftCollectionAddresses = get(
        CwCoreV0_2_0Selectors.allCw721TokenListSelector({
          contractAddress: coreAddress,
        })
      )

      const nftCollectionTokenIds = get(
        waitForAll(
          nftCollectionAddresses.map((collectionAddress) =>
            Cw721BaseSelectors.cw721BaseAllTokensForOwnerSelector({
              contractAddress: collectionAddress,
              owner: coreAddress,
            })
          )
        )
      )

      const nftTokenInfos = get(
        waitForAll(
          nftCollectionAddresses.flatMap((collectionAddress, index) =>
            nftCollectionTokenIds[index].map((tokenId) =>
              Cw721BaseSelectors.nftInfoSelector({
                contractAddress: collectionAddress,
                params: [{ tokenId }],
              })
            )
          )
        )
      ).filter(Boolean) as NftInfoResponse[]

      const nftTokenUriDataResponses = get(
        waitForAll(
          nftTokenInfos
            .filter(({ token_uri }) => !!token_uri)
            .map(({ token_uri }) => nftTokenUriDataSelector(token_uri!))
        )
      )

      const infos: NftCardInfo[] = []

      return infos
    },
})
