import { useCallback, useMemo } from 'react'

import { HerbEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  AdapterActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeExecutableMintMessage,
  makeMintMessage,
} from '@dao-dao/utils'

import { ProfileDisplay } from '../../../../../components'
import { useGovernanceTokenInfo } from '../../hooks'
import { MintComponent as StatelessMintComponent } from './MintComponent'

export interface MintData {
  to: string
  amount: number
}

const useTransformToCosmos: UseTransformToCosmos<MintData> = () => {
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo()

  return useCallback(
    (data: MintData) => {
      const amount = convertDenomToMicroDenomWithDecimals(
        data.amount,
        governanceTokenInfo.decimals
      )
      return makeExecutableMintMessage(
        makeMintMessage(amount.toString(), data.to),
        governanceTokenAddress
      )
    },
    [governanceTokenAddress, governanceTokenInfo.decimals]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintData> = (
  msg: Record<string, any>
) => {
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo()

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

const Component: ActionComponent = (props) => {
  const { governanceTokenInfo } = useGovernanceTokenInfo()

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govTokenSymbol: governanceTokenInfo.symbol ?? 'gov tokens',
        ProfileDisplay: ProfileDisplay,
      }}
    />
  )
}

export const makeMintAction: ActionMaker<MintData> = ({ t, address }) => {
  const useDefaults: UseDefaults<MintData> = () => ({
    to: address,
    amount: 1,
  })

  return {
    key: AdapterActionKey.Mint,
    Icon: HerbEmoji,
    label: t('title.mint'),
    description: t('info.mintActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
