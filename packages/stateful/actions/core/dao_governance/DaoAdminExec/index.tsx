import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { DaoDaoCoreSelectors, walletAdminOfDaosSelector } from '@dao-dao/state'
import { JoystickEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  isValidBech32Address,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  AddressInput,
  DaoProviders,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import {
  useActionOptions,
  useActionsForMatching,
  useLoadedActionsAndCategories,
} from '../../../react'
import {
  DaoAdminExecData,
  DaoAdminExecOptions,
  DaoAdminExecComponent as StatelessDaoAdminExecComponent,
} from './Component'

const useDefaults: UseDefaults<DaoAdminExecData> = () => ({
  coreAddress: '',
  msgs: [],
})

type InnerOptions = Pick<DaoAdminExecOptions, 'childDaos'>

const InnerComponentLoading: ActionComponent<InnerOptions> = (props) => (
  <StatelessDaoAdminExecComponent
    {...props}
    options={{
      categories: [],
      loadedActions: {},
      actionsForMatching: [],
      childDaos: props.options.childDaos,
      AddressInput,
      EntityDisplay,
      SuspenseLoader,
    }}
  />
)

const InnerComponent: ActionComponent<InnerOptions> = (props) => {
  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })
  const actionsForMatching = useActionsForMatching()

  return (
    <StatelessDaoAdminExecComponent
      {...props}
      options={{
        categories,
        loadedActions,
        actionsForMatching,
        childDaos: props.options.childDaos,
        AddressInput,
        EntityDisplay,
        SuspenseLoader,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const {
    context,
    address,
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { watch } = useFormContext<DaoAdminExecData>()
  const coreAddress = watch(
    (props.fieldNamePrefix + 'coreAddress') as 'coreAddress'
  )

  const daoSubDaosLoadable = useCachedLoadable(
    context.type === ActionContextType.Dao
      ? DaoDaoCoreSelectors.listAllSubDaosSelector({
          contractAddress: address,
          chainId,
          // We only care about the SubDAOs this DAO has admin powers over.
          onlyAdmin: true,
        })
      : undefined
  )
  const walletAdminOfDaosLoadable = useCachedLoadable(
    context.type === ActionContextType.Wallet ||
      context.type === ActionContextType.Gov
      ? walletAdminOfDaosSelector({
          chainId,
          walletAddress: address,
        })
      : undefined
  )
  const childDaosLoadable =
    context.type === ActionContextType.Dao
      ? daoSubDaosLoadable
      : walletAdminOfDaosLoadable

  const options: InnerOptions = {
    childDaos:
      childDaosLoadable.state === 'hasValue'
        ? {
            loading: false,
            data: childDaosLoadable.contents.map((dao) =>
              typeof dao === 'string' ? dao : dao.addr
            ),
          }
        : { loading: true },
  }

  return (
    <DaoProviders
      key={
        // Make sure to re-render (reset state inside the contexts) when the
        // selected SubDAO changes.
        coreAddress || '_'
      }
      chainId={chainId}
      coreAddress={
        // Loading state if invalid address.
        coreAddress && isValidBech32Address(coreAddress, bech32Prefix)
          ? coreAddress
          : ''
      }
      loaderFallback={<InnerComponentLoading {...props} options={options} />}
    >
      <InnerComponent {...props} options={options} />
    </DaoProviders>
  )
}

const useTransformToCosmos: UseTransformToCosmos<DaoAdminExecData> = () =>
  useCallback(
    ({ coreAddress, msgs }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
            funds: [],
            msg: {
              execute_admin_msgs: {
                msgs,
              },
            },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<DaoAdminExecData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          execute_admin_msgs: {
            msgs: {},
          },
        },
      },
    },
  })
    ? {
        match: true,
        data: {
          coreAddress: msg.wasm.execute.contract_addr,
          msgs: msg.wasm.execute.msg.execute_admin_msgs.msgs,
        },
      }
    : {
        match: false,
      }

export const makeDaoAdminExecAction: ActionMaker<DaoAdminExecData> = ({
  t,
  context,
  chainContext,
}) =>
  // Only allow using this action in DAOs or gov props on chains with CW.
  context.type === ActionContextType.Dao ||
  (context.type === ActionContextType.Gov &&
    chainContext.type !== ActionChainContextType.Any &&
    !chainContext.config.noCosmWasm)
    ? {
        key: ActionKey.DaoAdminExec,
        Icon: JoystickEmoji,
        label: t('title.daoAdminExec'),
        description: t('info.daoAdminExecDescription'),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
      }
    : null
