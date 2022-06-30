import { useCallback, useMemo } from 'react'

import { useVotingModule } from '@dao-dao/state'
import { makeWasmMessage } from '@dao-dao/utils'

import { UseDecodedCosmosMsg, UseDefaults, UseTransformToCosmos } from '..'

interface AddMembersData {
  members: {
    addr: string
    weight: number
  }[]
}

const useDefaults: UseDefaults<AddMembersData> = () => ({
  members: [],
})

const useTransformToCosmos: UseTransformToCosmos<AddMembersData> = (
  coreAddress: string
) => {
  const { cw4VotingGroupAddress } = useVotingModule(coreAddress, {
    fetchCw4Address: true,
  })

  return useCallback(
    ({ members }: AddMembersData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: cw4VotingGroupAddress,
            funds: [],
            msg: {
              update_members: {
                remove: [],
                add: members,
              },
            },
          },
        },
      }),
    [cw4VotingGroupAddress]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AddMembersData> = (
  msg: Record<string, any>
) => useMemo(() => null, [msg])
