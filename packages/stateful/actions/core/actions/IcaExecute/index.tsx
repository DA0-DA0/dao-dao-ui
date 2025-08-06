import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { accountQueries, chainQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  ActionMatcher,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  InputErrorMessage,
  Loader,
  RocketShipEmoji,
  StatusCard,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  AccountType,
  ActionComponent,
  ActionDecodeContext,
  ActionKey,
  ActionKeyAndData,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  getDisplayNameForChainId,
  maybeMakeIcaExecuteMessages,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useActionEncodeContext } from '../../../context'
import { WalletActionsProvider } from '../../../providers/wallet'
import { fetchActionsWithOptions } from '../../../utils'
import {
  IcaExecuteData,
  IcaExecuteComponent as StatelessIcaExecuteComponent,
} from './Component'

const InnerComponent: ActionComponent = (props) => (
  <StatelessIcaExecuteComponent
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
    address,
    context,
    chain: { chainId: srcChainId },
  } = useActionOptions()

  const { watch, setError, clearErrors, setValue } =
    useFormContext<IcaExecuteData>()
  const destChainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const icaRemoteAddressLoading = useQueryLoadingDataWithError(
    destChainId
      ? accountQueries.remoteIcaAddress({
          address,
          srcChainId,
          destChainId,
        })
      : undefined
  )

  // Set error and ICA remote address loader.
  useEffect(() => {
    setValue(
      (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
      ''
    )

    if (icaRemoteAddressLoading.loading || icaRemoteAddressLoading.updating) {
      clearErrors(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress'
      )
      return
    }

    if (icaRemoteAddressLoading.errored) {
      setError(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
        {
          type: 'manual',
          message:
            icaRemoteAddressLoading.error instanceof Error
              ? icaRemoteAddressLoading.error.message
              : `${icaRemoteAddressLoading.error}`,
        }
      )
    } else if (!icaRemoteAddressLoading.data) {
      setError(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
        {
          type: 'manual',
          message: t('error.icaDoesNotExist', {
            chain: getDisplayNameForChainId(destChainId),
          }),
        }
      )
    } else {
      clearErrors(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress'
      )
      setValue(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
        icaRemoteAddressLoading.data
      )
    }
  }, [
    clearErrors,
    context.type,
    destChainId,
    icaRemoteAddressLoading,
    props.fieldNamePrefix,
    setError,
    setValue,
    t,
  ])

  return (
    <>
      <DaoSupportedChainPickerInput
        accountTypes={[AccountType.Ica]}
        className="self-start"
        disabled={!props.isCreating}
        excludeChainIds={[srcChainId]}
        fieldName={props.fieldNamePrefix + 'chainId'}
        noChainsFallback={
          <InputErrorMessage
            className="!mt-0"
            error={t('error.noIcasForExecute')}
          />
        }
        onlyDaoChainIds
      />

      {!!destChainId &&
        (icaRemoteAddressLoading.loading || icaRemoteAddressLoading.updating ? (
          <Loader />
        ) : (
          <>
            <InputErrorMessage
              className="-mt-2"
              error={
                icaRemoteAddressLoading.errored
                  ? icaRemoteAddressLoading.error
                  : props.errors?.icaRemoteAddress
              }
            />

            {/* If ICA does not exist, prompt to create. */}
            {props.isCreating &&
              !icaRemoteAddressLoading.loading &&
              !icaRemoteAddressLoading.errored &&
              !icaRemoteAddressLoading.data && (
                <Button
                  className="self-start"
                  onClick={() => {
                    // Remove the current action.
                    props.remove()

                    // Add the creation actions.
                    props.addAction({
                      actionKey: ActionKey.CreateIca,
                      data: {
                        chainId: destChainId,
                      },
                    })
                    props.addAction({
                      actionKey: ActionKey.HideIca,
                      data: {
                        chainId: destChainId,
                        register: true,
                      },
                    })
                  }}
                >
                  {t('button.addAccountCreationActions')}
                </Button>
              )}

            {!icaRemoteAddressLoading.errored &&
              !!icaRemoteAddressLoading.data && (
                // Re-render when chain changes so hooks and state reset.
                <ChainProvider key={destChainId} chainId={destChainId}>
                  <WalletActionsProvider address={icaRemoteAddressLoading.data}>
                    <InnerComponent {...props} />
                  </WalletActionsProvider>
                </ChainProvider>
              )}
          </>
        ))}

      <StatusCard
        className="max-w-xl"
        content={t('info.icaExperimental')}
        style="warning"
      />
    </>
  )
}

export class IcaExecuteAction extends ActionBase<IcaExecuteData> {
  public readonly key = ActionKey.IcaExecute
  public readonly Component = Component

  protected _defaults: IcaExecuteData = {
    chainId: '',
    icaRemoteAddress: '',
    msgs: [],
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: RocketShipEmoji,
      label: options.t('title.icaExecute'),
      description: options.t('info.icaExecuteDescription'),
      // Other actions integrate cross-chain ICA functionality directly, so it
      // should be after all the other ones, but it needs to be before Custom,
      // since that's the catch-all action.
      matchPriority: -99,
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => {})
  }

  async setup() {
    // Hide from picker if chain does not support ICA controller.
    this.metadata.hideFromPicker = !(await this.options.queryClient.fetchQuery(
      chainQueries.supportsIcaController({
        chainId: this.options.chain.chainId,
      })
    ))
  }

  encode({
    chainId,
    icaRemoteAddress,
    msgs,
  }: IcaExecuteData): UnifiedCosmosMsg[] {
    if (!chainId || !icaRemoteAddress) {
      throw new Error('Missing chain ID or ICA remote address')
    }

    if (this.options.chain.chainId === chainId) {
      throw new Error('Cannot execute on the same chain')
    }

    return maybeMakeIcaExecuteMessages(
      this.options.chain.chainId,
      chainId,
      this.options.address,
      icaRemoteAddress,
      msgs
    )
  }

  match([
    {
      decodedMessages,
      account: { type },
    },
  ]: ProcessedMessage[]): ActionMatch {
    return type === AccountType.Ica && decodedMessages.length > 0
  }

  async decode(
    [
      {
        wrappedMessages,
        account: { chainId, address },
      },
    ]: ProcessedMessage[],
    context: ActionDecodeContext
  ): Promise<IcaExecuteData> {
    const msgs = wrappedMessages.map(({ message }) => message)

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
      icaRemoteAddress: address,
      msgs,
      _actionData: actionData,
    }
  }
}
