import { FamilyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
} from '@dao-dao/types/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { AcceptSubDaoComponent, AcceptSubDaoData } from './Component'

const defaultAcceptSubDaoData = {
  address: '',
}

const useDefaults: UseDefaults<AcceptSubDaoData> = () => defaultAcceptSubDaoData

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AcceptSubDaoData> = (
  msg: Record<string, any>
) => {
  try {
    const match = Boolean(msg.wasm.execute.msg.accept_admin_nomination)

    if (match) {
      return {
        match,
        data: {
          address: msg.wasm.execute.contract_addr,
        },
      }
    }

    return { match: false }
  } catch (e) {
    return { match: false }
  }
}

const Component: ActionComponent<undefined, AcceptSubDaoData> = (props) => {
  return <AcceptSubDaoComponent {...props} options={{ AddressInput }} />
}

export const makeAcceptSubDaoAction: ActionMaker<AcceptSubDaoData> = ({
  t,
}) => {
  function useTransformToCosmos() {
    return ({ address }: { address: string }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: address,
            funds: [],
            msg: {
              accept_admin_nomination: {},
            },
          },
        },
      })
  }

  return {
    key: ActionKey.AcceptSubDao,
    Icon: FamilyEmoji,
    label: t('title.acceptSubDao'),
    description: t('info.acceptSubDaoDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    notReusable: true,
  }
}
