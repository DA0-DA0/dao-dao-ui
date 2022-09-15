import { useCallback, useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'

import {
  UpdateAdminComponent as StatelessUpdateAdminComponent,
  UpdateAdminIcon,
} from '../components/UpdateAdmin'

interface UpdateAdminData {
  contract: string
  newAdmin: string
}

const useDefaults: UseDefaults<UpdateAdminData> = () => ({
  contract: '',
  newAdmin: '',
})

const useTransformToCosmos: UseTransformToCosmos<UpdateAdminData> = () =>
  useCallback(
    ({ contract, newAdmin }: UpdateAdminData) => ({
      wasm: {
        update_admin: {
          contract_addr: contract,
          admin: newAdmin,
        },
      },
    }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateAdminData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg && 'update_admin' in msg.wasm
        ? {
            match: true,
            data: {
              contract: msg.wasm.update_admin.contract_addr,
              newAdmin: msg.wasm.update_admin.admin,
            },
          }
        : { match: false },
    [msg]
  )

const Component: ActionComponent = (props) => {
  const [contract, setContract] = useState('')

  const admin = useRecoilValueLoadable(contractAdminSelector(contract))

  return (
    <StatelessUpdateAdminComponent
      {...props}
      options={{
        contractAdmin:
          admin.state === 'hasValue' ? admin.getValue() : undefined,
        onContractChange: (contract: string) => setContract(contract),
      }}
    />
  )
}

export const updateAdminAction: Action<UpdateAdminData> = {
  key: ActionKey.UpdateAdmin,
  Icon: UpdateAdminIcon,
  label: 'Update Contract Admin',
  description: 'Update the CosmWasm level admin of a smart contract.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
