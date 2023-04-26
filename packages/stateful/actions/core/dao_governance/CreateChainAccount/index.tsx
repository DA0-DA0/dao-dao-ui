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
import { POLYTONE_NOTES, makePolytoneExecuteMessage } from '@dao-dao/utils'

import { useDecodePolytoneExecuteMsg } from '../../../hooks/useDecodePolytoneExecuteMsg'
import {
  CreateChainAccountComponent as Component,
  CreateChainAccountData,
} from './Component'

const useTransformToCosmos: UseTransformToCosmos<CreateChainAccountData> = () =>
  useCallback(({ chainId }) => makePolytoneExecuteMessage(chainId), [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateChainAccountData> = (
  msg: Record<string, any>
) => {
  const decodedPolytone = useDecodePolytoneExecuteMsg(msg, true)
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

export const makeCreateChainAccountAction: ActionMaker<
  CreateChainAccountData
> = ({ t, context }) => {
  // Only allow using this action in DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<CreateChainAccountData> = () => {
    const missingChainIds = Object.keys(POLYTONE_NOTES).filter(
      (chainId) => !(chainId in context.info.polytoneProxies)
    )

    return {
      chainId: missingChainIds[0],
    }
  }

  return {
    key: ActionKey.CreateChainAccount,
    Icon: ChainEmoji,
    label: t('title.createChainAccount'),
    description: t('info.createChainAccountDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
