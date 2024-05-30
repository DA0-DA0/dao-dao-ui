import { FamilyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
} from '@dao-dao/types/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { BecomeSubDaoComponent, BecomeSubDaoData } from './Component'

const defaultBecomeSubDaoData = {
  admin: '',
}

const useDefaults: UseDefaults<BecomeSubDaoData> = () => defaultBecomeSubDaoData

const useDecodedCosmosMsg: UseDecodedCosmosMsg<BecomeSubDaoData> = (
  msg: Record<string, any>
) => {
  try {
    return {
      match: true,
      data: {
        admin: msg.wasm.execute.nominate_admin.admin,
      },
    }
  } catch (e) {
    return { match: false }
  }
}

const Component: ActionComponent<undefined, BecomeSubDaoData> = (props) => {
  return <BecomeSubDaoComponent {...props} options={{ AddressInput }} />
}

export const makeBecomeSubDaoAction: ActionMaker<BecomeSubDaoData> = ({
  t,
  address,
  context,
}) => {
  function useTransformToCosmos() {
    return ({ admin }: { admin: string }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: address,
            funds: [],
            msg: {
              nominate_admin: {
                admin,
              },
            },
          },
        },
      })
  }

  return {
    key: ActionKey.BecomeSubDao,
    Icon: FamilyEmoji,
    label: t('title.becomeSubDao'),
    description: t('info.becomeSubDaoDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    notReusable: true,
    // If parent DAO exists, hide this action.
    hideFromPicker:
      context.type === ActionContextType.Dao && context.info.parentDao !== null,
  }
}
