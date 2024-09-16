import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainLabel,
  IbcDestinationChainPicker,
  InputErrorMessage,
  InputLabel,
  RadioInput,
  useActionOptions,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

export type HideIcaData = {
  chainId: string
}

export interface HideIcaOptions {
  currentlyEnabled: string[]
}

export const HideIcaComponent: ActionComponent<HideIcaOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { currentlyEnabled },
}) => {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<HideIcaData>()
  const {
    chain: { chain_id: sourceChainId },
  } = useActionOptions()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="body-text mb-3 max-w-prose text-text-secondary">
          {t('info.hideIcaDescription')}
        </p>

        {!isCreating ? (
          <>
            <InputLabel name={t('title.chain')} />

            <IbcDestinationChainPicker
              buttonClassName="self-start"
              disabled={!isCreating}
              includeSourceChain={false}
              onSelect={(chainId) => {
                // Type-check. None option is disabled so should not be
                // possible.
                if (!chainId) {
                  return
                }

                setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
              }}
              selectedChainId={chainId}
              sourceChainId={sourceChainId}
            />
          </>
        ) : (
          <>
            <InputLabel name={t('form.chainsCurrentlyRegistered')} />

            <RadioInput
              fieldName={(fieldNamePrefix + 'chainId') as 'chainId'}
              options={currentlyEnabled.map((registeredChainId) => ({
                value: registeredChainId,
                display: <ChainLabel chainId={registeredChainId} />,
              }))}
              setValue={setValue}
              watch={watch}
            />
          </>
        )}

        <InputErrorMessage error={errors?.address} />
      </div>
    </>
  )
}
