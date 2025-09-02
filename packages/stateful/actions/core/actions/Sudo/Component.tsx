import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  CodeMirrorInput,
  ErrorPage,
  InputErrorMessage,
  InputLabel,
  StatusCard,
  useActionOptions,
  useChain,
} from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getChainAddressForActionOptions,
  isValidBech32Address,
  makeValidateAddress,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

export type SudoOptions = {
  admin: LoadingDataWithError<string | null>
}

export type SudoData = {
  chainId: string
  contract: string
  msg: string
}

export const SudoContractComponent: ActionComponent<SudoOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { admin },
}) => {
  const { t } = useTranslation()
  const options = useActionOptions()
  const { chainId, bech32Prefix } = useChain()
  const { register, control } = useFormContext()

  const address = getChainAddressForActionOptions(options, chainId)

  return (
    <>
      <div className="flex grow flex-col gap-1">
        <InputLabel name={t('form.smartContractAddress')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.contract}
          fieldName={fieldNamePrefix + 'contract'}
          register={register}
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.contract} />
      </div>

      {isCreating &&
        !!address &&
        !!isValidBech32Address(address, bech32Prefix) &&
        (admin.errored ? (
          <ErrorPage error={admin.error} />
        ) : (
          !admin.loading &&
          !admin.updating &&
          admin.data !== address && (
            <StatusCard
              content={t('info.daoNotAdminProposalNotExecutable')}
              style="warning"
            />
          )
        ))}

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.sudoMessage')} />
        <CodeMirrorInput
          control={control}
          error={errors?.msg}
          fieldName={fieldNamePrefix + 'msg'}
          readOnly={!isCreating}
          validation={[validateJSON]}
        />
        <InputErrorMessage error={errors?.msg} />
      </div>
    </>
  )
}
