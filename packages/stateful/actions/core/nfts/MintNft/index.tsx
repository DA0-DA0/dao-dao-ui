import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CameraWithFlashEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  InputErrorMessage,
  SegmentedControls,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { ChooseExistingNftCollection } from './ChooseExistingNftCollection'
import { InstantiateNftCollection } from './InstantiateNftCollection'
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
          className="mb-4"
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
                {
                  label: t('form.createNewCollection'),
                  value: true,
                },
              ]}
            />

            {creatingNew ? (
              <InstantiateNftCollection {...props} />
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

export const makeMintNftAction: ActionMaker<MintNftData> = ({
  t,
  address,
  chain: { chain_id: currentChainId },
}) => {
  const useDefaults: UseDefaults<MintNftData> = () => ({
    chainId: currentChainId,
    contractChosen: false,
    collectionAddress: undefined,

    instantiateData: {
      chainId: currentChainId,
      name: '',
      symbol: '',
    },
    mintMsg: {
      owner: address,
      token_id: '',
      token_uri: '',
    },
    metadata: {
      name: '',
      description: '',
      audio: undefined,
      video: undefined,
      extra: '{}',
    },
  })

  const useTransformToCosmos: UseTransformToCosmos<MintNftData> = () =>
    useCallback(({ chainId, collectionAddress, mintMsg }: MintNftData) => {
      // Should never happen if form validation is working correctly.
      if (!collectionAddress) {
        throw new Error(t('error.loadingData'))
      }

      return maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: collectionAddress,
              funds: [],
              msg: {
                mint: mintMsg,
              },
            },
          },
        })
      )
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintNftData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
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
            mint: {
              owner: {},
              token_id: {},
              token_uri: {},
            },
          },
        },
      },
    }) && msg.wasm.execute.msg.mint.token_uri
      ? {
          match: true,
          data: {
            chainId,
            contractChosen: true,
            collectionAddress: msg.wasm.execute.contract_addr,
            mintMsg: {
              owner: msg.wasm.execute.msg.mint.owner,
              token_id: msg.wasm.execute.msg.mint.token_id,
              token_uri: msg.wasm.execute.msg.mint.token_uri,
            },
          },
        }
      : {
          match: false,
        }
  }

  return {
    key: ActionKey.MintNft,
    Icon: CameraWithFlashEmoji,
    label: t('title.mintNft'),
    description: t('info.mintNftDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
