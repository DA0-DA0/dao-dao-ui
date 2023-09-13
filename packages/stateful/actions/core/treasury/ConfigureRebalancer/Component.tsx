import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainPickerInput,
  InputLabel,
  NativeCoinSelector,
  useChain,
} from '@dao-dao/stateless'
import { ChainId, GenericTokenBalance, LoadingData } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { getNativeTokenForChainId } from '@dao-dao/utils'

export type ConfigureRebalancerData = {
  chainId: string
  tokens: {
    denom: string
    amount: number
  }[]
  pid: {
    kp: number
    ki: number
    kd: number
  }
}

export type ConfigureRebalancerOptions = {
  nativeBalances: LoadingData<GenericTokenBalance[]>
}

export const ConfigureRebalancerComponent: ActionComponent<
  ConfigureRebalancerOptions
> = ({ fieldNamePrefix, errors, isCreating, options: { nativeBalances } }) => {
  const { chain_id: chainId } = useChain()
  const allowedTokens =
    (chainId in REBALANCER_TOKEN_ALLOWLIST &&
      REBALANCER_TOKEN_ALLOWLIST[chainId as ChainId]) ||
    []
  const allowedTokenBalances = nativeBalances.loading
    ? []
    : nativeBalances.data.filter(({ token }) =>
        allowedTokens.includes(token.denomOrAddress)
      )

  const { t } = useTranslation()

  const { control } = useFormContext<ConfigureRebalancerData>()
  const {
    fields: tokensFields,
    append: appendToken,
    remove: removeToken,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'tokens') as 'tokens',
  })

  return (
    <>
      {isCreating && (
        <ChainPickerInput
          className="mb-4"
          fieldName={fieldNamePrefix + 'chainId'}
        />
      )}

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.tokens')} />

        <div className="flex flex-col gap-2">
          {tokensFields.map(({ id }, index) => (
            <NativeCoinSelector
              key={id}
              chainId={chainId}
              errors={errors?.tokens?.[index]}
              fieldNamePrefix={fieldNamePrefix + `tokens.${index}.`}
              isCreating={isCreating}
              onRemove={isCreating ? undefined : () => removeToken(index)}
              options={{
                nativeBalances: nativeBalances.loading
                  ? { loading: true }
                  : {
                      loading: false,
                      data: allowedTokenBalances,
                    },
              }}
            />
          ))}

          {isCreating ? (
            <Button
              className="self-start"
              onClick={() =>
                appendToken({
                  amount: 1,
                  denom:
                    allowedTokenBalances[0]?.token.denomOrAddress ||
                    getNativeTokenForChainId(chainId).denomOrAddress,
                })
              }
              variant="secondary"
            >
              {t('button.addToken')}
            </Button>
          ) : (
            tokensFields.length === 0 && (
              <p className="mt-1 mb-2 text-xs italic text-text-tertiary">
                {t('info.none')}
              </p>
            )
          )}
        </div>
      </div>
    </>
  )
}

const REBALANCER_TOKEN_ALLOWLIST: Partial<Record<ChainId, string[]>> = {
  [ChainId.NeutronMainnet]: [],
}
