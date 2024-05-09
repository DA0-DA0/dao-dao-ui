// Gets the fallback image for a DAO card (or honestly anything) given
// an identifier for that card. This assumes that there are five

import { ChainId } from '@dao-dao/types'

import { getImageUrlForChainId } from './chain'
import { NEUTRON_GOVERNANCE_DAO } from './constants'
import { toBech32Hash } from './conversion'

// fallback images in the public/placeholders directory.
export const getFallbackImage = (identifier = '') => {
  // If this is the Neutron governance address, return chain image.
  if (identifier === NEUTRON_GOVERNANCE_DAO) {
    return getImageUrlForChainId(ChainId.NeutronMainnet)
  }

  // If identitifer is an address, get its bech32 data, so it's consistent
  // across chains.
  identifier = toBech32Hash(identifier) || identifier

  const hashed = identifier.split('').reduce((p, n) => n.charCodeAt(0) + p, 0)
  const index = (hashed % 5) + 1
  return `/placeholders/${index}.svg`
}
