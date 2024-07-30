import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  CheckEmoji,
  DaoSupportedChainPickerInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessage,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useActionOptions } from '../../../react'
import { AcceptSubDaoComponent, AcceptSubDaoData } from './Component'

const useDefaults: UseDefaults<AcceptSubDaoData> = () => ({
  chainId: useActionOptions().chain.chain_id,
  address: '',
})

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AcceptSubDaoData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  try {
    const match = Boolean(msg.wasm.execute.msg.accept_admin_nomination)

    if (match) {
      return {
        match,
        data: {
          chainId,
          address: msg.wasm.execute.contract_addr,
        },
      }
    }

    return { match: false }
  } catch (e) {
    return { match: false }
  }
}

const useTransformToCosmos: UseTransformToCosmos<AcceptSubDaoData> = () => {
  const options = useActionOptions()

  return ({ chainId, address }) =>
    maybeMakePolytoneExecuteMessage(
      options.chain.chain_id,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender: getChainAddressForActionOptions(options, chainId) || '',
        contractAddress: address,
        msg: {
          accept_admin_nomination: {},
        },
      })
    )
}

const Component: ActionComponent<undefined, AcceptSubDaoData> = (props) => {
  const { t } = useTranslation()
  const { watch } = useFormContext<AcceptSubDaoData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      {props.isCreating && (
        <p className="max-w-prose">{t('info.acceptSubDaoActionDescription')}</p>
      )}

      <DaoSupportedChainPickerInput
        disabled={!props.isCreating}
        fieldName={props.fieldNamePrefix + 'chainId'}
        onlyDaoChainIds
      />

      <ChainProvider chainId={chainId}>
        <AcceptSubDaoComponent
          {...props}
          options={{
            AddressInput,
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeAcceptSubDaoAction: ActionMaker<AcceptSubDaoData> = ({
  t,
}) => {
  return {
    key: ActionKey.AcceptSubDao,
    Icon: CheckEmoji,
    label: t('title.acceptSubDao'),
    description: t('info.acceptSubDaoDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
