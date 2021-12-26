import { cosmWasmClient } from 'selectors/cosm'
import { selectorFamily } from 'recoil'

export const contractsByCodeId = selectorFamily({
  key: 'contractsByCodeId',
  get:
    (codeId: number) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) {
        return []
      }
      let contracts = await client.getContracts(codeId)
      return contracts
    },
})
