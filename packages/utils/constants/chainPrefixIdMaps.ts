import { ChainInfoID } from '@noahsaso/cosmodal'

import { ChainPrefixIdMap } from '@dao-dao/types'

// Map DAO core address bech32 prefix (for example, 'juno' in juno10h0hc64jv...)
// to the chain ID it is on.

const testnet: ChainPrefixIdMap = {
  juno: ChainInfoID.Uni6,
}

const mainnet: ChainPrefixIdMap = {
  juno: ChainInfoID.Juno1,
}

export const ChainPrefixIdMaps = {
  testnet,
  mainnet,
}
