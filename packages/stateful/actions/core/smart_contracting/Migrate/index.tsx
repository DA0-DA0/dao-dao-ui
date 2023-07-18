import JSON5 from 'json5'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import { ChainPickerInput, ChainProvider, WhaleEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  makePolytoneExecuteMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { MigrateContractComponent as StatelessMigrateContractComponent } from './Component'

interface MigrateData {
  chainId: string
  contract: string
  codeId: number
  msg: string
}

const useDefaults: UseDefaults<MigrateData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId,
    contract: '',
    codeId: 0,
    msg: '{}',
  }
}

const useTransformToCosmos: UseTransformToCosmos<MigrateData> = () => {
  const currentChainId = useActionOptions().chain.chain_id

  return useCallback(
    ({
      chainId,
      contract: contract_addr,
      codeId: new_code_id,
      msg: msgString,
    }: MigrateData) => {
      let msg
      try {
        msg = JSON5.parse(msgString)
      } catch (err) {
        console.error(`internal error. unparsable message: (${msg})`, err)
        return
      }

      const migrateMsg = makeWasmMessage({
        wasm: {
          migrate: {
            contract_addr,
            new_code_id,
            msg,
          },
        },
      })

      if (chainId === currentChainId) {
        return migrateMsg
      } else {
        return makePolytoneExecuteMessage(currentChainId, chainId, migrateMsg)
      }
    },
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MigrateData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  return objectMatchesStructure(msg, {
    wasm: {
      migrate: {
        contract_addr: {},
        new_code_id: {},
        msg: {},
      },
    },
  })
    ? {
        match: true,
        data: {
          chainId,
          contract: msg.wasm.migrate.contract_addr,
          codeId: msg.wasm.migrate.new_code_id,
          msg: JSON.stringify(msg.wasm.migrate.msg, undefined, 2),
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch } = useFormContext<MigrateData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const [contract, setContract] = useState('')

  const admin = useRecoilValueLoadable(
    contractAdminSelector({
      chainId,
      contractAddress: contract,
    })
  )

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessMigrateContractComponent
          {...props}
          options={{
            contractAdmin:
              admin.state === 'hasValue' ? admin.getValue() : undefined,
            onContractChange: (contract: string) => setContract(contract),
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeMigrateAction: ActionMaker<MigrateData> = ({ t }) => ({
  key: ActionKey.Migrate,
  Icon: WhaleEmoji,
  label: t('title.migrateSmartContract'),
  description: t('info.migrateSmartContractActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
