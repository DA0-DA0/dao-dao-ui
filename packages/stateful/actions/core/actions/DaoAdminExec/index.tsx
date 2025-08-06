import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { daoQueries } from '@dao-dao/state'
import {
  ActionBase,
  ActionMatcher,
  ChainProvider,
  DaoSupportedChainPickerInput,
  InputLabel,
  JoystickEmoji,
  RadioInputNoForm,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionDecodeContext,
  ActionKey,
  ActionKeyAndData,
  ActionMatch,
  ActionOptions,
  DaoSource,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  getChainAddressForActionOptions,
  isValidBech32Address,
  makeExecuteSmartContractMessage,
  makeValidateAddress,
  maybeGetChainForChainId,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  AddressInput,
  DaoProviders,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useActionEncodeContext } from '../../../context'
import { fetchActionsWithOptions } from '../../../utils'
import {
  DaoAdminExecData,
  DaoAdminExecComponent as StatelessDaoAdminExecComponent,
} from './Component'

const InnerComponentLoading: ActionComponent = (props) => (
  <StatelessDaoAdminExecComponent
    {...props}
    options={{
      SuspenseLoader,
      encodeContext: useActionEncodeContext(),
    }}
  />
)

const InnerComponent: ActionComponent = (props) => (
  <StatelessDaoAdminExecComponent
    {...props}
    options={{
      SuspenseLoader,
      encodeContext: useActionEncodeContext(),
    }}
  />
)

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    chain: { chainId: currentChainId },
    context,
    address,
  } = useActionOptions()

  const { watch, register, setValue } = useFormContext<DaoAdminExecData>()
  const chainId =
    watch((props.fieldNamePrefix + 'chainId') as 'chainId') || currentChainId
  const coreAddress = watch(
    (props.fieldNamePrefix + 'coreAddress') as 'coreAddress'
  )

  const bech32Prefix = maybeGetChainForChainId(chainId)?.bech32Prefix

  const daoSubDaosLoading = useQueryLoadingDataWithError(
    context.type === ActionContextType.Dao
      ? daoQueries.listAllSubDaos({
          chainId: currentChainId,
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
      ? daoQueries.listWalletAdminOfDaos({
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

export class DaoAdminExecAction extends ActionBase<DaoAdminExecData> {
  public readonly key = ActionKey.DaoAdminExec
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: JoystickEmoji,
      label: options.t('title.daoAdminExec'),
      description: options.t('info.daoAdminExecDescription'),
    })

    this.defaults = {
      chainId: options.chain.chainId,
      coreAddress: '',
      msgs: [],
    }
  }

  encode({
    chainId = this.options.chain.chainId,
    coreAddress,
    msgs,
  }: DaoAdminExecData): UnifiedCosmosMsg[] {
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender: getChainAddressForActionOptions(this.options, chainId) || '',
        contractAddress: coreAddress,
        msg: {
          execute_admin_msgs: {
            msgs,
          },
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
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
  }

  async decode(
    [
      {
        decodedMessage,
        account: { chainId, address },
      },
    ]: ProcessedMessage[],
    context: ActionDecodeContext
  ): Promise<DaoAdminExecData> {
    const msgs = decodedMessage.wasm.execute.msg.execute_admin_msgs.msgs

    let actionData: ActionKeyAndData[] | undefined
    try {
      const { actions, options } = await fetchActionsWithOptions({
        t: this.options.t,
        queryClient: this.options.queryClient,
        chainId,
        address,
      })

      // Match and decode all messages.
      const matcher = new ActionMatcher(
        options,
        context.messageProcessor,
        actions
      )
      const decoders = await matcher.match(msgs)
      actionData = await Promise.all(
        decoders.map((decoder) => decoder.decodeIntoKeyAndData())
      )
    } catch (error) {
      // If fail to load action data, log and ignore. This makes the action
      // uneditable but this is not always an issue.
      console.error(error)
    }

    return {
      chainId,
      coreAddress: decodedMessage.wasm.execute.contract_addr,
      msgs,
      _actionData: actionData,
    }
  }
}
