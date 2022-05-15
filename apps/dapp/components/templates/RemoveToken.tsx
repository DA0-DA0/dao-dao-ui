import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { cw20TokenListSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  RemoveTokenComponent as StatelessRemoveTokenComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

import { useOrgInfoContext } from '../OrgPageWrapper'
import { SuspenseLoader } from '../SuspenseLoader'

const InnerRemoveTokenComponent: TemplateComponent = (props) => {
  const { getLabel } = props
  const { coreAddress } = useOrgInfoContext()

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
  }, [tokenInfoLoadable, setError, clearErrors, getLabel])

  const existingTokenAddresses =
    useRecoilValue(
      cw20TokenListSelector({ contractAddress: coreAddress, params: [{}] })
    ) ?? []
  const existingTokenInfos =
    useRecoilValue(
      waitForAll(
        existingTokenAddresses.map((token) =>
          tokenInfoSelector({ contractAddress: token, params: [] })
        )
      )
    ) ?? []
  const existingTokens = existingTokenAddresses
    .map((address, idx) => ({
      address,
      info: existingTokenInfos[idx],
    }))
    // If undefined token info response, ignore the token.
    .filter(({ info }) => !!info) as {
    address: string
    info: TokenInfoResponse
  }[]

  return (
    <StatelessRemoveTokenComponent
      {...props}
      options={{
        existingTokens,
        loadingTokenInfo: tokenInfoLoadable.state === 'loading',
        tokenInfo:
          tokenInfoLoadable.state === 'hasValue'
            ? tokenInfoLoadable.contents
            : undefined,
      }}
    />
  )
}

export const RemoveTokenComponent: TemplateComponent = (props) => (
  <SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerRemoveTokenComponent {...props} />
  </SuspenseLoader>
)
