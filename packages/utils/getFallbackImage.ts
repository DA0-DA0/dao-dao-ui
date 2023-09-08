// Gets the fallback image for a DAO card (or honestly anything) given
// an identifier for that card. This assumes that there are five

import { ChainId } from '@dao-dao/types'

import { getImageUrlForChainId } from './chain'
import { NEUTRON_GOVERNANCE_DAO } from './constants'

// fallback images in the public/placeholders directory.
export const getFallbackImage = (identifier = '') => {
  // If this is the Neutron governance address, return placeholder image.
  if (identifier === NEUTRON_GOVERNANCE_DAO) {
    return getImageUrlForChainId(ChainId.NeutronMainnet)
  }

  const hashed = identifier.split('').reduce((p, n) => n.charCodeAt(0) + p, 0)
  const index = (hashed % 5) + 1
  return `/placeholders/${index}.svg`
}
