import { ChainInfoID } from '@noahsaso/cosmodal'

import { PolytoneNotes } from '@dao-dao/types'

const junoTestnet: PolytoneNotes = {
  [ChainInfoID.Juno1]: '',
}

const junoMainnet: PolytoneNotes = {
  [ChainInfoID.Uni6]:
    'juno1w7qxyutgqe7usqn5lp3srm2erqh57hrh4fdwyepl76vz9tmqs2gsspfhxu',
}

export const PolytoneNotesPerChain: Record<string, PolytoneNotes | undefined> =
  {
    [ChainInfoID.Uni6]: junoTestnet,
    [ChainInfoID.Juno1]: junoMainnet,
  }
