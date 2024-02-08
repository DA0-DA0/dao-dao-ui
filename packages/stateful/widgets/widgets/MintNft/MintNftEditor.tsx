import { Check, Close } from '@mui/icons-material'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAny,
} from 'recoil'

import { CommonNftSelectors, DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import {
  AddressInput,
  Button,
  CodeMirrorInput,
  FormattedJsonDisplay,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import { WidgetEditorProps } from '@dao-dao/types'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import {
  isValidBech32Address,
  makeValidateAddress,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../actions'
import { MintNftData } from './types'

export const MintNftEditor = ({
  fieldNamePrefix,
  isCreating,
  errors,
}: WidgetEditorProps<MintNftData>) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { watch, setValue, register, control } = useFormContext<MintNftData>()
  const tokenAddress = watch(
    (fieldNamePrefix + 'nftCollection') as 'nftCollection'
  )

  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress && isValidBech32Address(tokenAddress, bech32Prefix)
      ? CommonNftSelectors.contractInfoSelector({
          contractAddress: tokenAddress,
          chainId,
          params: [],
        })
      : constSelector(undefined)
  )

  const existingTokenAddresses = useRecoilValue(
    DaoCoreV2Selectors.allCw721CollectionsSelector({
      contractAddress: address,
      chainId,
    })
  )[chainId]?.collectionAddresses
  const existingTokenInfos = useRecoilValue(
    waitForAny(
      existingTokenAddresses?.map((token) =>
        CommonNftSelectors.contractInfoSelector({
          contractAddress: token,
          chainId,
          params: [],
        })
      ) ?? []
    )
  )
  const existingTokens = useMemo(
    () =>
      (existingTokenAddresses || []).flatMap((address, idx) =>
        existingTokenInfos[idx].state === 'hasValue' &&
        existingTokenInfos[idx].contents
          ? {
              address,
              info: existingTokenInfos[idx].contents as ContractInfoResponse,
            }
          : []
      ),
    [existingTokenAddresses, existingTokenInfos]
  )

  return (
    <>
      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          {isCreating && existingTokens.length > 0 && (
            <>
              <InputLabel name={t('form.existingTokens')} />
              <div className="mb-2 flex flex-row flex-wrap gap-1">
                {existingTokens.map(({ address, info }) => (
                  <Button
                    key={address}
                    center
                    disabled={!isCreating}
                    onClick={() =>
                      setValue(
                        (fieldNamePrefix + 'nftCollection') as 'nftCollection',
                        address
                      )
                    }
                    pressed={tokenAddress === address}
                    size="sm"
                    type="button"
                    variant="secondary"
                  >
                    ${info.symbol}
                  </Button>
                ))}
              </div>
            </>
          )}

          <InputLabel name={t('form.collectionAddress')} />
          <AddressInput
            disabled={!isCreating}
            error={errors?.nftCollection}
            fieldName={(fieldNamePrefix + 'nftCollection') as 'nftCollection'}
            register={register}
            type="contract"
            validation={[
              validateRequired,
              makeValidateAddress(bech32Prefix),
              // Invalidate field if not a valid token contract.
              () =>
                tokenInfoLoadable.state !== 'hasError' ||
                t('error.notCw721Address'),
            ]}
          />
          <InputErrorMessage error={errors?.nftCollection} />
        </div>

        <FormattedJsonDisplay
          jsonLoadable={tokenInfoLoadable}
          title={t('form.tokenInfo')}
        />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.descriptionOptional')} />
        <TextAreaInput
          disabled={!isCreating}
          error={errors?.description}
          fieldName={(fieldNamePrefix + 'description') as 'description'}
          register={register}
          rows={6}
        />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.minterContract')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.mint?.contract}
          fieldName={(fieldNamePrefix + 'mint.contract') as 'mint.contract'}
          register={register}
          type="contract"
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.mint?.contract} />
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.minterContractMessage')} />

        <CodeMirrorInput
          control={control}
          error={errors?.mint?.msg}
          fieldName={(fieldNamePrefix + 'mint.msg') as 'mint.msg'}
          readOnly={!isCreating}
          validation={[validateJSON]}
        />

        {errors?.mint?.msg?.message ? (
          <p className="flex items-center gap-1 text-sm text-text-interactive-error">
            <Close className="!h-5 !w-5" />{' '}
            <span>{errors.mint.msg.message}</span>
          </p>
        ) : (
          <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
            <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <InputLabel name={t('form.buttonLabel')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.mint?.buttonLabel}
          fieldName={
            (fieldNamePrefix + 'mint.buttonLabel') as 'mint.buttonLabel'
          }
          register={register}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.mint?.buttonLabel} />
      </div>
    </>
  )
}
