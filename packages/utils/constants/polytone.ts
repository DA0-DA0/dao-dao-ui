import { ChainId, PolytoneNotes } from '@dao-dao/types'

const junoMainnet: PolytoneNotes = {
  [ChainId.OsmosisMainnet]: {
    // juno
    note: 'juno1ads7gcpje0y5jxhtn3ntsqs8kg3ahch9u953jk6v0njq4l39m3us5sxw68',
    // juno
    listener: 'juno1f2676a53wxnnp05ezch69hwp5lpxug5qm07lyeywlf57y9ghw46qylrshd',
    // osmosis
    // voice: 'osmo1af93h8xcszszes2a0kjms5zpm5ns3fys4aez2f40fgz428hc8aws28klzs',
    // juno
    localConnection: 'connection-0',
    // osmosis
    remoteConnection: 'connection-1142',
    // juno
    localChannel: 'channel-288',
    // osmosis
    remoteChannel: 'channel-1664',
    // juno
    // localClient: '07-tendermint-0',
    // osmosis
    // remoteClient: '07-tendermint-1457',
    needsSelfRelay: false,
  },
}

const osmosisMainnet: PolytoneNotes = {
  [ChainId.JunoMainnet]: {
    // osmosis
    note: 'osmo1zu9sa2yu9ffdk6pxsgjzgp56wqgyzdh8e0ndn7crr3d0xhvtj8uqdv3dqa',
    // osmosis
    listener: 'osmo1jhwx9nunu4m3ajhvlm5vl2pltrhkltyawanp9c0qhxmxp940dessqh46k6',
    // juno
    // voice: 'juno1mkq8ggvmr7kzu85c9muud30nmdcv98050uxyqrqmmftlmag044gs3e0d0u',
    // osmosis
    localConnection: 'connection-1142',
    // juno
    remoteConnection: 'connection-0',
    // osmosis
    localChannel: 'channel-1656',
    // juno
    remoteChannel: 'channel-287',
    // osmosis
    // localClient: '07-tendermint-1457',
    // juno
    // remoteClient: '07-tendermint-0',
    needsSelfRelay: false,
  },
}

export const PolytoneNotesPerChain: Partial<Record<ChainId, PolytoneNotes>> = {
  [ChainId.JunoMainnet]: junoMainnet,
  [ChainId.OsmosisMainnet]: osmosisMainnet,
}
