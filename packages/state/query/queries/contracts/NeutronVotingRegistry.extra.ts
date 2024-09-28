import { QueryClient, queryOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { VotingVaultWithInfo } from '@dao-dao/types'

import { neutronVaultQueries } from './NeutronVault'
import { neutronVaultExtraQueries } from './NeutronVault.extra'
import { neutronVotingRegistryQueries } from './NeutronVotingRegistry'

/**
 * Fetch voting vaults with info.
 */
export const fetchNeutronVaultsWithInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<VotingVaultWithInfo[]> => {
  const vaults = await queryClient.fetchQuery(
    neutronVotingRegistryQueries.votingVaults({
      chainId,
      contractAddress: address,
      args: {},
    })
  )

  const vaultsWithInfo = (
    await Promise.allSettled(
      vaults.map(
        async (vault): Promise<VotingVaultWithInfo> => ({
          ...vault,
          info: await queryClient.fetchQuery(
            neutronVaultExtraQueries.info(queryClient, {
              chainId,
              address: vault.address,
            })
          ),
          totalPower: HugeDecimal.from(
            (
              await queryClient.fetchQuery(
                neutronVaultQueries.totalPowerAtHeight({
                  chainId,
                  contractAddress: vault.address,
                  args: {},
                })
              )
            ).power
          ),
        })
      )
    )
  )
    .flatMap((i) => (i.status === 'fulfilled' ? i.value : []))
    .sort((a, b) => a.name.localeCompare(b.name))

  return vaultsWithInfo
}

export const neutronVotingRegistryExtraQueries = {
  /**
   * Fetch voting vaults with info.
   */
  vaultsWithInfo: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchNeutronVaultsWithInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['neutronVotingRegistryExtra', 'vaultsWithInfo', options],
      queryFn: () => fetchNeutronVaultsWithInfo(queryClient, options),
    }),
}
