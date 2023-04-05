import { ChainInfoID } from '@noahsaso/cosmodal'

import { ChainPrefixIdMap } from '@dao-dao/types'

// Map DAO core address bech32 prefix (for example, 'juno' in juno10h0hc64jv...)
// to the chain ID it is on.

const testnet: ChainPrefixIdMap = {
  stars: ChainInfoID.Stargaze1,
}

const mainnet: ChainPrefixIdMap = {
  stars: ChainInfoID.Stargaze1,
}

export const ChainPrefixIdMaps = {
  testnet,
  // mainnet,
}
