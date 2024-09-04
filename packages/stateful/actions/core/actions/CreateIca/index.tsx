import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { chainQueries } from '@dao-dao/state/query'
import {
  chainSupportsIcaHostSelector,
  icaRemoteAddressSelector,
} from '@dao-dao/state/recoil'
import {
  ActionBase,
  ChainEmoji,
  useActionOptions,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
  UnifiedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import { MsgRegisterInterchainAccount } from '@dao-dao/types/protobuf/codegen/ibc/applications/interchain_accounts/controller/v1/tx'
import { Metadata } from '@dao-dao/types/protobuf/codegen/ibc/applications/interchain_accounts/v1/metadata'
import {
  ICA_CHAINS_TX_PREFIX,
  getChainForChainName,
  getDisplayNameForChainId,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromConnection,
  isDecodedStargateMsg,
} from '@dao-dao/utils'

import { ManageStorageItemsAction } from '../ManageStorageItems'
import { CreateIcaComponent, CreateIcaData } from './Component'

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chain_id: srcChainId },
  } = useActionOptions()

  const { watch, setError, clearErrors } = useFormContext<CreateIcaData>()
  const destChainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const createdAddressLoading = useCachedLoadingWithError(
    icaRemoteAddressSelector({
      address,
      srcChainId,
      destChainId,
    })
  )
  const icaHostSupported = useCachedLoadingWithError(
    chainSupportsIcaHostSelector({
      chainId: destChainId,
    })
  )

  // If ICA account already exists or ICA host not enabled for this chain during
  // creation, add error preventing submission.
  useEffect(() => {
    if (
      destChainId &&
      !icaHostSupported.loading &&
      !icaHostSupported.updating &&
      (icaHostSupported.errored || !icaHostSupported.data) &&
      props.isCreating
    ) {
      setError((props.fieldNamePrefix + 'chainId') as 'chainId', {
        type: 'manual',
        message: icaHostSupported.errored
          ? icaHostSupported.error.message
          : t('error.icaHostUnsupported', {
              chain: getDisplayNameForChainId(destChainId),
            }),
      })
    } else if (
      destChainId &&
      !createdAddressLoading.loading &&
      !createdAddressLoading.updating &&
      !createdAddressLoading.errored &&
      createdAddressLoading.data &&
      props.isCreating
    ) {
      setError((props.fieldNamePrefix + 'chainId') as 'chainId', {
        type: 'manual',
        message: t('error.icaAlreadyExists', {
          chain: getDisplayNameForChainId(destChainId),
        }),
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'chainId') as 'chainId')
    }
  }, [
    clearErrors,
    createdAddressLoading,
    destChainId,
    icaHostSupported,
    props.fieldNamePrefix,
    props.isCreating,
    setError,
    t,
  ])

  return (
    <CreateIcaComponent
      {...props}
      options={{
        createdAddressLoading,
        icaHostSupported,
      }}
    />
  )
}

export class CreateIcaAction extends ActionBase<CreateIcaData> {
  public readonly key = ActionKey.CreateIca
  public readonly Component = Component

  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    super(options, {
      Icon: ChainEmoji,
      label: options.t('title.createIca'),
      description: options.t('info.createIcaDescription'),
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

    this.manageStorageItemsAction = new ManageStorageItemsAction(options)

    this.defaults = {
      chainId: '',
    }

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => {})
  }

  async setup() {
    // Hide from picker if chain does not support ICA controller.
    this.metadata.hideFromPicker = !(await this.options.queryClient.fetchQuery(
      chainQueries.supportsIcaController({
        chainId: this.options.chain.chain_id,
      })
    ))

    return this.manageStorageItemsAction.setup()
  }

  encode({ chainId }: CreateIcaData): UnifiedCosmosMsg[] {
    if (!chainId) {
      throw new Error('Missing chainId')
    }

    const { sourceChain, destinationChain } = getIbcTransferInfoBetweenChains(
      this.options.chain.chain_id,
      chainId
    )

    return [
      makeStargateMessage({
        stargate: {
          typeUrl: MsgRegisterInterchainAccount.typeUrl,
          value: MsgRegisterInterchainAccount.fromPartial({
            owner: this.options.address,
            connectionId: sourceChain.connection_id,
            version: JSON.stringify(
              Metadata.fromPartial({
                version: 'ics27-1',
                controllerConnectionId: sourceChain.connection_id,
                hostConnectionId: destinationChain.connection_id,
                // Empty when registering a new address.
                address: '',
                encoding: 'proto3',
                txType: 'sdk_multi_msg',
              })
            ),
          }),
        },
      }),
      this.manageStorageItemsAction.encode({
        setting: true,
        key: ICA_CHAINS_TX_PREFIX + chainId,
        value: '1',
      }),
    ]
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    const icaRegistrationInfo =
      isDecodedStargateMsg(
        messages[0].decodedMessage,
        MsgRegisterInterchainAccount,
        {
          connectionId: {},
        }
      ) &&
      getIbcTransferInfoFromConnection(
        this.options.chain.chain_id,
        messages[0].decodedMessage.stargate.value.connectionId
      )

    if (!icaRegistrationInfo) {
      return false
    }

    // If there is a second message, check if it's a manage storage items that
    // sets the ICA item for the destination chain. If so, match both messages.
    // Otherwise, just match the first message.
    if (
      messages.length >= 2 &&
      this.manageStorageItemsAction.match([messages[1]])
    ) {
      const { setting, key, value } = this.manageStorageItemsAction.decode([
        messages[1],
      ])
      return setting &&
        key ===
          ICA_CHAINS_TX_PREFIX +
            getChainForChainName(
              icaRegistrationInfo.destinationChain.chain_name
            ).chain_id &&
        value === '1'
        ? // Both ICA registration and item storage.
          2
        : // Only ICA registration.
          1
    }

    // Just match the one ICA registration message. This is for backwards
    // compatibility, in case someone registered an ICA without storing it in an
    // item using the old version of this action. Now it will always store the
    // ICA in an item.
    return 1
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): CreateIcaData {
    const {
      destinationChain: { chain_name },
    } = getIbcTransferInfoFromConnection(
      this.options.chain.chain_id,
      decodedMessage.stargate.value.connectionId
    )

    return {
      chainId: getChainForChainName(chain_name).chain_id,
    }
  }
}
