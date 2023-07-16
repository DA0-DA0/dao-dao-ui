import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { makeValidateContractAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../../react'
import { ChooseExistingNftCollectionOptions } from '../types'

// Displayed when entering an existing NFT collection address.
export const ChooseExistingNftCollection: ActionComponent<
  ChooseExistingNftCollectionOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { chooseLoading, onChooseExistingContract, existingCollections },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register, watch, setValue } = useFormContext()

  const collectionAddress = watch(fieldNamePrefix + 'collectionAddress')

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <InputLabel name={t('form.existingCollectionAddress')} />

        <AddressInput
          error={errors?.collectionAddress}
          fieldName={fieldNamePrefix + 'collectionAddress'}
          register={register}
          type="contract"
          validation={[
            validateRequired,
            makeValidateContractAddress(bech32Prefix),
          ]}
        />

        <InputErrorMessage error={errors?.collectionAddress} />

        {existingCollections.length > 0 && (
          <div className="!mt-4 space-y-2">
            <InputLabel name={t('title.suggestions')} />

            <div className="flex flex-row flex-wrap gap-1">
              {existingCollections.map(({ address, name }) => (
                <Button
                  key={address}
                  center
                  onClick={() =>
                    setValue(fieldNamePrefix + 'collectionAddress', address)
                  }
                  pressed={collectionAddress === address}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        className="self-end"
        loading={chooseLoading}
        onClick={onChooseExistingContract}
        size="lg"
      >
        {t('button.continue')}
      </Button>
    </div>
  )
}
