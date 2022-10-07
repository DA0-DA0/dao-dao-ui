import { CHAIN_BECH32_PREFIX, CI, FEATURED_DAOS_URL } from '@dao-dao/utils'

export const getFeaturedDaoAddresses = async (): Promise<string[]> => {
  const featuredDaos: {
    href: string
  }[] = []
  if (!CI) {
    const resp = await fetch(FEATURED_DAOS_URL)
    // These are returned as a timeseries in the form [{time, value}, ...].
    const featuredDaosOverTime = await resp.json()
    featuredDaos.push(
      ...featuredDaosOverTime[featuredDaosOverTime.length - 1].value
    )
  }

  return featuredDaos
    .map(
      ({ href }) =>
        // Filter out legacy multisigs.
        (!href.includes('multisig') &&
          // Extract coreAddress from href.
          href.match(
            new RegExp(`\\b${CHAIN_BECH32_PREFIX}[a-zA-Z0-9]+\\b`)
          )?.[0]) ||
        ''
    )
    .filter(Boolean)
}
