import { useCallback } from 'react'

import { ChainEmoji } from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  POLYTONE_NOTES,
  decodePolytoneExecuteMsg,
  makePolytoneExecuteMessage,
} from '@dao-dao/utils'

import {
  CreateCrossChainAccountComponent as Component,
  CreateCrossChainAccountData,
} from './Component'

const useTransformToCosmos: UseTransformToCosmos<
  CreateCrossChainAccountData
> = () => useCallback(({ chainId }) => makePolytoneExecuteMessage(chainId), [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateCrossChainAccountData> = (
  msg: Record<string, any>
) => {
  const decodedPolytone = decodePolytoneExecuteMsg(msg, 'zero')
  return decodedPolytone.match
    ? {
        match: true,
        data: {
          chainId: decodedPolytone.chainId,
        },
      }
    : {
        match: false,
      }
}

export const makeCreateCrossChainAccountAction: ActionMaker<
  CreateCrossChainAccountData
> = ({ t, context }) => {
  // Only allow using this action in DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<CreateCrossChainAccountData> = () => {
    const missingChainIds = Object.keys(POLYTONE_NOTES).filter(
      (chainId) => !(chainId in context.info.polytoneProxies)
    )

    return {
      chainId: missingChainIds[0],
    }
  }

  return {
    key: ActionKey.CreateCrossChainAccount,
    Icon: ChainEmoji,
    label: t('title.createCrossChainAccount'),
    description: t('info.createCrossChainAccountDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
