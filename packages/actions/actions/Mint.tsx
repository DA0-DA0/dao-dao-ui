import { useWallet } from '@noahsaso/cosmodal/dist/components/WalletManagerContext'
import { useCallback, useMemo } from 'react'

import { useGovernanceTokenInfo } from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'
import {
  VotingModuleType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeExecutableMintMessage,
  makeMintMessage,
} from '@dao-dao/utils'

import {
  ActionCardLoader,
  MintComponent as StatelessMintComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface MintData {
  to: string
  amount: number
}

const useDefaults: UseDefaults<MintData> = (): MintData => {
  const { address } = useWallet()

  return {
    to: address ?? '',
    amount: 1,
  }
}

const useTransformToCosmos: UseTransformToCosmos<MintData> = (
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintData> = (
  msg: Record<string, any>,
  coreAddress: string
) => {
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddress)

  if (!governanceTokenAddress || !governanceTokenInfo) {
    throw new Error('Failed to load data.')
  }

  return useMemo(() => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      // Mint action only supports minting our own governance token. Let
      // custom action handle the rest of the mint messages for now.
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
  }, [governanceTokenAddress, governanceTokenInfo.decimals, msg])
}

const InnerMintComponent: ActionComponent = (props) => {
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

const Component: ActionComponent = (props) => (
  <SuspenseLoader fallback={<ActionCardLoader />}>
    <InnerMintComponent {...props} />
  </SuspenseLoader>
)

export const mintAction: Action<MintData> = {
  key: ActionKey.Mint,
  label: '🌿 Mint',
  description: 'Mint new governance tokens.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [VotingModuleType.Cw20StakedBalanceVoting],
}
