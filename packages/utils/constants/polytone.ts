import { ChainInfoID } from '@noahsaso/cosmodal'

import { PolytoneNotes } from '@dao-dao/types'

const junoTestnet: PolytoneNotes = {
  // [ChainInfoID.Juno1]: '',
}

const junoMainnet: PolytoneNotes = {
  [ChainInfoID.Uni6]: {
    // juno-1
    note: 'juno1w7qxyutgqe7usqn5lp3srm2erqh57hrh4fdwyepl76vz9tmqs2gsspfhxu',
    // juno-1
    localConnection: 'connection-349',
    // uni-6
    remoteConnection: 'connection-206',
    // juno-1
    localChannel: 'channel-245',
    // uni-6
    remoteChannel: 'channel-201',
  },
}

export const PolytoneNotesPerChain: Record<string, PolytoneNotes | undefined> =
  {
    [ChainInfoID.Uni6]: junoTestnet,
    [ChainInfoID.Juno1]: junoMainnet,
  }
