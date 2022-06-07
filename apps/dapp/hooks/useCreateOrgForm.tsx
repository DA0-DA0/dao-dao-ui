import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FieldValues,
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { useWallet } from '@dao-dao/state'
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
import { useInstantiate } from '@dao-dao/state/hooks/cw-core'
import {
  cleanChainError,
  convertDenomToMicroDenomWithDecimals,
  CW20STAKEDBALANCEVOTING_CODE_ID,
  CW20_CODE_ID,
  CW4GROUP_CODE_ID,
  CW4VOTING_CODE_ID,
  CWCORE_CODE_ID,
  CWPROPOSALSINGLE_CODE_ID,
  STAKECW20_CODE_ID,
  validateCw20StakedBalanceVotingInstantiateMsg,
  validateCw4VotingInstantiateMsg,
  validateCwProposalSingleInstantiateMsg,
} from '@dao-dao/utils'

import {
  convertDurationWithUnitsToDuration,
  convertThresholdValueToPercentageThreshold,
  GovernanceTokenType,
  NewOrg,
  newOrgAtom,
  NewOrgStructure,
  NEW_ORG_CW20_DECIMALS,
} from '@/atoms/newOrg'
import { pinnedAddressesAtom } from '@/atoms/pinned'

export type ValidateOrgFormPage = (
  newOrg: NewOrg,
  errors: FormState<NewOrg>['errors'],
  clearErrors: UseFormClearErrors<NewOrg>,
  setError?: UseFormSetError<NewOrg>
) => boolean

export interface OrgFormPage {
  href: string
  title: string
  subtitle?: string
  validate?: ValidateOrgFormPage
}

export enum CreateOrgSubmitLabel {
  Back = 'Back',
  Continue = 'Continue',
  Review = 'Review',
  CreateOrg = 'Create Org',
}

export const useCreateOrgForm = (pageIndex: number) => {
  const router = useRouter()
  const { connected, address: walletAddress, refreshBalances } = useWallet()

  const currentPage = useMemo(() => createOrgFormPages[pageIndex], [pageIndex])
  const [newOrg, setNewOrg] = useRecoilState(newOrgAtom)
  const setPinnedAddresses = useSetRecoilState(pinnedAddressesAtom)
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
  } = useForm({ defaultValues: newOrg })

  const watchedNewOrg = watch()

  const invalidPages = createOrgFormPages.map(
    ({ validate }) =>
      // Don't pass setError because we don't want to set new errors. Only
      // update existing or clear them if fields become valid.
      // Invalid fields error on submit attempt.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      !(validate?.(watchedNewOrg, errors, clearErrors) ?? true)
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
      router.push(createOrgFormPages[firstInvalidPageIndex].href)
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

  const instantiate = useInstantiate({
    codeId: CWCORE_CODE_ID,
    sender: walletAddress ?? '',
  })

  const onSubmit: SubmitHandler<NewOrg> = useCallback(
    async (values, event) => {
      // If navigating, no need to display errors.
      clearErrors()

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Create the org.
      if (submitterValue === CreateOrgSubmitLabel.CreateOrg) {
        if (connected) {
          setCreating(true)
          try {
            const address = await createOrg(instantiate, values)
            if (address) {
              // TODO: Figure out better solution for detecting block.
              // New wallet balances will not appear until the next block.
              await new Promise((resolve) => setTimeout(resolve, 6500))

              refreshBalances()
              setPinnedAddresses((pinned) => [...pinned, address])

              router.push(`/org/${address}`)
              toast.success('Org created.')
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
          toast.error('Connect a wallet to create an org.')
        }

        return
      }

      // Save values to state.
      setNewOrg((prevNewOrg) => ({
        ...prevNewOrg,
        ...values,
      }))

      // Navigate pages.
      const pageDelta = parseSubmitterValueDelta(submitterValue)
      router.push(
        createOrgFormPages[
          Math.min(
            Math.max(0, pageIndex + pageDelta),
            createOrgFormPages.length - 1
          )
        ].href
      )
    },
    [
      clearErrors,
      setNewOrg,
      router,
      pageIndex,
      connected,
      instantiate,
      refreshBalances,
      setPinnedAddresses,
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
        watchedNewOrg,
        errors,
        clearErrors,
        // On back press, don't set new errors.
        pageDelta < 0 ? undefined : setError
      )

      return _handleSubmit(...args)
    },
    [currentPage, watchedNewOrg, errors, clearErrors, setError, _handleSubmit]
  )

  return {
    watchedNewOrg,
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

export const createOrgFormPages: OrgFormPage[] = [
  {
    href: '/org/create',
    title: 'Choose a structure',
    validate: ({ structure }) => structure !== undefined,
  },
  {
    href: '/org/create/describe',
    title: 'Describe the organization',
    validate: ({ name }) => name.trim().length > 0,
  },
  {
    href: '/org/create/voting',
    title: 'Configure voting distribution',
    subtitle:
      'This will determine how much voting share different members of the org have when they vote on proposals.',
    // Validate group weights and member proportions add up to 100%.
    validate: ({ groups }, errors, clearErrors, setError) => {
      let valid = true

      const totalWeight =
        groups.reduce(
          (acc, { weight, members }) => acc + weight * members.length,
          0
        ) || 0
      // Ensure voting power has been given to at least one member.
      if (totalWeight === 0) {
        setError?.('_groupsError', {
          message:
            'You have not given anyone voting power. Add some members to your org.',
        })
        valid = false
      } else if (errors?._groupsError) {
        clearErrors('_groupsError')
      }

      groups.forEach((group, groupIndex) => {
        if (group.members.length === 0) {
          setError?.(`groups.${groupIndex}._error`, {
            message: 'No members have been added.',
          })
          valid = false
        } else if (errors?.groups?.[groupIndex]?._error) {
          clearErrors(`groups.${groupIndex}._error`)
        }
      })

      return valid
    },
  },
  {
    href: '/org/create/review',
    title: 'Review and submit',
  },
]

const parseSubmitterValueDelta = (value: string): number => {
  switch (value) {
    case CreateOrgSubmitLabel.Back:
      return -1
    case CreateOrgSubmitLabel.Continue:
    case CreateOrgSubmitLabel.Review:
      return 1
    default:
      // Pass a number to step that many pages in either direction.
      const valueNumber = parseInt(value || '1', 10)
      if (!isNaN(valueNumber) && valueNumber !== 0) return valueNumber

      return 0
  }
}

const createOrg = async (
  instantiate: ReturnType<typeof useInstantiate>,
  values: NewOrg
) => {
  const {
    structure,
    name,
    description,
    imageUrl,
    groups,
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

  const governanceTokenEnabled = structure === NewOrgStructure.UsingGovToken

  let votingModuleInstantiateMsg
  if (governanceTokenEnabled) {
    let tokenInfo: Cw20StakedBalanceVotingInstantiateMsg['token_info']
    if (governanceTokenOptions.type === GovernanceTokenType.New) {
      if (!newInfo) {
        throw new Error('New governance token info not provided.')
      }

      const { initialTreasuryBalance, imageUrl, symbol, name } = newInfo

      const microInitialBalances: Cw20Coin[] = groups.flatMap(
        ({ weight, members }) =>
          members.map(({ address }) => ({
            address,
            amount: convertDenomToMicroDenomWithDecimals(
              weight,
              NEW_ORG_CW20_DECIMALS
            ),
          }))
      )
      const microInitialTreasuryBalance = convertDenomToMicroDenomWithDecimals(
        initialTreasuryBalance,
        NEW_ORG_CW20_DECIMALS
      )

      tokenInfo = {
        new: {
          code_id: CW20_CODE_ID,
          decimals: NEW_ORG_CW20_DECIMALS,
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
        throw new Error('Existing governance token address not provided.')
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
    const initialMembers: Member[] = groups.flatMap(({ weight, members }) =>
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
        label: `org_${name}_cw-proposal-single`,
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
        ? `org_${name}_cw20-staked-balance-voting`
        : `org_${name}_cw4-voting`,
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
