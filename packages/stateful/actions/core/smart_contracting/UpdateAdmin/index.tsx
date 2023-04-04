import { useCallback, useState } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import { MushroomEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { isValidContractAddress, objectMatchesStructure } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { UpdateAdminComponent as StatelessUpdateAdminComponent } from './Component'

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
  objectMatchesStructure(msg, {
    wasm: {
      update_admin: {
        contract_addr: {},
        admin: {},
      },
    },
  })
    ? {
        match: true,
        data: {
          contract: msg.wasm.update_admin.contract_addr,
          newAdmin: msg.wasm.update_admin.admin,
        },
      }
    : {
        match: false,
      }

const Component: ActionComponent = (props) => {
  const { chainId, bech32Prefix } = useActionOptions()
  const [contract, setContract] = useState('')

  const admin = useRecoilValueLoadable(
    contract && isValidContractAddress(contract, bech32Prefix)
      ? contractAdminSelector({
          contractAddress: contract,
          chainId,
        })
      : constSelector(undefined)
  )

  return (
    <StatelessUpdateAdminComponent
      {...props}
      options={{
        contractAdmin: admin.state === 'hasValue' ? admin.contents : undefined,
        onContractChange: (contract: string) => setContract(contract),
      }}
    />
  )
}

export const makeUpdateAdminAction: ActionMaker<UpdateAdminData> = ({ t }) => ({
  key: ActionKey.UpdateAdmin,
  Icon: MushroomEmoji,
  label: t('title.updateContractAdmin'),
  description: t('info.updateContractAdminActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
