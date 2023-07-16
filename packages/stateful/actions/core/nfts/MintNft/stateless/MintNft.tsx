import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  HorizontalNftCard,
  InputErrorMessage,
  InputLabel,
  TextInput,
  useDetectWrap,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../../react'
import { MintNftOptions } from '../types'

// Form displayed when the user is minting a new NFT.
export const MintNft: ActionComponent<MintNftOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { nftInfo, AddressInput },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register } = useFormContext()

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <div className="flex flex-col gap-4">
      {isCreating && (
        <p className="max-w-prose">{t('form.nftMintInstructions')}</p>
      )}

      <HorizontalNftCard {...nftInfo} />

      <InputLabel className="-mb-3" name={t('form.uniqueTokenId')} />
      <div
        className="flex flex-row flex-wrap items-stretch gap-x-3 gap-y-2"
        ref={containerRef}
      >
        <TextInput
          className="w-auto"
          disabled={!isCreating}
          error={errors?.mintMsg?.token_id}
          fieldName={fieldNamePrefix + 'mintMsg.token_id'}
          register={register}
          validation={[validateRequired]}
        />

        <div
          className="flex grow flex-row items-stretch gap-2 sm:gap-3"
          ref={childRef}
        >
          <div
            className={clsx('flex flex-row items-center', wrapped && 'pl-1')}
          >
            <Icon className="!h-6 !w-6 text-text-secondary" />
          </div>

          <AddressInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.mintMsg?.owner}
            fieldName={fieldNamePrefix + 'mintMsg.owner'}
            register={register}
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
        </div>
      </div>

      <InputErrorMessage error={errors?.mintMsg?.token_id} />
      <InputErrorMessage error={errors?.mintMsg?.owner} />
    </div>
  )
}
