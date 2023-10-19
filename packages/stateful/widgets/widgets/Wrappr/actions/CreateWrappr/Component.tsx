import { ArrowBackIosRounded } from '@mui/icons-material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'

import {
  Button,
  ImageDropInput,
  InputErrorMessage,
  InputLabel,
  Loader,
  SwitchCard,
  TextAreaInput,
  TextInput,
  Dropdown,
  SegmentedControlsTitle,
} from '@dao-dao/stateless'
import { ActionComponent, LoadingData } from '@dao-dao/types'
import { processError, uploadNft, validateRequired } from '@dao-dao/utils'

// import { WrapprMarkdown } from '../../components/WrapprMarkdown'
import { Wrappr } from '../../types'
import { wrapprMainnetChains } from '../../constants'

export type CreateWrapprData = {
  tokenId: string
  tokenUri: string
  // Used while creating, uploaded to IPFS.
  uploaded: boolean
  data?: {
    title: string
    description: string
    content: string
  }
}

const wrapprOptions = [
  { value: 'llc', label: 'LLC' },
  { value: 'nonProfit', label: 'NonProfit' },
  // Add more options as needed
];
const initiallySelectedOption = 'option1';

const llcJurisdictionOptions = [
  { value: 'deleware', label: 'Deleware'},
  { value: 'offshore', label: 'Offshore'},
]

const handleOptionSelect = (selectedOption, index) => {
  console.log(`Selected: ${selectedOption} (index: ${index})`);
  // You can perform additional actions here based on the selected option.
};


type CreateWrapprOptions = {
  wrapprLoading: LoadingData<Wrappr | undefined>
}

export const CreateWrapprComponent: ActionComponent<CreateWrapprOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { wrapprLoading },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext<CreateWrapprData>()

  const uploaded = watch((fieldNamePrefix + 'uploaded') as 'uploaded')
  const data = watch((fieldNamePrefix + 'data') as 'data')

  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [showPreview, setShowPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  const upload = async () => {
    if (!data) {
      toast.error(t('error.loadingData'))
      return
    }

    setUploading(true)
    try {
      const now = new Date()
      const { cid, metadataUrl } = await uploadNft(
        data.title,
        data.description,
        image,
        JSON.stringify({
          properties: {
            content: data.content,
            created: now.toISOString(),
            pastVersions: [],
          },
        })
      )

      setValue((fieldNamePrefix + 'tokenId') as 'tokenId', cid)
      setValue((fieldNamePrefix + 'tokenUri') as 'tokenUri', metadataUrl)
      setValue((fieldNamePrefix + 'uploaded') as 'uploaded', true)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setUploading(false)
    }
  }

  const continueEditing = () => {
    setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
    setValue((fieldNamePrefix + 'tokenUri') as 'tokenUri', '')
    setValue((fieldNamePrefix + 'uploaded') as 'uploaded', false)
  }

  const now = new Date()

  const mode = watch((fieldNamePrefix + 'mode') as 'mode')

  return isCreating && !uploaded ? (
    <>

<div className="flex flex-col items-stretch gap-1">
<p className="header-text truncate leading-[5rem]">{t('title.selectWrapprType')}</p>
        <SegmentedControlsTitle
          editable={isCreating}
          fieldName={fieldNamePrefix + 'mode'}
          tabs={[
            {
              label: t('info.createLLCWrappr'),
              value: 'llc',
            },
            {
              label: t('button.createNonProfitWrappr'),
              value: 'nonProfit',
            },
          ]}
        />
      </div>
      
{mode === 'llc' && (

<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
  <Dropdown
  options={llcJurisdictionOptions}
  placeholder="Select Wrappr Jurisdiction"
  selected={initiallySelectedOption}
  onSelect={handleOptionSelect}
  containerClassName="optional-container-class" // Optional container class name
  labelContainerClassName="optional-label-container-class" // Optional label container class name
  labelClassName="optional-label-class" // Optional label class name
  iconClassName="optional-icon-class" // Optional icon class name
  keepOpenOnSelect={false} // Set to true to keep the dropdown open after selection
/>
<div className="flex flex-col gap-1">
            <InputLabel name={t('title.name')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.data?.title}
              fieldName={(fieldNamePrefix + 'data.title') as 'data.title'}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.data?.title} />
          </div>
</div>
)}


{mode === 'nonProfit' && (
   <div className="flex grow flex-col gap-4">
   <div className="flex flex-col gap-1">
     <InputLabel name={t('title.name')} />
     <TextInput
       disabled={!isCreating}
       error={errors?.data?.title}
       fieldName={(fieldNamePrefix + 'data.title') as 'data.title'}
       register={register}
       validation={[validateRequired]}
     />
     <InputErrorMessage error={errors?.data?.title} />
   </div>
   <div className="flex flex-col gap-1">
        <InputLabel name={t('title.mission')} />
        <TextAreaInput
          disabled={!isCreating}
          error={errors?.data?.content}
          fieldName={(fieldNamePrefix + 'data.content') as 'data.content'}
          register={register}
          rows={20}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.data?.content} />
      </div>
 </div>

)}


 className="header-text truncate leading-[5rem]">{t('title.selectWrapprChain')}</p>
<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
  <Dropdown
  options={wrapprMainnetChains}
  placeholder="Select Chain To Mint Wrappr Contract"
  selected={initiallySelectedOption}
  onSelect={handleOptionSelect}
  containerClassName="optional-container-class" 
  labelContainerClassName="optional-label-container-class" 
  labelClassName="optional-label-class" 
  iconClassName="optional-icon-class" 
  keepOpenOnSelect={false} 
/>

</div>
<div className="flex flex-col gap-1">
<p className="header-text truncate leading-[5rem]">{t('title.configureGasAndMint')}</p>

{/* TODO: Handle Fees.

A static mint fee of X will be set to the DAO-DAO DAO treasury. 
A gas fee for Axelar's GMP protocol must be included.

Users will be able to select between
  - DAO Treasury
  - Connected Wallet
  - Create FeeGrant

To handle fees.
*/}

</div> 
    </>
  ) : wrapprLoading.loading || !wrapprLoading.data ? (
    <Loader />
  ) : (
    <>
      {isCreating && (
        <Button
          className="self-start"
          onClick={continueEditing}
          variant="secondary"
        >
          <ArrowBackIosRounded className="!h-4 !w-4" />
          {t('button.continueEditing')}
        </Button>
      )}

      <WrapprMarkdown wrappr={wrapprLoading.data} />
    </>
  )
}