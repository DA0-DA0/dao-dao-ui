import { useCallback } from 'react'

import { ChainEmoji } from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  decodePolytoneExecuteMsg,
  maybeMakePolytoneExecuteMessage,
} from '@dao-dao/utils'

import {
  CreateCrossChainAccountComponent as Component,
  CreateCrossChainAccountData,
} from './Component'

export const makeCreateCrossChainAccountAction: ActionMaker<
  CreateCrossChainAccountData
> = ({ t, context, chain, chainContext }) => {
  // Only allow using this action in DAOs.
  if (
    context.type !== ActionContextType.Dao ||
    chainContext.type !== ActionChainContextType.Supported
  ) {
    return null
  }

  const missingChainIds = Object.keys(
    chainContext.config.polytone || {}
  ).filter((chainId) => !(chainId in context.info.polytoneProxies))

  const useDefaults: UseDefaults<CreateCrossChainAccountData> = () => ({
    chainId: missingChainIds[0],
  })

  const useTransformToCosmos: UseTransformToCosmos<
    CreateCrossChainAccountData
  > = () =>
    useCallback(
      ({ chainId }) => maybeMakePolytoneExecuteMessage(chain.chain_id, chainId),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    CreateCrossChainAccountData
  > = (msg: Record<string, any>) => {
    const decodedPolytone = decodePolytoneExecuteMsg(
      chain.chain_id,
      msg,
      'zero'
    )
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

  return {
    key: ActionKey.CreateCrossChainAccount,
    Icon: ChainEmoji,
    label: t('title.createCrossChainAccount'),
    description: t('info.createCrossChainAccountDescription'),
    // Don't show action if no accounts can be created.
    hideFromPicker: missingChainIds.length === 0,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
