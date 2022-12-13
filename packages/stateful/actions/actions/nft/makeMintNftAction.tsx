import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  ImageEmoji,
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
import { ChooseExistingNftCollection } from './ChooseExistingNftCollection'
import { InstantiateNftCollection } from './InstantiateNftCollection'
import { MintNft } from './MintNft'

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
    },
  })

  const Component: ActionComponent<undefined, MintNftData> = (props) => {
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

    // Manually validate to ensure contract has been chosen.
    useEffect(() => {
      register(props.fieldNamePrefix + 'contractChosen', {
        validate: (value) => value || t('error.nftCollectionNotChosen'),
      })
    }, [props.fieldNamePrefix, register])

    return (
      <ActionCard
        Icon={ImageEmoji}
        onRemove={props.onRemove}
        title={t('title.mintNft')}
      >
        <SuspenseLoader fallback={<Loader />} forceFallback={!mounted}>
          {contractChosen ? (
            // If token URI is set, we don't need to upload metadata. If
            // viewing a created proposal, this is decoded from the cosmos
            // message. If creating a new proposal, this is set by the
            // `UploadNftMetadata` component once the metadata is uploaded.
            tokenUri ? (
              <MintNft {...props} />
            ) : (
              <UploadNftMetadata {...props} />
            )
          ) : (
            <div className="flex flex-col gap-4">
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
            </div>
          )}

          <InputErrorMessage
            className="self-end text-right"
            error={props.errors?.contractChosen}
          />
        </SuspenseLoader>
      </ActionCard>
    )
  }

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
    Icon: ImageEmoji,
    label: t('title.mintNft'),
    description: t('info.mintNftDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
