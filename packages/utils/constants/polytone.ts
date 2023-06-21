import { ChainInfoID } from '@noahsaso/cosmodal'

import { PolytoneNotes } from '@dao-dao/types'

const junoTestnet: PolytoneNotes = {
  // [ChainInfoID.Juno1]: '',
}

const junoMainnet: PolytoneNotes = {
  [ChainInfoID.Uni6]: {
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

export const PolytoneNotesPerChain: Record<string, PolytoneNotes | undefined> =
  {
    [ChainInfoID.Uni6]: junoTestnet,
    [ChainInfoID.Juno1]: junoMainnet,
    [ChainInfoID.Osmosis1]: osmosisMainnet,
  }
