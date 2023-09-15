import { Check, Close } from '@mui/icons-material'
import JSON5 from 'json5'
import { ComponentType, useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { v4 as uuidv4 } from 'uuid'

import { CommunityPoolSpendProposal } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import { MsgCommunityPoolSpend } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { Cosmos_govv1beta1Content_FromAmino } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { ParameterChangeProposal } from '@dao-dao/protobuf/codegen/cosmos/params/v1beta1/params'
import { SoftwareUpgradeProposal } from '@dao-dao/protobuf/codegen/cosmos/upgrade/v1beta1/upgrade'
import {
  Button,
  CodeMirrorInput,
  GovernanceProposal,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NestedActionsEditor,
  NestedActionsEditorOptions,
  SelectInput,
  TextAreaInput,
  TextInput,
  TokenInput,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GOVERNANCE_PROPOSAL_TYPES,
  GOVERNANCE_PROPOSAL_TYPE_CUSTOM,
  GenericToken,
  GenericTokenBalance,
  GovProposalActionDisplayProps,
  GovernanceProposalActionData,
  LoadingData,
  StatefulTokenAmountDisplayProps,
} from '@dao-dao/types'
import {
  ActionCategoryKey,
  ActionComponent,
  ActionKey,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types/actions'
import {
  convertMicroDenomToDenomWithDecimals,
  getChainAssets,
  getFundsUsedInCwMessage,
  govProposalActionDataToDecodedContent,
  isCosmWasmStargateMsg,
  makeValidateAddress,
  processError,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

import { CommunityPoolTransferData } from '../../treasury/CommunityPoolTransfer/Component'

export type GovernanceProposalOptions = {
  govModuleAddress: string
  minDeposits: LoadingData<GenericTokenBalance[]>
  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
  AddressInput: ComponentType<AddressInputProps<GovernanceProposalActionData>>
  GovProposalActionDisplay: ComponentType<GovProposalActionDisplayProps>
} & NestedActionsEditorOptions

export const GovernanceProposalComponent: ActionComponent<
  GovernanceProposalOptions,
  GovernanceProposalActionData
> = (props) => {
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: {
      govModuleAddress,
      minDeposits,
      GovProposalActionDisplay,
      TokenAmountDisplay,
      AddressInput,
    },
    data,
  } = props

  const { t } = useTranslation()
  const { register, setValue, watch, control, clearErrors, setError } =
    useFormContext<GovernanceProposalActionData>()

  const {
    chainId,
    chain: { bech32_prefix: bech32Prefix },
    config: { supportsV1GovProposals },
    nativeToken,
  } = useSupportedChainContext()

  const selectedMinDepositToken = minDeposits.loading
    ? undefined
    : minDeposits.data.find(
        ({ token }) => token.denomOrAddress === data.deposit[0].denom
      )

  const {
    fields: spendFields,
    append: appendSpend,
    remove: removeSpend,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'legacy.spends') as 'legacy.spends',
  })

  const availableTokens: GenericToken[] = [
    // First native.
    nativeToken,
    // Then the chain assets.
    ...getChainAssets(chainId).filter(
      ({ denomOrAddress }) => denomOrAddress !== nativeToken.denomOrAddress
    ),
  ]

  // V1 props need metadata uploaded to IPFS.
  const [metadataUploaded, setMetadataUploaded] = useState(false)
  const [uploadingMetadata, setUploadingMetadata] = useState(false)
  const title = watch((fieldNamePrefix + 'title') as 'title')
  const description = watch((fieldNamePrefix + 'description') as 'description')
  // If any of these fields change, we need to re-upload the metadata.
  useEffect(() => {
    setMetadataUploaded(false)
  }, [title, description])
  const uploadMetadata = async () => {
    setUploadingMetadata(true)
    try {
      let cid = ''
      try {
        // Next.js API route.
        const response = await fetch('/api/uploadJson', {
          method: 'POST',
          body: JSON.stringify({
            title,
            description,
            summary: description,
            details: description,
            // "proposal_forum_url": "http://urlform.com",
            // "vote_option_context": "yes, no, no with veto, abstain"
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        cid = (await response.json()).cid
      } catch (err) {
        console.error(err)
        toast.error(processError(err, { forceCapture: false }))
        return
      }

      if (!cid) {
        toast.error(t('error.metadataUpload'))
        return
      }

      setValue((fieldNamePrefix + 'metadataCid') as 'metadataCid', cid)
      setMetadataUploaded(true)
    } finally {
      setUploadingMetadata(false)
    }
  }

  // Set metadata error.
  useEffect(() => {
    if ((metadataUploaded || !supportsV1GovProposals) && errors?.metadataCid) {
      clearErrors((fieldNamePrefix + 'metadataCid') as 'metadataCid')
    } else if (
      supportsV1GovProposals &&
      !metadataUploaded &&
      !errors?.metadataCid
    ) {
      setError((fieldNamePrefix + 'metadataCid') as 'metadataCid', {
        type: 'manual',
        message: t('error.metadataNeedsUploading'),
      })
    }
  }, [
    clearErrors,
    errors?.metadataCid,
    fieldNamePrefix,
    setError,
    supportsV1GovProposals,
    t,
    metadataUploaded,
  ])

  // Ensure community pool transfers are added before token usages.
  const {
    insert: insertAction,
    update: updateAction,
    remove: removeAction,
  } = useFieldArray({
    name: (fieldNamePrefix + '_actionData') as '_actionData',
    control,
  })
  const msgs = watch((fieldNamePrefix + 'msgs') as 'msgs')
  const actionData = watch((fieldNamePrefix + '_actionData') as '_actionData')
  useDeepCompareEffect(() => {
    if (
      !supportsV1GovProposals ||
      !isCreating ||
      !actionData ||
      msgs.length !== actionData.length ||
      !msgs.length
    ) {
      return
    }

    const updates: {
      type: 'insert' | 'update' | 'delete'
      data: PartialCategorizedActionKeyAndData
      index: number
    }[] = []

    msgs.forEach((msg, index) => {
      // For all messages that involve sending tokens, we need to debit the
      // community pool and send funds to x/gov.
      const amount = getFundsUsedInCwMessage(msg)

      // If has any funds, make sure there exists a Community Pool transfer
      // before it that matches. This will either insert a new transfer action
      // before this one, or update the fields to match the amount.
      if (amount.length > 0 && amount.some(({ amount }) => amount !== '0')) {
        const prevAction = actionData[index - 1]
        if (
          !prevAction ||
          prevAction.actionKey !== ActionKey.CommunityPoolTransfer ||
          prevAction.data.authority !== govModuleAddress ||
          prevAction.data.recipient !== govModuleAddress ||
          !Array.isArray(prevAction.data.funds) ||
          prevAction.data.funds.length !== amount.length ||
          amount.some(
            (a, i) =>
              a.amount !== prevAction.data.funds[i].amount ||
              a.denom !== prevAction.data.funds[i].denom
          )
        ) {
          const inserting =
            !prevAction ||
            prevAction.actionKey !== ActionKey.CommunityPoolTransfer
          updates.push({
            type: inserting ? 'insert' : 'update',
            index: inserting ? index : index - 1,
            data: {
              // See `CategorizedActionKeyAndData` comment in
              // `packages/types/actions.ts` for an explanation of why we need
              // to append with a unique ID.
              _id: prevAction?._id || uuidv4(),
              categoryKey: ActionCategoryKey.Treasury,
              actionKey: ActionKey.CommunityPoolTransfer,
              data: {
                authority: govModuleAddress,
                recipient: govModuleAddress,
                funds: amount,
              } as CommunityPoolTransferData,
            },
          })
        }
      }

      // If transfer action precedes another action that does not have funds,
      // remove the transfer action as the user probably deleted the action this
      // transfer was for.
      if (
        isCosmWasmStargateMsg(msg) &&
        msg.stargate.type_url === MsgCommunityPoolSpend.typeUrl
      ) {
        const nextMsg = msgs[index + 1]
        const amount = nextMsg && getFundsUsedInCwMessage(nextMsg)
        if (
          !nextMsg ||
          !amount.length ||
          !amount.some(({ amount }) => amount !== '0')
        ) {
          updates.push({
            type: 'delete',
            index,
            data: { _id: '' },
          })
        }
      }
    })

    // Update transfer actions in reverse so the indices remain correct.
    updates
      .reverse()
      .forEach(({ type, index, data }) =>
        (type === 'insert'
          ? insertAction
          : type === 'update'
          ? updateAction
          : removeAction)(index, data)
      )
  }, [actionData, govModuleAddress, insertAction, isCreating, msgs])

  // When any legacy fields change, try encoding it.
  const legacy = watch((fieldNamePrefix + 'legacy') as 'legacy')
  useEffect(() => {
    if (supportsV1GovProposals) {
      return
    }

    try {
      const {
        typeUrl,
        spends,
        spendRecipient,
        parameterChanges,
        upgradePlan,
        custom,
      } = legacy

      const parsedUpgradePlan = JSON5.parse(upgradePlan)
      const parsedCustom = JSON5.parse(custom)

      const content =
        typeUrl === GOVERNANCE_PROPOSAL_TYPE_CUSTOM
          ? Cosmos_govv1beta1Content_FromAmino({
              type: parsedCustom.type,
              value: {
                ...parsedCustom.value,
                // Automatically insert title and description.
                title,
                description,
              },
            })
          : GOVERNANCE_PROPOSAL_TYPES.find(
              (type) => type.typeUrl === typeUrl
            )?.toProtoMsg({
              // all
              title,
              description,
              // CommunityPoolSpendProposal
              amount: spends.map(({ amount, denom }) => ({
                denom,
                amount: BigInt(amount).toString(),
              })),
              recipient: spendRecipient,
              // ParameterChangeProposal
              changes: JSON5.parse(parameterChanges),
              // SoftwareUpgradeProposal
              plan: {
                ...parsedUpgradePlan,
                height: !isNaN(Number(parsedUpgradePlan.height))
                  ? BigInt(parsedUpgradePlan.height)
                  : -1n,
              },
            })

      setValue(
        (fieldNamePrefix + 'legacyContent') as 'legacyContent',
        content as any
      )
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    description,
    fieldNamePrefix,
    // Object reference does not change when contents do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(legacy),
    setValue,
    supportsV1GovProposals,
    title,
  ])

  return (
    <>
      {isCreating ? (
        <>
          {!data._onlyShowActions && (
            <>
              <div className="space-y-1">
                <InputLabel name={t('form.title')} />
                <TextInput
                  disabled={!isCreating}
                  error={errors?.title}
                  fieldName={(fieldNamePrefix + 'title') as 'title'}
                  register={register}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors?.title} />
              </div>

              <div className="space-y-1">
                <InputLabel>
                  {t('form.description')}
                  <span className="text-text-tertiary">
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    {' – '}
                    {t('info.supportsMarkdownFormat')}
                  </span>
                </InputLabel>
                <TextAreaInput
                  disabled={!isCreating}
                  error={errors?.description}
                  fieldName={(fieldNamePrefix + 'description') as 'description'}
                  register={register}
                  rows={5}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors?.description} />
              </div>

              <div className="space-y-1">
                <InputLabel name={t('form.initialDeposit')} />
                <TokenInput
                  amountError={errors?.deposit?.[0]?.amount}
                  amountFieldName={
                    (fieldNamePrefix + 'deposit.0.amount') as 'deposit.0.amount'
                  }
                  amountMin={convertMicroDenomToDenomWithDecimals(
                    1,
                    selectedMinDepositToken?.token.decimals ?? 0
                  )}
                  amountStep={convertMicroDenomToDenomWithDecimals(
                    1,
                    selectedMinDepositToken?.token.decimals ?? 0
                  )}
                  convertMicroDenom
                  onSelectToken={({ denomOrAddress }) =>
                    setValue(
                      (fieldNamePrefix +
                        'deposit.0.denom') as 'deposit.0.denom',
                      denomOrAddress
                    )
                  }
                  readOnly={!isCreating}
                  register={register}
                  selectedToken={selectedMinDepositToken?.token}
                  setValue={setValue}
                  tokens={
                    minDeposits.loading
                      ? { loading: true }
                      : {
                          loading: false,
                          data: minDeposits.data.map(({ token }) => token),
                        }
                  }
                  watch={watch}
                />
              </div>
            </>
          )}

          {supportsV1GovProposals ? (
            <>
              <NestedActionsEditor {...props} />

              <div className="flex flex-col items-end gap-2 text-right">
                <Button
                  disabled={metadataUploaded}
                  loading={uploadingMetadata}
                  onClick={uploadMetadata}
                  size="lg"
                  variant="primary"
                >
                  {metadataUploaded
                    ? t('button.metadataUploaded')
                    : t('button.uploadMetadata')}
                </Button>
                <InputErrorMessage error={errors?.metadataCid} />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <InputLabel name={t('form.proposalType')} />

                <SelectInput
                  error={errors?.legacy?.type}
                  fieldName={
                    (fieldNamePrefix + 'legacy.typeUrl') as 'legacy.typeUrl'
                  }
                  register={register}
                >
                  {GOVERNANCE_PROPOSAL_TYPES.map(({ typeUrl }) => (
                    <option key={typeUrl} value={typeUrl}>
                      {t(`govProposalType.${typeUrl.split('.').pop()}`)}
                    </option>
                  ))}

                  <option value={GOVERNANCE_PROPOSAL_TYPE_CUSTOM}>
                    {t('title.custom')}
                  </option>
                </SelectInput>
              </div>

              {data.legacy.typeUrl === CommunityPoolSpendProposal.typeUrl && (
                <>
                  <div className="flex flex-col gap-1">
                    <InputLabel name={t('form.recipient')} />
                    <AddressInput
                      disabled={!isCreating}
                      error={errors?.legacy?.spendRecipient}
                      fieldName={
                        (fieldNamePrefix +
                          'legacy.spendRecipient') as 'legacy.spendRecipient'
                      }
                      register={register}
                      validation={[
                        validateRequired,
                        makeValidateAddress(bech32Prefix),
                      ]}
                    />
                    <InputErrorMessage error={errors?.legacy?.spendRecipient} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <InputLabel name={t('form.proposedSpends')} />

                    <div className="flex flex-row flex-wrap items-end justify-between gap-6">
                      <div className="flex grow flex-col gap-1">
                        <div className="flex flex-col items-stretch gap-2">
                          {spendFields.map(({ id }, index) => {
                            const denom = watch(
                              (fieldNamePrefix +
                                `legacy.spends.${index}.denom`) as `legacy.spends.${number}.denom`
                            )
                            const selectedToken = availableTokens.find(
                              ({ denomOrAddress }) => denomOrAddress === denom
                            )
                            if (!selectedToken) {
                              return null
                            }

                            return (
                              <div
                                key={id}
                                className="flex flex-row items-center gap-2"
                              >
                                <TokenInput
                                  amountError={
                                    errors?.legacy?.spends?.[index]?.amount
                                  }
                                  amountFieldName={
                                    (fieldNamePrefix +
                                      `legacy.spends.${index}.amount`) as `legacy.spends.${number}.amount`
                                  }
                                  amountMin={convertMicroDenomToDenomWithDecimals(
                                    1,
                                    selectedToken.decimals
                                  )}
                                  amountStep={convertMicroDenomToDenomWithDecimals(
                                    1,
                                    selectedToken.decimals
                                  )}
                                  convertMicroDenom
                                  onSelectToken={({ denomOrAddress }) =>
                                    setValue(
                                      (fieldNamePrefix +
                                        `legacy.spends.${index}.denom`) as `legacy.spends.${number}.denom`,
                                      denomOrAddress
                                    )
                                  }
                                  register={register}
                                  selectedToken={selectedToken}
                                  setValue={setValue}
                                  tokens={{
                                    loading: false,
                                    data: availableTokens,
                                  }}
                                  watch={watch}
                                />

                                <IconButton
                                  Icon={Close}
                                  onClick={() => removeSpend(index)}
                                  size="sm"
                                  variant="ghost"
                                />
                              </div>
                            )
                          })}

                          {isCreating && (
                            <Button
                              className="self-start"
                              onClick={() =>
                                appendSpend({
                                  amount: 1,
                                  denom: nativeToken.denomOrAddress,
                                })
                              }
                              variant="secondary"
                            >
                              {t('button.addPayment')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {data.legacy.typeUrl === ParameterChangeProposal.typeUrl && (
                <div className="flex flex-col items-stretch gap-1">
                  <InputLabel name={t('form.parameterChanges')} />
                  <CodeMirrorInput
                    control={control}
                    error={errors?.legacy?.parameterChanges}
                    fieldName={
                      (fieldNamePrefix +
                        'legacy.parameterChanges') as 'legacy.parameterChanges'
                    }
                    validation={[validateJSON]}
                  />
                  {errors?.legacy?.parameterChanges?.message ? (
                    <p className="text-error flex items-center gap-1 text-sm">
                      <Close className="inline w-5" />{' '}
                      <span>{errors.legacy?.parameterChanges?.message}</span>
                    </p>
                  ) : (
                    <p className="text-success flex items-center gap-1 text-sm">
                      <Check className="inline w-5" /> {t('info.jsonIsValid')}
                    </p>
                  )}
                </div>
              )}

              {data.legacy.typeUrl === SoftwareUpgradeProposal.typeUrl && (
                <div className="flex flex-col items-stretch gap-1">
                  <InputLabel name={t('form.plan')} />
                  <CodeMirrorInput
                    control={control}
                    error={errors?.legacy?.upgradePlan}
                    fieldName={
                      (fieldNamePrefix +
                        'legacy.upgradePlan') as 'legacy.upgradePlan'
                    }
                    validation={[validateJSON]}
                  />
                  {errors?.legacy?.upgradePlan?.message ? (
                    <p className="text-error flex items-center gap-1 text-sm">
                      <Close className="inline w-5" />{' '}
                      <span>{errors.legacy?.upgradePlan?.message}</span>
                    </p>
                  ) : (
                    <p className="text-success flex items-center gap-1 text-sm">
                      <Check className="inline w-5" /> {t('info.jsonIsValid')}
                    </p>
                  )}
                </div>
              )}

              {data.legacy.typeUrl === GOVERNANCE_PROPOSAL_TYPE_CUSTOM && (
                <div className="flex flex-col items-stretch gap-1">
                  <InputLabel name={t('title.custom')} />

                  <CodeMirrorInput
                    control={control}
                    error={errors?.legacy?.custom}
                    fieldName={
                      (fieldNamePrefix + 'legacy.custom') as 'legacy.custom'
                    }
                    validation={[validateJSON]}
                  />
                  {errors?.legacy?.custom?.message ? (
                    <p className="text-error flex items-center gap-1 text-sm">
                      <Close className="inline w-5" />{' '}
                      <span>{errors.legacy?.custom?.message}</span>
                    </p>
                  ) : (
                    <p className="text-success flex items-center gap-1 text-sm">
                      <Check className="inline w-5" /> {t('info.jsonIsValid')}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <GovernanceProposal
          GovProposalActionDisplay={GovProposalActionDisplay}
          TokenAmountDisplay={TokenAmountDisplay}
          content={govProposalActionDataToDecodedContent(data)}
          deposit={data.deposit.map(({ denom, amount }) => ({
            denom,
            amount: isNaN(amount) ? '0' : BigInt(amount).toString(),
          }))}
        />
      )}
    </>
  )
}
