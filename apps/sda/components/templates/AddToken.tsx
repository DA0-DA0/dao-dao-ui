import { useEffect } from 'react'

import { constSelector, useRecoilValueLoadable } from 'recoil'

import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  AddTokenComponent as StatelessAddTokenComponent,
  TemplateComponent,
} from '@dao-dao/ui/components/templates'
import { useFormContext } from 'react-hook-form'

export const AddTokenComponent: TemplateComponent = (props) => {
  const { getLabel } = props

  const { watch, setError, clearErrors } = useFormContext()

  const tokenAddress = watch(getLabel('address'))
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? tokenInfoSelector({ contractAddress: tokenAddress, params: [] })
      : constSelector(undefined)
  )

  useEffect(() => {
    if (tokenInfoLoadable.state === 'hasError') {
      setError(getLabel('address'), {
        type: 'manual',
        message: 'Failed to get token info.',
      })
    } else {
      clearErrors(getLabel('address'))
    }
  }, [tokenInfoLoadable.state, setError, clearErrors, getLabel])

  return (
    <StatelessAddTokenComponent
      {...props}
      options={
        tokenInfoLoadable.state === 'loading'
          ? {
              loadingTokenInfo: true,
              tokenInfo: undefined,
            }
          : tokenInfoLoadable.state === 'hasValue' && tokenInfoLoadable.contents
          ? {
              loadingTokenInfo: false,
              tokenInfo: tokenInfoLoadable.contents,
            }
          : {
              loadingTokenInfo: null,
              tokenInfo: undefined,
            }
      }
    />
  )
}
