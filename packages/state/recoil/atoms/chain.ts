import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { atom, atomFamily } from 'recoil'

import { ChainId } from '@dao-dao/types'
import { MAINNET } from '@dao-dao/utils'

export const signingCosmWasmClientAtom = atomFamily<
  SigningCosmWasmClient | undefined,
  { chainId: string }
>({
  key: 'signingCosmWasmClient',
  dangerouslyAllowMutability: true,
})

export const walletChainIdAtom = atom<string>({
  key: 'walletChainId',
  default: MAINNET ? ChainId.JunoMainnet : ChainId.JunoTestnet,
})
