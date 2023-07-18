import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { atom, atomFamily } from 'recoil'

import { DEFAULT_CHAIN_ID } from '@dao-dao/utils'

export const signingCosmWasmClientAtom = atomFamily<
  SigningCosmWasmClient | undefined,
  { chainId: string }
>({
  key: 'signingCosmWasmClient',
  dangerouslyAllowMutability: true,
})

export const walletChainIdAtom = atom<string>({
  key: 'walletChainId',
  default: DEFAULT_CHAIN_ID,
})
