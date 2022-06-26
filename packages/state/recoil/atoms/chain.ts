import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { atom } from 'recoil'

export const signingCosmWasmClientAtom = atom<
  SigningCosmWasmClient | undefined
>({
  key: 'signingCosmWasmClient',
  dangerouslyAllowMutability: true,
})
