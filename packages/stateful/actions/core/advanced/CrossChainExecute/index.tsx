import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  TelescopeEmoji,
  useChain,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  maybeMakePolytoneExecuteMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  WalletActionsProvider,
  useActionOptions,
  useActionsForMatching,
  useLoadedActionsAndCategories,
} from '../../../react'
import {
  CrossChainExecuteData,
  CrossChainExecuteComponent as StatelessCrossChainExecuteComponent,
} from './Component'

const InnerComponentLoading: ActionComponent = (props) => (
  <StatelessCrossChainExecuteComponent
    {...props}
    options={{
      categories: [],
      loadedActions: {},
      actionsForMatching: [],
      SuspenseLoader,
    }}
  />
)

const InnerComponent: ActionComponent = (props) => {
  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })
  const actionsForMatching = useActionsForMatching()

  return (
    <StatelessCrossChainExecuteComponent
      {...props}
      options={{
        categories,
        loadedActions,
        actionsForMatching,
        SuspenseLoader,
      }}
    />
  )
}

const InnerComponentWrapper: ActionComponent = (props) => {
  const { chain_id: chainId } = useChain()

  const options = useActionOptions()
  const address = getChainAddressForActionOptions(options, chainId)

  return address ? (
    <WalletActionsProvider address={address}>
      <InnerComponent {...props} />
    </WalletActionsProvider>
  ) : (
    <InnerComponentLoading {...props} />
  )
}

const Component: ActionComponent = (props) => {
  const {
    context,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const { watch } = useFormContext<CrossChainExecuteData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          excludeChainIds={[currentChainId]}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      {chainId !== currentChainId && (
        // Re-render when chain changes so hooks and state reset.
        <ChainProvider key={chainId} chainId={chainId}>
          <InnerComponentWrapper {...props} />
        </ChainProvider>
      )}
    </>
  )
}

export const makeCrossChainExecuteAction: ActionMaker<
  CrossChainExecuteData
> = ({ t, context, chain: { chain_id: currentChainId } }) => {
  // Only support DAO polytone.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<CrossChainExecuteData> = () => ({
    chainId: currentChainId,
    msgs: [],
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<CrossChainExecuteData> = (
    msg: Record<string, any>
  ) => {
    const decodedPolytone = decodePolytoneExecuteMsg(currentChainId, msg)

    return decodedPolytone.match
      ? {
          match: true,
          data: {
            chainId: decodedPolytone.chainId,
            msgs: decodedPolytone.cosmosMsgs,
          },
        }
      : {
          match: false,
        }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    CrossChainExecuteData
  > = () =>
    useCallback(
      ({ chainId, msgs }) =>
        currentChainId === chainId
          ? undefined
          : maybeMakePolytoneExecuteMessage(currentChainId, chainId, msgs),
      []
    )

  return {
    key: ActionKey.CrossChainExecute,
    Icon: TelescopeEmoji,
    label: t('title.crossChainExecute'),
    description: t('info.crossChainExecuteDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Disallow creation if no accounts created.
    hideFromPicker: Object.values(context.info.polytoneProxies).length === 0,
  }
}
