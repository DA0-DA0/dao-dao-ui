import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FieldValues,
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormClearErrors,
  UseFormSetError,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'

import i18n from '@dao-dao/i18n'
import { CwCoreHooks, useWallet } from '@dao-dao/state'
import { InstantiateMsg as CwCoreInstantiateMsg } from '@dao-dao/state/clients/cw-core'
import { InstantiateMsg as CwProposalSingleInstantiateMsg } from '@dao-dao/state/clients/cw-proposal-single'
import {
  Cw20Coin,
  InstantiateMsg as Cw20StakedBalanceVotingInstantiateMsg,
} from '@dao-dao/state/clients/cw20-staked-balance-voting'
import {
  InstantiateMsg as Cw4VotingInstantiateMsg,
  Member,
} from '@dao-dao/state/clients/cw4-voting'
import {
  CW20STAKEDBALANCEVOTING_CODE_ID,
  CW20_CODE_ID,
  CW4GROUP_CODE_ID,
  CW4VOTING_CODE_ID,
  CWCORE_CODE_ID,
  CWPROPOSALSINGLE_CODE_ID,
  STAKECW20_CODE_ID,
  cleanChainError,
  convertDenomToMicroDenomWithDecimals,
  validateCw20StakedBalanceVotingInstantiateMsg,
  validateCw4VotingInstantiateMsg,
  validateCwProposalSingleInstantiateMsg,
} from '@dao-dao/utils'

import { usePinnedDAOs } from './usePinnedDAOs'
import {
  GovernanceTokenType,
  NEW_DAO_CW20_DECIMALS,
  NewDAO,
  NewDAOStructure,
  convertDurationWithUnitsToDuration,
  convertThresholdValueToPercentageThreshold,
  newDAOAtom,
} from '@/atoms'

export type ValidateDAOFormPage = (
  newDAO: NewDAO,
  errors: FormState<NewDAO>['errors'],
  clearErrors: UseFormClearErrors<NewDAO>,
  setError?: UseFormSetError<NewDAO>
) => boolean

export interface DAOFormPage {
  href: string
  title: string
  subtitle?: string
  validate?: ValidateDAOFormPage
}

export enum CreateDAOSubmitLabel {
  Back = 'Back',
  Continue = 'Continue',
  Review = 'Review',
  CreateDAO = 'Create DAO',
}

export const useCreateDAOForm = (pageIndex: number) => {
  const router = useRouter()
  const { connected, address: walletAddress, refreshBalances } = useWallet()

  const currentPage = useMemo(() => createDAOFormPages[pageIndex], [pageIndex])
  const [newDAO, setNewDAO] = useRecoilState(newDAOAtom)
  const { setPinned } = usePinnedDAOs()
  const [creating, setCreating] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    watch,
    control,
    setValue,
    resetField,
    setError,
    clearErrors,
  } = useForm({ defaultValues: newDAO })

  const watchedNewDAO = watch()

  const invalidPages = createDAOFormPages.map(
    ({ validate }) =>
      // Don't pass setError because we don't want to set new errors. Only
      // update existing or clear them if fields become valid.
      // Invalid fields error on submit attempt.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      !(validate?.(watchedNewDAO, errors, clearErrors) ?? true)
  )

  // Ensure previous pages are valid and navigate back if not.
  useEffect(() => {
    if (!router.isReady) return

    const firstInvalidPageIndex = invalidPages.findIndex(Boolean)
    if (
      // If no index found, no invalid page.
      firstInvalidPageIndex > -1 &&
      firstInvalidPageIndex < pageIndex
    ) {
      router.push(createDAOFormPages[firstInvalidPageIndex].href)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    router,
    pageIndex,
    // Stringify invalid booleans to prevent unnecessary refresh since
    // invalidPages gets a new reference on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    invalidPages.map(String).join(),
  ])

  const instantiate = CwCoreHooks.useInstantiate({
    codeId: CWCORE_CODE_ID,
    sender: walletAddress ?? '',
  })

  const onSubmit: SubmitHandler<NewDAO> = useCallback(
    async (values, event) => {
      // If navigating, no need to display errors.
      clearErrors()

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Create the DAO.
      if (submitterValue === i18n.t(CreateDAOSubmitLabel.CreateDAO)) {
        if (connected) {
          setCreating(true)
          try {
            const address = await createDAO(instantiate, values)
            if (address) {
              // TODO: Figure out better solution for detecting block.
              // New wallet balances will not appear until the next block.
              await new Promise((resolve) => setTimeout(resolve, 6500))

              refreshBalances()
              setPinned(address)

              router.push(`/dao/${address}`)
              toast.success('DAO created.')
              // Don't stop creating loading on success since we're
              // navigating, and it's weird when loading stops and
              // nothing happens for a sec.
            }
          } catch (err) {
            console.error(err)
            toast.error(
              cleanChainError(err instanceof Error ? err.message : `${err}`)
            )

            setCreating(false)
          }
        } else {
          toast.error('Connect a wallet to create a DAO.')
        }

        return
      }

      // Save values to state.
      setNewDAO((prevNewDAO) => ({
        ...prevNewDAO,
        ...values,
      }))

      // Navigate pages.
      const pageDelta = parseSubmitterValueDelta(submitterValue)
      router.push(
        createDAOFormPages[
          Math.min(
            Math.max(0, pageIndex + pageDelta),
            createDAOFormPages.length - 1
          )
        ].href
      )
    },
    [
      clearErrors,
      setNewDAO,
      router,
      pageIndex,
      connected,
      instantiate,
      refreshBalances,
      setPinned,
    ]
  )

  const onError: SubmitErrorHandler<FieldValues> = useCallback(
    (_, event) => {
      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Allow backwards navigation without valid fields.
      const pageDelta = parseSubmitterValueDelta(submitterValue)
      if (pageDelta < 0) {
        return onSubmit(getValues(), event)
      }
    },
    [getValues, onSubmit]
  )

  const _handleSubmit = useMemo(
    () => handleSubmit(onSubmit, onError),
    [handleSubmit, onSubmit, onError]
  )

  const formOnSubmit = useCallback(
    (...args: Parameters<typeof _handleSubmit>) => {
      const nativeEvent = args[0]?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value
      const pageDelta = parseSubmitterValueDelta(submitterValue)

      // Validate here instead of in onSubmit since custom errors prevent
      // form submission, and we still want to be able to move backwards.
      currentPage.validate?.(
        watchedNewDAO,
        errors,
        clearErrors,
        // On back press, don't set new errors.
        pageDelta < 0 ? undefined : setError
      )

      return _handleSubmit(...args)
    },
    [currentPage, watchedNewDAO, errors, clearErrors, setError, _handleSubmit]
  )

  return {
    watchedNewDAO,
    errors,
    register,
    getValues,
    watch,
    control,
    setValue,
    resetField,
    setError,
    clearErrors,
    creating,
    formWrapperProps: {
      onSubmit: formOnSubmit,
      currentPageIndex: pageIndex,
      currentPage,
      creating,
    },
  }
}

export const createDAOFormPages: DAOFormPage[] = [
  {
    href: '/dao/create',
    title: i18n.t('Describe the DAO'),
    validate: ({ name, structure }) =>
      name.trim().length > 0 && structure !== undefined,
  },
  {
    href: '/dao/create/voting',
    title: i18n.t('Configure voting'),
    subtitle: i18n.t('Configure voting description'),
    validate: ({ tiers }, errors, clearErrors, setError) => {
      let valid = true

      const totalWeight =
        tiers.reduce(
          (acc, { weight, members }) => acc + weight * members.length,
          0
        ) || 0
      // Ensure voting power has been given to at least one member.
      if (totalWeight === 0) {
        setError?.('_tiersError', {
          message: i18n.t('errors.noVotingPower'),
        })
        valid = false
      } else if (errors?._tiersError) {
        clearErrors('_tiersError')
      }

      tiers.forEach((tier, tierIndex) => {
        if (tier.members.length === 0) {
          setError?.(`tiers.${tierIndex}._error`, {
            message: i18n.t('errors.noMembers'),
          })
          valid = false
        } else if (errors?.tiers?.[tierIndex]?._error) {
          clearErrors(`tiers.${tierIndex}._error`)
        }
      })

      return valid
    },
  },
  {
    href: '/dao/create/review',
    title: i18n.t('Review and submit'),
  },
]

const parseSubmitterValueDelta = (value: string): number => {
  switch (value) {
    case i18n.t(CreateDAOSubmitLabel.Back):
      return -1
    case i18n.t(CreateDAOSubmitLabel.Continue):
    case i18n.t(CreateDAOSubmitLabel.Review):
      return 1
    default:
      // Pass a number to step that many pages in either direction.
      const valueNumber = parseInt(value || '1', 10)
      if (!isNaN(valueNumber) && valueNumber !== 0) return valueNumber

      return 0
  }
}

const createDAO = async (
  instantiate: ReturnType<typeof CwCoreHooks['useInstantiate']>,
  values: NewDAO
) => {
  const {
    structure,
    name,
    description,
    imageUrl,
    tiers,
    votingDuration,
    governanceTokenOptions: {
      unregisterDuration,
      newInfo,
      existingGovernanceTokenAddress,
      proposalDeposit,
      ...governanceTokenOptions
    },
    thresholdQuorum: { threshold, quorum },
  } = values

  const governanceTokenEnabled = structure === NewDAOStructure.GovernanceToken

  let votingModuleInstantiateMsg
  if (governanceTokenEnabled) {
    let tokenInfo: Cw20StakedBalanceVotingInstantiateMsg['token_info']
    if (governanceTokenOptions.type === GovernanceTokenType.New) {
      if (!newInfo) {
        throw new Error(i18n.t('errors.noGovTokenInfo'))
      }

      const { initialTreasuryBalance, imageUrl, symbol, name } = newInfo

      const microInitialBalances: Cw20Coin[] = tiers.flatMap(
        ({ weight, members }) =>
          members.map(({ address }) => ({
            address,
            amount: convertDenomToMicroDenomWithDecimals(
              weight,
              NEW_DAO_CW20_DECIMALS
            ),
          }))
      )
      const microInitialTreasuryBalance = convertDenomToMicroDenomWithDecimals(
        initialTreasuryBalance,
        NEW_DAO_CW20_DECIMALS
      )

      tokenInfo = {
        new: {
          code_id: CW20_CODE_ID,
          decimals: NEW_DAO_CW20_DECIMALS,
          initial_balances: microInitialBalances,
          initial_dao_balance: microInitialTreasuryBalance,
          label: name,
          marketing: imageUrl ? { logo: { url: imageUrl } } : null,
          name,
          staking_code_id: STAKECW20_CODE_ID,
          symbol,
          unstaking_duration:
            convertDurationWithUnitsToDuration(unregisterDuration),
        },
      }
    } else {
      if (!existingGovernanceTokenAddress) {
        throw new Error(i18n.t('errors.noGovTokenAddr'))
      }

      tokenInfo = {
        existing: {
          address: existingGovernanceTokenAddress,
          staking_contract: {
            new: {
              staking_code_id: STAKECW20_CODE_ID,
              unstaking_duration:
                convertDurationWithUnitsToDuration(unregisterDuration),
            },
          },
        },
      }
    }

    const cw20StakedBalanceVotingInstantiateMsg: Cw20StakedBalanceVotingInstantiateMsg =
      { token_info: tokenInfo }

    validateCw20StakedBalanceVotingInstantiateMsg(
      cw20StakedBalanceVotingInstantiateMsg
    )
    votingModuleInstantiateMsg = cw20StakedBalanceVotingInstantiateMsg
  } else {
    const initialMembers: Member[] = tiers.flatMap(({ weight, members }) =>
      members.map(({ address }) => ({
        addr: address,
        weight,
      }))
    )

    const cw4VotingInstantiateMsg: Cw4VotingInstantiateMsg = {
      cw4_group_code_id: CW4GROUP_CODE_ID,
      initial_members: initialMembers,
    }

    validateCw4VotingInstantiateMsg(cw4VotingInstantiateMsg)
    votingModuleInstantiateMsg = cw4VotingInstantiateMsg
  }

  const cwProposalSingleModuleInstantiateMsg: CwProposalSingleInstantiateMsg = {
    allow_revoting: false,
    deposit_info:
      governanceTokenEnabled &&
      typeof proposalDeposit?.value === 'number' &&
      proposalDeposit.value > 0
        ? {
            deposit: proposalDeposit.value.toString(),
            refund_failed_proposals: proposalDeposit.refundFailed,
            token: { voting_module_token: {} },
          }
        : null,
    max_voting_period: convertDurationWithUnitsToDuration(votingDuration),
    only_members_execute: true,
    threshold: {
      threshold_quorum: {
        quorum: convertThresholdValueToPercentageThreshold(quorum),
        threshold: convertThresholdValueToPercentageThreshold(threshold),
      },
    },
  }
  validateCwProposalSingleInstantiateMsg(cwProposalSingleModuleInstantiateMsg)

  const cwCoreInstantiateMsg: CwCoreInstantiateMsg = {
    admin: null,
    automatically_add_cw20s: true,
    automatically_add_cw721s: true,
    description,
    image_url: imageUrl ?? null,
    name,
    proposal_modules_instantiate_info: [
      {
        admin: { core_contract: {} },
        code_id: CWPROPOSALSINGLE_CODE_ID,
        label: `DAO_${name}_cw-proposal-single`,
        msg: Buffer.from(
          JSON.stringify(cwProposalSingleModuleInstantiateMsg),
          'utf8'
        ).toString('base64'),
      },
    ],
    voting_module_instantiate_info: {
      admin: { core_contract: {} },
      code_id: governanceTokenEnabled
        ? CW20STAKEDBALANCEVOTING_CODE_ID
        : CW4VOTING_CODE_ID,
      label: governanceTokenEnabled
        ? `DAO_${name}_cw20-staked-balance-voting`
        : `DAO_${name}_cw4-voting`,
      msg: Buffer.from(
        JSON.stringify(votingModuleInstantiateMsg),
        'utf8'
      ).toString('base64'),
    },
  }

  const { contractAddress } = await instantiate(
    cwCoreInstantiateMsg,
    cwCoreInstantiateMsg.name
  )
  return contractAddress
}
