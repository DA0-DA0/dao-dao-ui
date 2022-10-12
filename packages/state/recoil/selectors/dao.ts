import {
  RecoilValueReadOnly,
  constSelector,
  selector,
  selectorFamily,
  waitForAll,
} from 'recoil'

import { proposalModuleAdapterProposalCountSelector } from '@dao-dao/proposal-module-adapter'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
  NftCardInfo,
  TokenCardInfo,
  TokenCardStakingInfo,
} from '@dao-dao/tstypes'
import {
  ConfigResponse as CwCoreV1ConfigResponse,
  DumpStateResponse as CwCoreV1DumpStateResponse,
} from '@dao-dao/tstypes/contracts/CwCore.v1'
import {
  ConfigResponse as CwdCoreV2ConfigResponse,
  DumpStateResponse as CwdCoreV2DumpStateResponse,
} from '@dao-dao/tstypes/contracts/CwdCore.v2'
import { DaoDropdownInfo, UnstakingTaskStatus } from '@dao-dao/ui'
import {
  CWCOREV1_CONTRACT_NAME,
  CWCOREV2_CONTRACT_NAME,
  NATIVE_DENOM,
  STARGAZE_URL_BASE,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  getNftName,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'
import {
  CwNativeStakedBalanceVotingAdapter,
  matchAdapter,
} from '@dao-dao/voting-module-adapter'

import { ContractInfoResponse, NftInfoResponse } from '../../clients/cw721-base'
import { getFeaturedDaoAddresses } from '../../utils/getFeaturedDaoAddresses'
import {
  nativeBalancesSelector,
  nativeStakingInfoSelector,
  nativeUnstakingDurationSecondsSelector,
} from './chain'
import {
  Cw721BaseSelectors,
  CwCoreV1Selectors,
  CwNativeStakedBalanceVotingSelectors,
  CwdCoreV2Selectors,
} from './clients'
import { infoSelector, votingModuleSelector } from './clients/CwdCore.v2'
import {
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
} from './contract'
import { daoTvlSelector, usdcPerMacroTokenSelector } from './price'
import { cwCoreProposalModulesSelector } from './proposal'

export const featuredDaoCardInfosSelector = selector({
  key: 'featuredDaoCardInfos',
  get: async ({ get }) => {
    const featuredAddresses = await getFeaturedDaoAddresses()
    return get(
      waitForAll(
        featuredAddresses.map((coreAddress) =>
          daoCardInfoSelector({ coreAddress, daoUrlPrefix: '/dao/' })
        )
      )
    ).filter(Boolean) as DaoCardInfo[]
  },
})

export const daoDropdownInfoSelector: (
  coreAddress: string
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    (coreAddress) =>
    ({ get }) => {
      const version = get(contractVersionSelector(coreAddress))
      const config =
        version === ContractVersion.V0_1_0
          ? get(
              CwCoreV1Selectors.configSelector({
                contractAddress: coreAddress,
              })
            )
          : get(
              CwdCoreV2Selectors.configSelector({
                contractAddress: coreAddress,
                params: [],
              })
            )

      const subdaoAddresses: string[] =
        version === ContractVersion.V0_1_0
          ? []
          : get(
              CwdCoreV2Selectors.listAllSubDaosSelector({
                contractAddress: coreAddress,
              })
            ).map(({ addr }) => addr)

      return {
        coreAddress,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
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
  DaoCardInfo | undefined,
  { coreAddress: string; daoUrlPrefix: string }
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, daoUrlPrefix }) =>
    ({ get }) => {
      const dumpedState:
        | CwCoreV1DumpStateResponse
        | CwdCoreV2DumpStateResponse
        | undefined = get(
        // Both v1 and v2 have a dump_state query.
        CwdCoreV2Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          params: [],
        })
      )
      // If undefined, probably invalid contract address.
      if (!dumpedState) {
        return
      }

      const {
        config,
        created_timestamp, // Only present for v2.
        admin,
      } = dumpedState

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
        (get(
          isContractSelector({
            contractAddress: admin,
            name: CWCOREV1_CONTRACT_NAME,
          })
        ) ||
          get(
            isContractSelector({
              contractAddress: admin,
              name: CWCOREV2_CONTRACT_NAME,
            })
          ))
      ) {
        const {
          name,
          image_url,
        }: CwCoreV1ConfigResponse | CwdCoreV2ConfigResponse = get(
          // Both v1 and v2 have a config query.
          CwdCoreV2Selectors.configSelector({
            contractAddress: admin,
            params: [],
          })
        )

        parentDao = {
          coreAddress: admin,
          name,
          imageUrl: image_url || getFallbackImage(admin),
        }
      }

      return {
        coreAddress,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
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
              CwdCoreV2Selectors.votingPowerAtHeightSelector({
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
        CwdCoreV2Selectors.listAllSubDaosSelector({
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
      ).filter(Boolean) as DaoCardInfo[]
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
        CwdCoreV2Selectors.cw20BalancesInfoSelector(coreAddress)
      )

      //! Check if has native governance token, and set crown accordingly.
      const votingModuleAddress = get(
        votingModuleSelector({ contractAddress: coreAddress, params: [] })
      )
      // All `info` queries are the same, so just use core's info query.
      const votingModuleInfo = get(
        infoSelector({ contractAddress: votingModuleAddress, params: [] })
      )
      let nativeGovernanceTokenDenom: string | undefined
      try {
        if (
          matchAdapter(votingModuleInfo.info.contract)?.id ===
          CwNativeStakedBalanceVotingAdapter.id
        ) {
          nativeGovernanceTokenDenom = get(
            CwNativeStakedBalanceVotingSelectors.getConfigSelector({
              contractAddress: votingModuleAddress,
              params: [],
            })
          ).denom
        }
      } catch (err) {
        console.error(err)
      }

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
              const nativeStakingInfo = get(
                nativeStakingInfoSelector(coreAddress)
              )

              stakingInfo = nativeStakingInfo && {
                unstakingTasks: nativeStakingInfo.unbondingDelegations.map(
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
                stakes: nativeStakingInfo.delegations.map(
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
              // True if native token DAO and using this denom.
              crown: nativeGovernanceTokenDenom === denom,
              tokenSymbol: label,
              tokenDenom: denom,
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
              tokenDenom: denom,
              tokenDecimals: decimals,
              // TODO: Choose subtitle.
              // subtitle: '',
              imageUrl: imageUrl || getFallbackImage(denom),
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

export const nftTokenUriDataSelector = selectorFamily({
  key: 'nftTokenUriData',
  get: (tokenUri: string) => async () => {
    try {
      // Transform IPFS url if necessary.
      const response = await fetch(transformIpfsUrlToHttpsIfNecessary(tokenUri))
      return await response.text()
    } catch (err) {
      console.error(err)
    }
  },
})

interface NativeStargazeCollectionInfo {
  native: {
    address: string
    info: ContractInfoResponse
  }
  stargaze?: {
    address: string
    info: ContractInfoResponse
  }
}

export const nativeAndStargazeCollectionInfoSelector = selectorFamily<
  NativeStargazeCollectionInfo,
  string
>({
  key: 'nativeAndStargazeCollectionInfo',
  get:
    (nativeCollectionAddress: string) =>
    ({ get }) => {
      const nativeCollectionInfo = get(
        Cw721BaseSelectors.contractInfoSelector({
          contractAddress: nativeCollectionAddress,
          params: [],
        })
      )
      // TODO: Identify IBC'd Stargaze NFT collections better.
      const stargazeCollectionAddress = nativeCollectionInfo.name.startsWith(
        'wasm.'
      )
        ? nativeCollectionInfo.name.split('/').pop()
        : undefined
      const stargazeCollectionInfo = stargazeCollectionAddress
        ? get(
            Cw721BaseSelectors.contractInfoSelector({
              contractAddress: stargazeCollectionAddress,
              stargaze: true,
              params: [],
            })
          )
        : undefined

      return {
        native: {
          address: nativeCollectionAddress,
          info: nativeCollectionInfo,
        },
        stargaze:
          stargazeCollectionAddress && stargazeCollectionInfo
            ? {
                address: stargazeCollectionAddress,
                info: stargazeCollectionInfo,
              }
            : undefined,
      }
    },
})

export const nftCardInfosSelector = selectorFamily<NftCardInfo[], string>({
  key: 'nftCardInfos',
  get:
    (coreAddress) =>
    async ({ get }) => {
      const nftCollectionAddresses = get(
        CwdCoreV2Selectors.allCw721TokenListSelector({
          contractAddress: coreAddress,
        })
      )

      const nftCollectionInfos = get(
        waitForAll(
          nftCollectionAddresses.map((collectionAddress) =>
            nativeAndStargazeCollectionInfoSelector(collectionAddress)
          )
        )
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

      const collectionsWithTokens = nftCollectionInfos
        .map((collectionInfo, index) => {
          // Don't filter undefined infos out until inside this map so we can
          // use the index to zip with token IDs.
          if (!collectionInfo) {
            return
          }

          const tokenIds = nftCollectionTokenIds[index]

          const infos = get(
            waitForAll(
              tokenIds.map((tokenId) =>
                Cw721BaseSelectors.nftInfoSelector({
                  contractAddress: collectionInfo.native.address,
                  params: [{ tokenId }],
                })
              )
            )
          )

          const uriDataResponses = get(
            waitForAll(
              infos.map(({ token_uri } = { token_uri: undefined }) =>
                token_uri
                  ? nftTokenUriDataSelector(token_uri)
                  : constSelector(undefined)
              )
            )
          )

          return {
            collectionInfo,
            tokens: tokenIds
              .map((tokenId, index) => ({
                tokenId,
                info: infos[index],
                uriDataResponse: uriDataResponses[index],
              }))
              .filter(
                ({ info, uriDataResponse }) => !!info && !!uriDataResponse
              ) as {
              tokenId: string
              info: NftInfoResponse
              uriDataResponse: string
            }[],
          }
        })
        .filter(Boolean) as {
        collectionInfo: NativeStargazeCollectionInfo
        tokens: {
          tokenId: string
          info: NftInfoResponse
          uriDataResponse: string
        }[]
      }[]

      const infos: NftCardInfo[] = collectionsWithTokens
        .flatMap(
          ({
            collectionInfo: { native: nativeInfo, stargaze: stargazeInfo },
            tokens,
          }) =>
            tokens.map(
              ({
                tokenId,
                info: nftInfo,
                uriDataResponse,
              }): NftCardInfo | undefined => {
                const info: NftCardInfo = {
                  collection: {
                    address: stargazeInfo?.address ?? nativeInfo.address,
                    name: stargazeInfo?.info.name ?? nativeInfo.info.name,
                  },
                  tokenId,
                  externalLink: stargazeInfo?.address.startsWith('stars')
                    ? {
                        href: `${STARGAZE_URL_BASE}/media/${stargazeInfo.address}/${tokenId}`,
                        name: 'Stargaze',
                      }
                    : undefined,
                  imageUrl: nftInfo.token_uri ?? '',
                  // floorPrice?: {
                  //   amount: number
                  //   denom: string
                  // }
                  name: '',
                }

                // Only try to parse if there's a good chance this is JSON, the
                // heuristic being the first non-whitespace character is a "{".
                if (uriDataResponse.trimStart().startsWith('{')) {
                  try {
                    const json = JSON.parse(uriDataResponse)

                    if (typeof json.name === 'string' && !!json.name.trim()) {
                      info.name = getNftName(info.collection.name, json.name)
                    }

                    if (typeof json.image === 'string' && !!json.image) {
                      info.imageUrl = transformIpfsUrlToHttpsIfNecessary(
                        json.image
                      )
                    }

                    if (
                      typeof json.external_url === 'string' &&
                      !!json.external_url.trim()
                    ) {
                      const externalUrl = transformIpfsUrlToHttpsIfNecessary(
                        json.external_url
                      )
                      const externalUrlDomain = new URL(externalUrl).hostname
                      info.externalLink = {
                        href: externalUrl,
                        name:
                          HostnameMap[externalUrlDomain] ?? externalUrlDomain,
                      }
                    }
                  } catch (err) {
                    console.error(err)
                  }
                }

                return info
              }
            )
        )
        .filter(Boolean) as NftCardInfo[]

      return infos
    },
})

const HostnameMap: Record<string, string | undefined> = {
  'stargaze.zone': 'Stargaze',
}
