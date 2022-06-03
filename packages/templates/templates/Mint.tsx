import { useCallback } from 'react'

import { useGovernanceTokenInfo } from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeExecutableMintMessage,
  makeMintMessage,
} from '@dao-dao/utils'

import {
  GetDefaultsProps,
  MintComponent as StatelessMintComponent,
  TemplateComponent,
  TemplateComponentLoader,
  UseDecodeCosmosMsg,
  UseTransformToCosmos,
} from '../components'

export interface MintData {
  to: string
  amount: number
}

export const mintDefaults = ({
  walletAddress,
}: GetDefaultsProps): MintData => ({
  to: walletAddress,
  amount: 1,
})

const InnerMintComponent: TemplateComponent = (props) => {
  const { governanceTokenInfo } = useGovernanceTokenInfo(props.coreAddress)

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govTokenSymbol: governanceTokenInfo?.symbol ?? 'gov tokens',
      }}
    />
  )
}

export const MintComponent: TemplateComponent = (props) => (
  <SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerMintComponent {...props} />
  </SuspenseLoader>
)

export const useTransformMintToCosmos: UseTransformToCosmos<MintData> = (
  coreAddress: string
) => {
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddress)

  if (!governanceTokenAddress || !governanceTokenInfo) {
    throw new Error('Failed to load data.')
  }

  return useCallback(
    (data: MintData) => {
      const amount = convertDenomToMicroDenomWithDecimals(
        data.amount,
        governanceTokenInfo.decimals
      )
      return makeExecutableMintMessage(
        makeMintMessage(amount, data.to),
        governanceTokenAddress
      )
    },
    [governanceTokenAddress, governanceTokenInfo.decimals]
  )
}

export const useDecodeMintCosmosMsg: UseDecodeCosmosMsg<MintData> = (
  msg: Record<string, any>,
  coreAddress: string
) => {
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddress)

  if (!governanceTokenAddress || !governanceTokenInfo) {
    throw new Error('Failed to load data.')
  }

  if (
    'wasm' in msg &&
    'execute' in msg.wasm &&
    'contract_addr' in msg.wasm.execute &&
    // Mint template only supports minting our own governance token. Let
    // custom template handle the rest of the mint messages for now.
    msg.wasm.execute.contract_addr === governanceTokenAddress &&
    'mint' in msg.wasm.execute.msg &&
    'amount' in msg.wasm.execute.msg.mint &&
    'recipient' in msg.wasm.execute.msg.mint
  ) {
    return {
      match: true,
      data: {
        to: msg.wasm.execute.msg.mint.recipient,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.wasm.execute.msg.mint.amount,
          governanceTokenInfo.decimals
        ),
      },
    }
  }

  return { match: false }
}
