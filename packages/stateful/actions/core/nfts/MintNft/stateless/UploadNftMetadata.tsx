import { useFormContext } from 'react-hook-form'

import { UploadNftMetadata as StatelessUploadNftMetadata } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'

import { Trans } from '../../../../../components/Trans'
import { MintNftData } from '../types'

// Form displayed when the user is uploading NFT metadata.
export const UploadNftMetadata: ActionComponent = ({
  fieldNamePrefix,
  errors,
}) => {
  const { watch, trigger, setValue } = useFormContext<MintNftData>()
  const collectionAddress = watch(
    (fieldNamePrefix + 'collectionAddress') as 'collectionAddress'
  )

  return (
    <StatelessUploadNftMetadata<MintNftData>
      Trans={Trans}
      audioError={errors?.metadata?.properties?.audio}
      audioFieldName={
        (fieldNamePrefix +
          'metadata.properties.audio') as 'metadata.properties.audio'
      }
      collectionAddress={collectionAddress}
      descriptionError={errors?.metadata?.description}
      descriptionFieldName={
        (fieldNamePrefix + 'metadata.description') as 'metadata.description'
      }
      nameError={errors?.metadata?.name}
      nameFieldName={(fieldNamePrefix + 'metadata.name') as 'metadata.name'}
      onToggleAdvanced={(showingAdvanced) => {
        // If no longer showing, clear properties because now it is hiding.
        if (!showingAdvanced) {
          setValue(
            (fieldNamePrefix + 'metadata.properties') as 'metadata.properties',
            undefined,
            {
              shouldValidate: true,
            }
          )
        }
      }}
      onUpload={(metadataUrl, showingAdvanced) => {
        setValue(
          (fieldNamePrefix + 'mintMsg.token_uri') as 'mintMsg.token_uri',
          metadataUrl
        )

        // If not showing advanced, clear properties if set, since we copy the
        // metadata over to the final Mint NFT step to show a preview.
        if (!showingAdvanced) {
          setValue(
            (fieldNamePrefix + 'metadata.properties') as 'metadata.properties',
            undefined
          )
        }
      }}
      validateUpload={async () =>
        // Manually validate just the metadata fields we will upload.
        await trigger((fieldNamePrefix + 'metadata') as 'metadata')
      }
      videoError={errors?.metadata?.properties?.video}
      videoFieldName={
        (fieldNamePrefix +
          'metadata.properties.video') as 'metadata.properties.video'
      }
    />
  )
}
