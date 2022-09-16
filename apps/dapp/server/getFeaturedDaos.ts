// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { DaoCardInfo } from '@dao-dao/tstypes'
import { CI, FEATURED_DAOS_URL } from '@dao-dao/utils'

export const getFeaturedDaos = async (): Promise<DaoCardInfo[]> => {
  const featuredDaos: {
    name: string
    description: string
    image: string
    href: string
    TVL: number
  }[] = []
  if (!CI) {
    const resp = await fetch(FEATURED_DAOS_URL)
    // These are returned as a timeseries in the form [{time, value}, ...].
    const featuredDaosOverTime = await resp.json()
    featuredDaos.push(
      ...featuredDaosOverTime[featuredDaosOverTime.length - 1].value
    )
  }

  return featuredDaos.map(({ name, description, image, href, TVL }, index) => ({
    // TODO: Retrieve.
    coreAddress: index.toString(),
    name,
    description,
    imageUrl: image,
    href,
    // TODO: Retrieve.
    // parentDao: {},
    lazyData: {
      loading: false,
      data: {
        tokenBalance: TVL,
        tokenSymbol: 'USDC',
        // Does not matter, check will not show up on featured DAO card.
        isMember: false,
        // TODO: Retrieve.
        proposalCount: 0,
      },
    },
  }))
}
