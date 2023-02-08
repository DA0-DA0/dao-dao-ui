import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { GearEmoji, useDaoInfo } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  AdapterActionKey,
  DepositRefundPolicy,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  ExecuteMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeSingle'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  isValidContractAddress,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useCw20CommonGovernanceTokenInfoIfExists } from '../../../../../../voting-module-adapter/react/hooks/useCw20CommonGovernanceTokenInfoIfExists'
import { configSelector } from '../../../contracts/DaoPreProposeSingle.recoil'
import {
  UpdatePreProposeConfigComponent,
  UpdatePreProposeConfigData,
} from './UpdatePreProposeConfigComponent'

export const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { bech32Prefix } = useDaoInfo()
  const cw20GovernanceTokenSymbol =
    useCw20CommonGovernanceTokenInfoIfExists()?.symbol

  const { fieldNamePrefix } = props

  const { setValue, watch } = useFormContext()

  const depositInfo: UpdatePreProposeConfigData['depositInfo'] = watch(
    fieldNamePrefix + 'depositInfo'
  )

  const tokenInfoLoadable = useRecoilValueLoadable(
    depositInfo.type === 'cw20' &&
      depositInfo.cw20Address &&
      isValidContractAddress(depositInfo.cw20Address, bech32Prefix)
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: depositInfo.cw20Address,
          params: [],
        })
      : constSelector(undefined)
  )

  // Update cw20 decimals and address error.
  const [additionalAddressError, setAdditionalAddressError] = useState<string>()
  useEffect(() => {
    // Update decimals in data for transforming to cosmos message.
    if (tokenInfoLoadable.state === 'hasValue') {
      setValue(
        fieldNamePrefix + 'depositInfo.cw20Decimals',
        tokenInfoLoadable.contents?.decimals ?? 0
      )
    }

    if (tokenInfoLoadable.state !== 'hasError') {
      if (additionalAddressError) {
        setAdditionalAddressError(undefined)
      }
      return
    }

    if (!additionalAddressError) {
      setAdditionalAddressError(t('error.notCw20Address'))
    }
  }, [fieldNamePrefix, setValue, tokenInfoLoadable, t, additionalAddressError])

  return (
    <UpdatePreProposeConfigComponent
      {...props}
      options={{
        cw20: {
          governanceTokenSymbol: cw20GovernanceTokenSymbol,
          additionalAddressError,
          formattedJsonDisplayProps: {
            title: t('form.tokenInfo'),
            jsonLoadable: tokenInfoLoadable,
          },
        },
      }}
    />
  )
}

export const makeUpdatePreProposeConfigAction: ActionMaker<
  UpdatePreProposeConfigData,
  { proposalModule: ProposalModule }
> = ({ t, proposalModule: { preProposeAddress } }) => {
  // Only when pre propose address present.
  if (!preProposeAddress) {
    return null
  }

  const useDefaults: UseDefaults<UpdatePreProposeConfigData> = () => {
    const { t } = useTranslation()
    if (!preProposeAddress) {
      throw new Error(t('error.loadingData'))
    }

    const {
      denomOrAddress: cw20GovernanceTokenAddress,
      decimals: cw20GovernanceTokenDecimals,
    } = useCw20CommonGovernanceTokenInfoIfExists() ?? {}

    const config = useRecoilValue(
      configSelector({
        contractAddress: preProposeAddress,
        params: [],
      })
    )

    // This is the token info for both the cw20 and voting_module_token deposit
    // type. The config response only contains `native` or `cw20`, as
    // `voting_module_token` is only passed in an execution. The contract
    // converts it to `cw20`.
    const cw20TokenInfo = useRecoilValue(
      config.deposit_info?.denom && 'cw20' in config.deposit_info.denom
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: config.deposit_info.denom.cw20,
            params: [],
          })
        : constSelector(undefined)
    )
    const cw20Decimals = cw20TokenInfo?.decimals ?? 0

    const depositRequired = !!config.deposit_info
    const depositInfo: UpdatePreProposeConfigData['depositInfo'] =
      config.deposit_info
        ? {
            amount: convertMicroDenomToDenomWithDecimals(
              config.deposit_info.amount,
              'native' in config.deposit_info.denom
                ? NATIVE_DECIMALS
                : cw20Decimals
            ),
            type:
              'native' in config.deposit_info.denom
                ? 'native'
                : cw20GovernanceTokenAddress &&
                  config.deposit_info.denom.cw20 === cw20GovernanceTokenAddress
                ? 'voting_module_token'
                : 'cw20',
            cw20Address:
              'cw20' in config.deposit_info.denom
                ? config.deposit_info.denom.cw20
                : cw20GovernanceTokenAddress ?? '',
            cw20Decimals,
            refundPolicy: config.deposit_info.refund_policy,
          }
        : {
            amount: Math.pow(10, NATIVE_DECIMALS),
            type: 'native',
            cw20Address: cw20GovernanceTokenAddress ?? '',
            cw20Decimals: cw20GovernanceTokenDecimals ?? 0,
            refundPolicy: DepositRefundPolicy.OnlyPassed,
          }

    return {
      depositRequired,
      depositInfo,
      anyoneCanPropose: config.open_proposal_submission,
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    UpdatePreProposeConfigData
  > = () => {
    const { t } = useTranslation()
    if (!preProposeAddress) {
      throw new Error(t('error.loadingData'))
    }

    const { decimals: cw20GovernanceTokenDecimals } =
      useCw20CommonGovernanceTokenInfoIfExists() ?? {}

    return useCallback(
      ({
        depositRequired,
        depositInfo,
        anyoneCanPropose,
      }: UpdatePreProposeConfigData) => {
        const updateConfigMessage: ExecuteMsg = {
          update_config: {
            deposit_info: depositRequired
              ? {
                  amount: convertDenomToMicroDenomWithDecimals(
                    depositInfo.amount,
                    depositInfo.type === 'native'
                      ? NATIVE_DECIMALS
                      : depositInfo.type === 'voting_module_token'
                      ? cw20GovernanceTokenDecimals ?? 0
                      : depositInfo.cw20Decimals
                  ).toString(),
                  denom:
                    depositInfo.type === 'voting_module_token'
                      ? {
                          voting_module_token: {},
                        }
                      : {
                          token: {
                            denom:
                              depositInfo.type === 'native'
                                ? {
                                    native: NATIVE_DENOM,
                                  }
                                : // depositInfo.type === 'cw20'
                                  {
                                    cw20: depositInfo.cw20Address,
                                  },
                          },
                        },
                  refund_policy: depositInfo.refundPolicy,
                }
              : null,
            open_proposal_submission: anyoneCanPropose,
          },
        }

        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: preProposeAddress,
              funds: [],
              msg: updateConfigMessage,
            },
          },
        })
      },
      [cw20GovernanceTokenDecimals]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdatePreProposeConfigData> = (
    msg: Record<string, any>
  ) => {
    const isUpdatePreProposeConfig = objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            update_config: {
              deposit_info: {},
              open_proposal_submission: {},
            },
          },
        },
      },
    })

    const configDepositInfo = msg.wasm?.execute?.msg?.update_config
      ?.deposit_info as UncheckedDepositInfo | null | undefined

    // Get explicitly-set CW20 token address.
    let cw20TokenAddress: string | undefined
    if (isUpdatePreProposeConfig && configDepositInfo) {
      cw20TokenAddress =
        'token' in configDepositInfo.denom &&
        'cw20' in configDepositInfo.denom.token.denom
          ? configDepositInfo.denom.token.denom.cw20
          : undefined
    }

    const cw20TokenInfo = useRecoilValue(
      cw20TokenAddress
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: cw20TokenAddress,
            params: [],
          })
        : constSelector(undefined)
    )

    const {
      denomOrAddress: cw20GovernanceTokenAddress,
      decimals: cw20GovernanceTokenDecimals,
    } = useCw20CommonGovernanceTokenInfoIfExists() ?? {}

    if (!isUpdatePreProposeConfig) {
      return { match: false }
    }

    const anyoneCanPropose =
      !!msg.wasm.execute.msg.update_config.open_proposal_submission

    if (!configDepositInfo) {
      return {
        data: {
          depositRequired: false,
          depositInfo: {
            amount: Math.pow(10, NATIVE_DECIMALS),
            type: 'native',
            cw20Address: cw20GovernanceTokenAddress ?? '',
            cw20Decimals: cw20GovernanceTokenDecimals ?? 0,
            refundPolicy: DepositRefundPolicy.OnlyPassed,
          },
          anyoneCanPropose,
        },
        match: true,
      }
    }

    const type: UpdatePreProposeConfigData['depositInfo']['type'] =
      'voting_module_token' in configDepositInfo.denom
        ? 'voting_module_token'
        : cw20TokenAddress
        ? 'cw20'
        : 'native'

    const cw20Address =
      type === 'voting_module_token'
        ? cw20GovernanceTokenAddress ?? ''
        : cw20TokenAddress ?? ''
    const cw20Decimals =
      type === 'voting_module_token'
        ? cw20GovernanceTokenDecimals ?? 0
        : cw20TokenInfo?.decimals ?? 0

    const depositInfo: UpdatePreProposeConfigData['depositInfo'] = {
      amount: convertMicroDenomToDenomWithDecimals(
        configDepositInfo.amount,
        type === 'native' ? NATIVE_DECIMALS : cw20Decimals
      ),
      type,
      cw20Address,
      cw20Decimals,
      refundPolicy: configDepositInfo.refund_policy,
    }

    return {
      data: {
        depositRequired: true,
        depositInfo,
        anyoneCanPropose,
      },
      match: true,
    }
  }

  return {
    key: AdapterActionKey.UpdatePreProposeConfig,
    Icon: GearEmoji,
    label: t('form.updateProposalSubmissionConfigTitle'),
    description: t('info.updateProposalSubmissionConfigActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
