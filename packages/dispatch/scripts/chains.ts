interface ChainConfig {
  /**
   * Chain fee denom.
   */
  feeDenom: string
  /**
   * Polytone Listener code ID.
   */
  listenerCodeId?: number
  /**
   * Polytone Note code ID.
   */
  noteCodeId?: number
  /**
   * Polytone Proxy code ID.
   */
  proxyCodeId?: number
  /**
   * Polytone Voice code ID.
   */
  voiceCodeId?: number
  /**
   * Address length used for contracts.
   */
  addrLen?: number
}

/**
 * Map chain name to deployment config.
 */
export const chains: Record<string, ChainConfig> = {
  juno: {
    feeDenom: 'ujuno',
    listenerCodeId: 3319,
    noteCodeId: 3320,
    proxyCodeId: 3321,
    voiceCodeId: 3322,
  },
  osmosis: {
    feeDenom: 'uosmo',
    listenerCodeId: 125,
    noteCodeId: 126,
    proxyCodeId: 127,
    voiceCodeId: 128,
  },
  stargaze: {
    feeDenom: 'ustars',
    listenerCodeId: 94,
    noteCodeId: 95,
    proxyCodeId: 96,
    voiceCodeId: 97,
  },
  migaloo: {
    feeDenom: 'uwhale',
    listenerCodeId: 255,
    noteCodeId: 256,
    proxyCodeId: 257,
    voiceCodeId: 258,
  },
  neutron: {
    feeDenom: 'untrn',
    listenerCodeId: 229,
    noteCodeId: 230,
    proxyCodeId: 231,
    voiceCodeId: 2373,
  },
  oraichain: {
    feeDenom: 'orai',
    listenerCodeId: 1567,
    noteCodeId: 1568,
    proxyCodeId: 1569,
    voiceCodeId: 1570,
  },
  chihuahua: {
    feeDenom: 'uhuahua',
    listenerCodeId: 539,
    noteCodeId: 540,
    proxyCodeId: 541,
    voiceCodeId: 542,
  },
  terra2: {
    feeDenom: 'uluna',
    listenerCodeId: 2370,
    noteCodeId: 2371,
    proxyCodeId: 2372,
    voiceCodeId: 2373,
  },
  terra: {
    feeDenom: 'uluna',
    listenerCodeId: 8751,
    noteCodeId: 8752,
  },
  omniflixhub: {
    feeDenom: 'uflix',
    listenerCodeId: 1,
    noteCodeId: 2,
    proxyCodeId: 3,
    voiceCodeId: 4,
  },
  kujira: {
    feeDenom: 'ukuji',
    listenerCodeId: 276,
    noteCodeId: 277,
    proxyCodeId: 279,
    voiceCodeId: 278,
  },
  archway: {
    feeDenom: 'aarch',
    listenerCodeId: 392,
    noteCodeId: 394,
    proxyCodeId: 395,
    voiceCodeId: 396,
  },
  injective: {
    feeDenom: 'inj',
    listenerCodeId: 969,
    noteCodeId: 970,
    proxyCodeId: 971,
    voiceCodeId: 972,
    addrLen: 20,
  },
  bitsong: {
    feeDenom: 'ubtsg',
    listenerCodeId: 24,
    noteCodeId: 25,
    proxyCodeId: 26,
    voiceCodeId: 27,
  },
}
