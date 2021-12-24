import { atomFamily, selectorFamily, atom, selector } from 'recoil'

import { cosmWasmClient } from 'atoms/cosm'

export const contractsByCodeId = selectorFamily({
  key: 'ContractsByCodeId',
  get:
    (codeId: number) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      let contracts = await client.getContracts(codeId)
      return contracts
    },
})
