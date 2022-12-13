import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  HorizontalNftCard,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { validateAddress, validateRequired } from '@dao-dao/utils'

import { MintNftOptions } from './types'

// Form displayed when the user is minting a new NFT.
export const MintNft: ActionComponent<MintNftOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { nftInfo, ProfileDisplay },
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      {isCreating && (
        <p className="max-w-prose">{t('form.nftMintInstructions')}</p>
      )}

      <HorizontalNftCard {...nftInfo} />

      <InputLabel className="-mb-3" name={t('form.uniqueTokenId')} />
      <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
        <TextInput
          className="w-auto"
          disabled={!isCreating}
          error={errors?.mintMsg?.token_id}
          fieldName={fieldNamePrefix + 'mintMsg.token_id'}
          register={register}
          validation={[validateRequired]}
        />

        <div className="flex grow flex-row items-stretch gap-2 sm:gap-3">
          <div className="flex flex-row items-center pl-1 sm:pl-0">
            <ArrowRightAltRounded className="!hidden !h-6 !w-6 text-text-secondary sm:!block" />
            <SubdirectoryArrowRightRounded className="!h-4 !w-4 text-text-secondary sm:!hidden" />
          </div>

          <AddressInput
            ProfileDisplay={ProfileDisplay}
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.mintMsg?.owner}
            fieldName={fieldNamePrefix + 'mintMsg.owner'}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
        </div>
      </div>

      <InputErrorMessage error={errors?.mintMsg?.token_id} />
      <InputErrorMessage error={errors?.mintMsg?.owner} />
    </div>
  )
}
