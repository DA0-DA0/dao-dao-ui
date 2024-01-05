import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  ProposalVetoConfigurer,
  ThumbDownEmoji,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithVeto,
} from '@dao-dao/types'
import { InstantiateMsg as Cw1WhitelistInstantiateMsg } from '@dao-dao/types/contracts/Cw1Whitelist'
import {
  instantiateSmartContract,
  isValidBech32Address,
  processError,
} from '@dao-dao/utils'

import { useWallet } from '../../../hooks'
import { AddressInput } from '../../AddressInput'

const VetoInput = ({
  data: { veto },
  fieldNamePrefix,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
    config,
  } = useSupportedChainContext()

  const { address: walletAddress, getSigningCosmWasmClient } = useWallet()
  const { setValue, setError, clearErrors, trigger } =
    useFormContext<DaoCreationVotingConfigWithVeto>()

  const [creatingCw1WhitelistVetoers, setCreatingCw1WhitelistVetoers] =
    useState(false)
  const { enabled, addresses, cw1WhitelistAddress } = veto
  const createCw1WhitelistVetoers = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setCreatingCw1WhitelistVetoers(true)
    try {
      // Trigger veto address field validations.
      await trigger((fieldNamePrefix + 'veto.addresses') as 'veto.addresses', {
        shouldFocus: true,
      })

      if (cw1WhitelistAddress) {
        throw new Error(t('error.accountListAlreadySaved'))
      }
      if (addresses.length < 2) {
        throw new Error(t('error.enterAtLeastTwoAccounts'))
      }
      const admins = addresses.map(({ address }) => address)
      if (admins.some((admin) => !isValidBech32Address(admin, bech32Prefix))) {
        throw new Error(t('error.invalidAccount'))
      }

      const contractAddress = await instantiateSmartContract(
        await getSigningCosmWasmClient(),
        walletAddress,
        config.codeIds.Cw1Whitelist,
        'Cw1Whitelist',
        {
          admins,
          mutable: false,
        } as Cw1WhitelistInstantiateMsg
      )

      setValue(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
        contractAddress
      )

      toast.success(t('success.saved'))
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    } finally {
      setCreatingCw1WhitelistVetoers(false)
    }
  }

  // Prevent submission if the cw1-whitelist contract has not yet been created
  // and it needs to be.
  const vetoAddressesLength = addresses.length
  useEffect(() => {
    if (vetoAddressesLength > 1 && !cw1WhitelistAddress) {
      setError(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
        {
          type: 'manual',
          message: t('error.accountListNeedsSaving'),
        }
      )
    } else {
      clearErrors(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress'
      )
    }
  }, [
    setError,
    clearErrors,
    t,
    vetoAddressesLength,
    cw1WhitelistAddress,
    fieldNamePrefix,
  ])

  return (
    <div className="flex flex-col gap-3">
      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'veto.enabled') as 'veto.enabled'}
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <ProposalVetoConfigurer
          AddressInput={AddressInput}
          className="flex flex-col gap-3"
          createCw1WhitelistVetoers={createCw1WhitelistVetoers}
          creatingCw1WhitelistVetoers={creatingCw1WhitelistVetoers}
          errors={errors?.veto}
          fieldNamePrefix="veto."
          veto={veto}
        />
      )}
    </div>
  )
}

const VetoReview = ({
  data: {
    veto: { enabled },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  return <>{enabled ? t('info.enabled') : t('info.disabled')}</>
}

export const makeVetoVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithVeto> => ({
    Icon: ThumbDownEmoji,
    nameI18nKey: 'title.veto',
    descriptionI18nKey: 'info.vetoDescription',
    Input: VetoInput,
    getInputError: ({
      veto: { timelockDuration } = {
        timelockDuration: undefined,
      },
    } = {}) => timelockDuration?.value || timelockDuration?.units,
    Review: VetoReview,
    getReviewClassName: ({ veto: { enabled } }) =>
      enabled ? 'bg-component-badge-valid' : 'bg-component-badge-error',
  })
