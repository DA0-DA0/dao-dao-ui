import { ChainId, PolytoneNotes } from '@dao-dao/types'

const NONE: PolytoneNotes = {}

const junoMainnet: PolytoneNotes = {
  [ChainId.JunoTestnet]: {
    // juno-1
    note: 'juno13tamtu4qwe6d5lr5268rydalhlmcj79vaqr2ant4x6ejw3gpmncsyf8u62',
    // juno-1
    listener: 'juno1fn8ug6pktctcsjumcq3n7eqshnzrsj73z83tj4vw03jzj09h9s0qng7dan',
    // juno-1
    localConnection: 'connection-375',
    // uni-6
    remoteConnection: 'connection-586',
    // juno-1
    localChannel: 'channel-279',
    // uni-6
    remoteChannel: 'channel-466',
    // juno-1
    // localClient: '07-tendermint-381',
    // uni-6
    // remoteClient: '07-tendermint-446',
  },
}

// TODO (polytone): osmosis
const osmosisMainnet: PolytoneNotes = {}

export const PolytoneNotesPerChain: Partial<Record<ChainId, PolytoneNotes>> = {
  [ChainId.JunoMainnet]: junoMainnet,
  [ChainId.JunoTestnet]: NONE,
  [ChainId.OsmosisMainnet]: osmosisMainnet,
  [ChainId.OsmosisTestnet]: NONE,
}
