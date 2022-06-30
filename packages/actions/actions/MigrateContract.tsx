import { useCallback, useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import { VotingModuleType } from '@dao-dao/utils'

import { MigrateContractComponent as StatelessMigrateContractComponent } from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface MigrateData {
  contract: string
  codeId: number
  msg: string
}

const useDefaults: UseDefaults<MigrateData> = () => ({
  contract: '',
  codeId: 0,
  msg: '{}',
})

const useTransformToCosmos: UseTransformToCosmos<MigrateData> = () =>
  useCallback(
    ({ contract: contract_addr, codeId: new_code_id, msg }: MigrateData) => ({
      wasm: {
        migrate: {
          contract_addr,
          new_code_id,
          msg: btoa(msg),
        },
      },
    }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MigrateData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg && 'migrate' in msg.wasm
        ? {
            match: true,
            data: {
              contract: msg.wasm.migrate.contract_addr,
              codeId: msg.wasm.migrate.new_code_id,
              msg: atob(msg.wasm.migrate.msg),
            },
          }
        : { match: false },
    [msg]
  )

const Component: ActionComponent = (props) => {
  const [contract, setContract] = useState('')

  const admin = useRecoilValueLoadable(contractAdminSelector(contract))

  return (
    <StatelessMigrateContractComponent
      {...props}
      options={{
        contractAdmin:
          admin.state === 'hasValue' ? admin.getValue() : undefined,
        onContractChange: (contract) => setContract(contract),
      }}
    />
  )
}

export const migrateAction: Action<MigrateData> = {
  key: ActionKey.Migrate,
  label: '🐋 Migrate Smart Contract',
  description: 'Migrate a CosmWasm contract to a new code ID.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
