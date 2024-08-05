import { useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { daoQueries } from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  InputLabel,
  JoystickEmoji,
  RadioInputNoForm,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  DaoSource,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  isValidBech32Address,
  makeExecuteSmartContractMessage,
  makeValidateAddress,
  maybeGetChainForChainId,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  AddressInput,
  DaoProviders,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import {
  useActionOptions,
  useActionsForMatching,
  useLoadedActionsAndCategories,
} from '../../../react'
import {
  DaoAdminExecData,
  DaoAdminExecComponent as StatelessDaoAdminExecComponent,
} from './Component'

const useDefaults: UseDefaults<DaoAdminExecData> = () => ({
  chainId: useActionOptions().chain.chain_id,
  coreAddress: '',
  msgs: [],
})

const InnerComponentLoading: ActionComponent = (props) => (
  <StatelessDaoAdminExecComponent
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
    <StatelessDaoAdminExecComponent
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

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: currentChainId },
    context,
    address,
  } = useActionOptions()

  const { watch, register, setValue } = useFormContext<DaoAdminExecData>()
  const chainId =
    watch((props.fieldNamePrefix + 'chainId') as 'chainId') || currentChainId
  const coreAddress = watch(
    (props.fieldNamePrefix + 'coreAddress') as 'coreAddress'
  )

  const bech32Prefix = maybeGetChainForChainId(chainId)?.bech32_prefix

  const queryClient = useQueryClient()
  const daoSubDaosLoading = useQueryLoadingDataWithError(
    context.type === ActionContextType.Dao
      ? daoQueries.listAllSubDaos(queryClient, {
          chainId,
          address,
          // We only care about the SubDAOs this DAO has admin powers over.
          onlyAdmin: true,
        })
      : undefined,
    (daos) =>
      daos.map(
        ({ chainId, addr }): DaoSource => ({
          chainId,
          coreAddress: addr,
        })
      )
  )
  const walletAdminOfDaosLoading = useQueryLoadingDataWithError(
    context.type === ActionContextType.Wallet ||
      context.type === ActionContextType.Gov
      ? daoQueries.listWalletAdminOfDaos(queryClient, {
          chainId,
          address,
        })
      : undefined,
    (daos) =>
      daos.map(
        (coreAddress): DaoSource => ({
          chainId,
          coreAddress,
        })
      )
  )

  const childDaos =
    context.type === ActionContextType.Dao
      ? daoSubDaosLoading
      : walletAdminOfDaosLoading

  return (
    <>
      {!props.isCreating ? (
        <ChainProvider chainId={chainId}>
          <EntityDisplay address={coreAddress} />
        </ChainProvider>
      ) : (
        <>
          {(childDaos.loading ||
            (!childDaos.errored && childDaos.data.length > 0)) && (
            <RadioInputNoForm<string>
              loading={childDaos.loading}
              onChange={(value) => {
                const [chainId, coreAddress] = value.split(':')
                setValue(
                  (props.fieldNamePrefix + 'chainId') as 'chainId',
                  chainId
                )
                setValue(
                  (props.fieldNamePrefix + 'coreAddress') as 'coreAddress',
                  coreAddress
                )
              }}
              options={
                childDaos.loading
                  ? []
                  : childDaos.data.map((childDao) => ({
                      display: (
                        <ChainProvider chainId={childDao.chainId}>
                          <EntityDisplay
                            address={childDao.coreAddress}
                            hideImage
                            noCopy
                          />
                        </ChainProvider>
                      ),
                      value: [childDao.chainId, childDao.coreAddress].join(':'),
                    }))
              }
              selected={[chainId, coreAddress].join(':')}
            />
          )}

          {context.type === ActionContextType.Dao && (
            <DaoSupportedChainPickerInput
              disabled={!props.isCreating}
              fieldName={props.fieldNamePrefix + 'chainId'}
              onlyDaoChainIds
            />
          )}

          <InputLabel className="-mb-2" name={t('title.dao')} />

          <ChainProvider chainId={chainId}>
            <AddressInput
              error={props.errors?.coreAddress}
              fieldName={
                (props.fieldNamePrefix + 'coreAddress') as 'coreAddress'
              }
              register={register}
              type="contract"
              validation={[makeValidateAddress(bech32Prefix)]}
            />
          </ChainProvider>
        </>
      )}

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
        loaderFallback={<InnerComponentLoading {...props} />}
      >
        <InnerComponent {...props} />
      </DaoProviders>
    </>
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<DaoAdminExecData> = (
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
          chainId,
          coreAddress: msg.wasm.execute.contract_addr,
          msgs: msg.wasm.execute.msg.execute_admin_msgs.msgs,
        },
      }
    : {
        match: false,
      }
}

const useTransformToCosmos: UseTransformToCosmos<DaoAdminExecData> = () => {
  const options = useActionOptions()

  return ({ chainId = options.chain.chain_id, coreAddress, msgs }) =>
    maybeMakePolytoneExecuteMessage(
      options.chain.chain_id,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender: getChainAddressForActionOptions(options, chainId) || '',
        contractAddress: coreAddress,
        msg: {
          execute_admin_msgs: {
            msgs,
          },
        },
      })
    )
}

export const makeDaoAdminExecAction: ActionMaker<DaoAdminExecData> = ({
  t,
}) => ({
  key: ActionKey.DaoAdminExec,
  Icon: JoystickEmoji,
  label: t('title.daoAdminExec'),
  description: t('info.daoAdminExecDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
