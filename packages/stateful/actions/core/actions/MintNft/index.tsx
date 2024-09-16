import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ActionBase,
  CameraWithFlashEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  InputErrorMessage,
  SegmentedControls,
  useActionOptions,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  getChainAddressForActionOptions,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { ChooseExistingNftCollection } from './ChooseExistingNftCollection'
import { CreateNftCollection } from './CreateNftCollection'
import { MintNft } from './MintNft'
import { UploadNftMetadata } from './stateless/UploadNftMetadata'
import { MintNftData } from './types'

const Component: ActionComponent<undefined, MintNftData> = (props) => {
  const { t } = useTranslation()
  const options = useActionOptions()
  const { watch, register, setValue } = useFormContext<MintNftData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const contractChosen = watch(
    (props.fieldNamePrefix + 'contractChosen') as 'contractChosen'
  )
  const tokenUri = watch(
    (props.fieldNamePrefix + 'mintMsg.token_uri') as 'mintMsg.token_uri'
  )

  const [_creatingNew, setCreatingNew] = useState(false)
  // Can only create new NFT collections on supported chains, since we need the
  // code ID to instantiate a contract.
  const supportsCreatingNewCollection =
    options.chainContext.type === ActionChainContextType.Supported
  const creatingNew = supportsCreatingNewCollection ? _creatingNew : false

  // Manually validate to ensure contract has been chosen and token URI has
  // been set.
  useEffect(() => {
    register((props.fieldNamePrefix + 'contractChosen') as 'contractChosen', {
      validate: (value) => !!value || t('error.nftCollectionNotChosen'),
    })
    register(
      (props.fieldNamePrefix + 'mintMsg.token_uri') as 'mintMsg.token_uri',
      {
        validate: (value) => !!value || t('error.nftMetadataNotUploaded'),
      }
    )
  }, [props.fieldNamePrefix, register, t])

  return (
    <>
      {options.context.type === ActionContextType.Dao && props.isCreating && (
        <DaoSupportedChainPickerInput
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Update recipient to correct address.
            const newAddress =
              getChainAddressForActionOptions(options, chainId) || ''

            setValue(
              (props.fieldNamePrefix + 'mintMsg.owner') as 'mintMsg.owner',
              newAddress
            )

            // Also update instantiate chain ID.
            setValue(
              (props.fieldNamePrefix +
                'instantiateData.chainId') as 'instantiateData.chainId',
              chainId
            )
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        {contractChosen ? (
          // The steps are:
          // 1. Choose existing collection or create new collection.
          // 2. Upload NFT metadata.
          // 3. Display final Mint NFT action details.
          //
          // The first two steps are only relevant when creating a new proposal.
          // When viewing an existing proposal, the first two steps are skipped
          // and the user is taken directly to the final step. Specifically,
          // once token URI is set, we don't need to upload metadata, so display
          // the final `MintNft` action. When viewing an already-created
          // proposal, this value is decoded from the cosmos message and is
          // ready right away. When creating a new proposal, this value is set
          // by the `UploadNftMetadata` component once the metadata is uploaded.
          tokenUri ? (
            <MintNft {...props} />
          ) : (
            <UploadNftMetadata {...props} />
          )
        ) : (
          <>
            <SegmentedControls<boolean>
              disabled={!supportsCreatingNewCollection}
              onSelect={setCreatingNew}
              selected={creatingNew}
              tabs={[
                {
                  label: t('form.useExistingCollection'),
                  value: false,
                },
                ...(supportsCreatingNewCollection
                  ? [
                      {
                        label: t('form.createNewCollection'),
                        value: true,
                      },
                    ]
                  : []),
              ]}
            />

            {creatingNew ? (
              <CreateNftCollection {...props} />
            ) : (
              <ChooseExistingNftCollection {...props} />
            )}
          </>
        )}
      </ChainProvider>

      <div className="flex flex-col items-end gap-2 self-end text-right">
        <InputErrorMessage error={props.errors?.contractChosen} />
        <InputErrorMessage error={props.errors?.mintMsg?.token_uri} />
      </div>
    </>
  )
}

export class MintNftAction extends ActionBase<MintNftData> {
  public readonly key = ActionKey.MintNft
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: CameraWithFlashEmoji,
      label: options.t('title.mintNft'),
      description: options.t('info.mintNftDescription'),
      // This must be after the Press widget's Create Post action.
      matchPriority: -80,
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      contractChosen: false,
      collectionAddress: undefined,

      instantiateData: {
        chainId: options.chain.chain_id,
        name: '',
        symbol: '',
      },
      mintMsg: {
        owner: options.address,
        token_id: '',
        token_uri: '',
      },
      metadata: {
        name: '',
        description: '',
      },
    }
  }

  encode({
    chainId,
    collectionAddress,
    mintMsg,
  }: MintNftData): UnifiedCosmosMsg[] {
    // Should never happen if form validation is working correctly.
    if (!collectionAddress) {
      throw new Error('Missing collection address.')
    }

    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender found for chain.')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender,
        contractAddress: collectionAddress,
        msg: {
          mint: mintMsg,
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              mint: {
                owner: {},
                token_id: {},
                token_uri: {},
              },
            },
          },
        },
      }) && !!decodedMessage.wasm.execute.msg.mint.token_uri
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): MintNftData {
    return {
      chainId,
      contractChosen: true,
      collectionAddress: decodedMessage.wasm.execute.contract_addr,
      mintMsg: {
        owner: decodedMessage.wasm.execute.msg.mint.owner,
        token_id: decodedMessage.wasm.execute.msg.mint.token_id,
        token_uri: decodedMessage.wasm.execute.msg.mint.token_uri,
      },
    }
  }
}
