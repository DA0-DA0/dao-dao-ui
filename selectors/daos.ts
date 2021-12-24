import { atomFamily, selectorFamily, atom, selector } from 'recoil'

import { cosmWasmClient } from 'atoms/cosm'

export const daoInfo = selectorFamily({
  key: 'DaoInfo',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = (await client.queryContractSmart(address, {
        get_config: {},
      })) as any
      return response.config
    },
})
