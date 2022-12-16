import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ChooseExistingNftCollectionOptions } from './types'

// Displayed when entering an existing NFT collection address.
export const ChooseExistingNftCollection: ActionComponent<
  ChooseExistingNftCollectionOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { chooseLoading, onChooseExistingContract },
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <InputLabel name={t('form.existingNftCollection')} />

        <AddressInput
          error={errors?.collectionAddress}
          fieldName={fieldNamePrefix + 'collectionAddress'}
          iconType="contract"
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />

        <InputErrorMessage error={errors?.collectionAddress} />
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
