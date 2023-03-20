import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CameraWithFlashEmoji,
  InputErrorMessage,
  Loader,
  SegmentedControls,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components'
import { ActionCard } from '../../components/ActionCard'
import { MintNftData, UploadNftMetadata } from '../../components/nft'
import { useActionOptions } from '../../react'
import { ChooseExistingNftCollection } from './ChooseExistingNftCollection'
import { InstantiateNftCollection } from './InstantiateNftCollection'
import { MintNft } from './MintNft'

const Component: ActionComponent<undefined, MintNftData> = (props) => {
  const { t } = useTranslation()
  const { address } = useActionOptions()
  const { watch, setValue, register } = useFormContext()

  const contractChosen = watch(props.fieldNamePrefix + 'contractChosen')
  const tokenUri = watch(props.fieldNamePrefix + 'mintMsg.token_uri')

  const [creatingNew, setCreatingNew] = useState(false)
  const [mounted, setMounted] = useState(false)
  // If `contractChosen` is true on mount during creation, this must have been
  // set by duplicating an existing action. In this case, we want to default
  // to using the existing contract since the address is filled in, and clear
  // `contractChosen` so the user has to confirm the contract. We also need to
  // clear the `mintMsg` since the user may want to mint a different NFT, and
  // set `instantiateMsg.minter` to the default value in case the user wants
  // to create a new collection instead. Duplicating from an existing action
  // will yield `instantiateMsg` being undefined.
  useEffect(() => {
    if (!mounted && contractChosen && props.isCreating) {
      setValue(props.fieldNamePrefix + 'contractChosen', false)
      setValue(props.fieldNamePrefix + 'instantiateMsg.minter', address)
      setValue(props.fieldNamePrefix + 'mintMsg', {
        token_id: '',
        token_uri: '',
      })
      setCreatingNew(false)
    }
    setMounted(true)
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Manually validate to ensure contract has been chosen and token URI has
  // been set.
  useEffect(() => {
    register(props.fieldNamePrefix + 'contractChosen', {
      validate: (value) => !!value || t('error.nftCollectionNotChosen'),
    })
    register(props.fieldNamePrefix + 'mintMsg.token_uri', {
      validate: (value) => !!value || t('error.nftMetadataNotUploaded'),
    })
  }, [props.fieldNamePrefix, register, t])

  return (
    <ActionCard
      Icon={CameraWithFlashEmoji}
      onRemove={props.onRemove}
      title={t('title.mintNft')}
    >
      <SuspenseLoader fallback={<Loader />} forceFallback={!mounted}>
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

        <div className="flex flex-col items-end gap-2 self-end text-right">
          <InputErrorMessage error={props.errors?.contractChosen} />
          <InputErrorMessage error={props.errors?.mintMsg?.token_uri} />
        </div>
      </SuspenseLoader>
    </ActionCard>
  )
}

export const makeMintNftAction: ActionMaker<MintNftData> = ({ t, address }) => {
  const useDefaults: UseDefaults<MintNftData> = () => ({
    contractChosen: false,
    collectionAddress: undefined,

    instantiateMsg: {
      minter: address,
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
    useCallback(({ collectionAddress, mintMsg }: MintNftData) => {
      // Should never happen if form validation is working correctly.
      if (!collectionAddress) {
        throw new Error(t('error.loadingData'))
      }

      return makeWasmMessage({
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
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintNftData> = (
    msg: Record<string, any>
  ) => {
    // Native
    if (
      objectMatchesStructure(msg, {
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
      }) &&
      msg.wasm.execute.msg.mint.token_uri
    ) {
      return {
        match: true,
        data: {
          contractChosen: true,
          collectionAddress: msg.wasm.execute.contract_addr,
          mintMsg: {
            owner: msg.wasm.execute.msg.mint.owner,
            token_id: msg.wasm.execute.msg.mint.token_id,
            token_uri: msg.wasm.execute.msg.mint.token_uri,
          },
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.MintNft,
    Icon: CameraWithFlashEmoji,
    label: t('title.mintNft'),
    description: t('info.mintNftDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
