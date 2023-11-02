import { fromBase64 } from '@cosmjs/encoding'
import { EncodeObject } from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'
import {
  BookOutlined,
  Close,
  FlagOutlined,
  GavelRounded,
  Timelapse,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import cloneDeep from 'lodash.clonedeep'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import { BinaryReader } from '@dao-dao/protobuf'
import { MsgSubmitProposal as MsgSubmitProposalV1 } from '@dao-dao/protobuf/codegen/cosmos/gov/v1/tx'
import { ProposalStatus } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgSubmitProposal as MsgSubmitProposalV1Beta1 } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/tx'
import { Any } from '@dao-dao/protobuf/codegen/google/protobuf/any'
import {
  genericTokenBalanceSelector,
  genericTokenSelector,
  govParamsSelector,
  govProposalCreatedCardPropsAtom,
  govProposalSelector,
  latestProposalSaveAtom,
  proposalDraftsAtom,
  refreshGovProposalsAtom,
} from '@dao-dao/state/recoil'
import {
  Button,
  FilterableItem,
  FilterableItemPopup,
  IconButton,
  InputErrorMessage,
  Loader,
  NumberInput,
  ProposalContentDisplay,
  TextAreaInput,
  TextInput,
  Tooltip,
  useCachedLoading,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  ActionContextType,
  GovProposalVersion,
  GovernanceProposalActionData,
  ProposalDraft,
  TokenType,
} from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  convertMicroDenomToDenomWithDecimals,
  dateToWdhms,
  formatDateTime,
  formatPercentOf100,
  formatTime,
  getGovProposalPath,
  getImageUrlForChainId,
  getSignerOptions,
  govProposalActionDataToDecodedContent,
  isCosmWasmStargateMsg,
  processError,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { GovActionsProvider } from '../../actions'
import { makeGovernanceProposalAction } from '../../actions/core/chain_governance/GovernanceProposal'
import { useWallet } from '../../hooks/useWallet'
import { useWalletInfo } from '../../hooks/useWalletInfo'
import { EntityDisplay } from '../EntityDisplay'
import { SuspenseLoader } from '../SuspenseLoader'
import { GovProposalActionDisplay } from './GovProposalActionDisplay'

enum ProposeSubmitValue {
  Preview = 'Preview',
  Submit = 'Submit',
}

export const NewGovProposal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const chainContext = useSupportedChainContext()
  const { isWalletConnected, getOfflineSignerDirect, chain, chainWallet } =
    useWallet()

  const [loading, setLoading] = useState(false)

  const [showPreview, setShowPreview] = useState(false)
  const [showSubmitErrorNote, setShowSubmitErrorNote] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { walletAddress = '', walletProfileData } = useWalletInfo()

  const [govProposalCreatedCardProps, setGovProposalCreatedCardProps] =
    useRecoilState(govProposalCreatedCardPropsAtom)

  const localStorageKey = `gov_${chainContext.chainId}`
  const [latestProposalSave, setLatestProposalSave] = useRecoilState(
    latestProposalSaveAtom(localStorageKey)
  )

  const govParams = useRecoilValue(
    govParamsSelector({
      chainId: chainContext.chainId,
    })
  )
  const depositTokenInfos = useRecoilValue(
    waitForAll(
      govParams.minDeposit.map(({ denom }) =>
        genericTokenSelector({
          chainId: chainContext.chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })
      )
    )
  )
  // Selected deposit token.
  const depositToken = govParams.minDeposit[0]
  const depositTokenInfo = depositTokenInfos[0]
  // Wallet balance of selected deposit token.
  const walletDepositBalance = useCachedLoading(
    walletAddress
      ? genericTokenBalanceSelector({
          chainId: chainContext.chainId,
          walletAddress,
          type: TokenType.Native,
          denomOrAddress: depositToken.denom,
        })
      : undefined,
    undefined
  )

  const governanceProposalAction = makeGovernanceProposalAction({
    t,
    chain: chainContext.chain,
    chainContext,
    address: walletAddress,
    context: {
      type: ActionContextType.Wallet,
    },
  })!
  const transformGovernanceProposalActionDataToCosmos =
    governanceProposalAction.useTransformToCosmos()
  const defaults = governanceProposalAction.useDefaults()
  const formMethods = useForm<GovernanceProposalActionData>({
    mode: 'onChange',
    defaultValues: {
      ...defaults,
      ...cloneDeep(latestProposalSave),
      _onlyShowActions: true,
    },
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = formMethods

  const depositAmount = watch('deposit.0.amount')
  const depositUnsatisfied =
    !walletDepositBalance.loading &&
    !!walletDepositBalance.data &&
    !!depositAmount &&
    Number(walletDepositBalance.data.balance) < depositAmount

  const onSubmitError: SubmitErrorHandler<GovernanceProposalActionData> =
    useCallback(() => {
      setShowSubmitErrorNote(true)
      setSubmitError('')
    }, [setShowSubmitErrorNote])

  const setRefreshGovProposals = useSetRecoilState(
    refreshGovProposalsAtom(chainContext.chainId)
  )
  const refreshGovProposals = useCallback(
    () => setRefreshGovProposals((id) => id + 1),
    [setRefreshGovProposals]
  )

  const onSubmitForm: SubmitHandler<GovernanceProposalActionData> =
    useRecoilCallback(
      ({ snapshot }) =>
        async (data, event) => {
          const nativeEvent = event?.nativeEvent as SubmitEvent
          const submitterValue = (nativeEvent?.submitter as HTMLInputElement)
            ?.value

          setShowSubmitErrorNote(false)

          // Preview toggled in onClick handler.
          if (submitterValue === ProposeSubmitValue.Preview) {
            return
          }

          if (!isWalletConnected || !chainWallet) {
            toast.error(t('error.logInToContinue'))
            return
          }

          setSubmitError('')

          let encodeObject: EncodeObject
          try {
            // Transforms to stargate Cosmos message that submits proposal.
            const submitProposalStargateMsg =
              transformGovernanceProposalActionDataToCosmos(data)
            if (
              !submitProposalStargateMsg ||
              !isCosmWasmStargateMsg(submitProposalStargateMsg)
            ) {
              throw new Error(t('error.loadingData'))
            }

            // Transform Cosmos message to executable encode object.
            encodeObject =
              data.version === GovProposalVersion.V1_BETA_1
                ? {
                    typeUrl: MsgSubmitProposalV1Beta1.typeUrl,
                    value: MsgSubmitProposalV1Beta1.decode(
                      fromBase64(submitProposalStargateMsg.stargate.value)
                    ),
                  }
                : {
                    typeUrl: MsgSubmitProposalV1.typeUrl,
                    value: MsgSubmitProposalV1.decode(
                      fromBase64(submitProposalStargateMsg.stargate.value)
                    ),
                  }

            // Need to re-encode the v1beta1 content as Any since `decode` fully
            // decodes the content into an object, but we need it encoded.
            if (encodeObject.typeUrl === MsgSubmitProposalV1Beta1.typeUrl) {
              const reader = new BinaryReader(
                fromBase64(submitProposalStargateMsg.stargate.value)
              )
              const end = reader.len
              while (reader.pos < end) {
                const tag = reader.uint32()
                switch (tag >>> 3) {
                  case 1:
                    ;(encodeObject.value as MsgSubmitProposalV1Beta1).content =
                      Any.decode(reader, reader.uint32()) as any
                    break
                  default:
                    reader.skipType(tag & 7)
                    break
                }
              }
            }
          } catch (err) {
            console.error(err)
            setSubmitError(
              processError(err, {
                forceCapture: false,
              })
            )
            return
          }

          setLoading(true)
          try {
            // TODO(authz-fix): Fix amino support.
            const offlineSignerDirect = await getOfflineSignerDirect()
            const stargateClient =
              await SigningStargateClient.connectWithSigner(
                await chainWallet.getRpcEndpoint(),
                offlineSignerDirect,
                getSignerOptions(chain)
              )

            const { events } = await stargateClient.signAndBroadcast(
              walletAddress,
              [encodeObject],
              CHAIN_GAS_MULTIPLIER
            )

            const proposalId = Number(
              events
                .find(
                  ({ type, attributes }) =>
                    type === 'submit_proposal' &&
                    attributes.some(({ key }) => key === 'proposal_id')
                )
                ?.attributes.find(({ key }) => key === 'proposal_id')?.value ??
                -1
            )
            if (proposalId === -1) {
              throw new Error(t('error.loadingData'))
            }

            const proposal = await snapshot.getPromise(
              govProposalSelector({
                chainId: chainContext.chainId,
                proposalId,
              })
            )
            if (!proposal) {
              throw new Error(t('error.loadingData'))
            }

            const endTime =
              proposal.proposal.status ===
              ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
                ? proposal.proposal.depositEndTime
                : proposal.proposal.votingEndTime

            // Show modal.
            setGovProposalCreatedCardProps({
              id: proposal.id.toString(),
              title: proposal.title,
              description: proposal.description,
              info: [
                {
                  Icon: BookOutlined,
                  label: `${t('title.threshold')}: ${formatPercentOf100(
                    govParams.threshold * 100
                  )}`,
                },
                {
                  Icon: FlagOutlined,
                  label: `${t('title.quorum')}: ${formatPercentOf100(
                    govParams.quorum * 100
                  )}`,
                },
                ...(endTime
                  ? [
                      {
                        Icon: Timelapse,
                        label: dateToWdhms(endTime),
                      },
                    ]
                  : []),
              ],
              dao: {
                type: 'gov',
                name: chainContext.chain.pretty_name,
                coreAddressOrId: chainContext.config.name,
                imageUrl: getImageUrlForChainId(chainContext.chainId),
              },
            })

            // Refresh proposals state.
            refreshGovProposals()

            // Clear saved form data.
            setLatestProposalSave({})

            // Navigate to proposal (underneath the creation modal).
            router.push(
              getGovProposalPath(
                chainContext.config.name,
                proposalId.toString()
              )
            )

            // Don't stop loading indicator on success since we are navigating.
          } catch (err) {
            console.error(err)
            toast.error(processError(err))
            setLoading(false)
          }
        },
      [
        isWalletConnected,
        chain,
        chainWallet,
        t,
        transformGovernanceProposalActionDataToCosmos,
        walletAddress,
        getOfflineSignerDirect,
        chainContext.chainId,
        chainContext.chain.pretty_name,
        chainContext.config.name,
        setGovProposalCreatedCardProps,
        govParams.threshold,
        govParams.quorum,
        refreshGovProposals,
        setLatestProposalSave,
        router,
      ]
    )
  const proposalData = watch()

  // Save latest data to atom and thus localStorage every 10 seconds.
  useEffect(() => {
    // If created proposal, don't save.
    if (govProposalCreatedCardProps) {
      return
    }

    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(
      () => setLatestProposalSave(cloneDeep(proposalData)),
      10000
    )
    return () => clearTimeout(timeout)
  }, [govProposalCreatedCardProps, setLatestProposalSave, proposalData])

  const [drafts, setDrafts] = useRecoilState(
    proposalDraftsAtom(localStorageKey)
  )
  const [draftIndex, setDraftIndex] = useState<number>()
  const draft =
    draftIndex !== undefined && drafts.length > draftIndex
      ? drafts[draftIndex]
      : undefined
  const loadDraft = useCallback(
    (loadIndex: number) => {
      // Already saving to a selected draft or draft doesn't exist.
      if (draftIndex || loadIndex >= drafts.length) {
        return
      }

      const draft = drafts[loadIndex]
      if (!draft) {
        toast.error(t('error.loadingData'))
      }
      // Deep clone to prevent values from being readOnly.
      reset(draft.proposal.data)
      setDraftIndex(loadIndex)
    },
    [draftIndex, drafts, reset, t]
  )
  const deleteDraft = useCallback(
    (deleteIndex: number) => {
      setDrafts((drafts) => drafts.filter((_, index) => index !== deleteIndex))
      setDraftIndex(undefined)
    },
    [setDrafts]
  )
  const unloadDraft = () => setDraftIndex(undefined)

  const saveDraft = useCallback(() => {
    // Already saving to a selected draft.
    if (draft) {
      return
    }

    const newDraft: ProposalDraft = {
      name: proposalData.title,
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      proposal: {
        id: '',
        data: proposalData,
      },
    }

    setDrafts([newDraft, ...drafts])
    setDraftIndex(0)
  }, [draft, drafts, proposalData, setDrafts])

  // Debounce saving draft every 3 seconds.
  const [draftSaving, setDraftSaving] = useState(false)
  useEffect(() => {
    if (draftIndex === undefined) {
      return
    }

    // Save after 3 seconds.
    setDraftSaving(true)
    const timeout = setTimeout(() => {
      setDrafts((drafts) =>
        drafts.map((savedDraft, index) =>
          index === draftIndex
            ? {
                ...savedDraft,
                name: proposalData.title,
                lastUpdatedAt: Date.now(),
                proposal: {
                  id: '',
                  // Deep clone to prevent values from becoming readOnly.
                  data: cloneDeep(proposalData),
                },
              }
            : savedDraft
        )
      )
      setDraftSaving(false)
    }, 3000)
    // Debounce.
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Instance changes every time, so compare stringified verison.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(proposalData),
    draftIndex,
    setDrafts,
  ])

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
      >
        <div className="rounded-lg bg-background-tertiary">
          <div className="flex flex-row items-center justify-between gap-6 py-4 px-6">
            <p className="primary-text text-text-body">
              {t('form.proposalsName')}
            </p>

            <div className="flex grow flex-col">
              <TextInput
                error={errors.title}
                fieldName="title"
                placeholder={t('form.proposalsNamePlaceholder')}
                register={register}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.title} />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-y border-border-secondary p-6 pt-5">
            <p className="primary-text text-text-body">
              {t('form.description')}
              <span className="text-text-tertiary">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {' – '}
                {t('info.supportsMarkdownFormat')}
              </span>
            </p>

            <div className="flex flex-col">
              <TextAreaInput
                error={errors.description}
                fieldName="description"
                placeholder={t('form.proposalsDescriptionPlaceholder')}
                register={register}
                rows={5}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.description} />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-6 py-5 px-6">
            <div className="flex flex-col gap-1">
              <p className="primary-text text-text-body">{t('form.deposit')}</p>
              <p className="caption-text max-w-sm">
                {t('info.govDepositDescription', {
                  amount: convertMicroDenomToDenomWithDecimals(
                    depositToken.amount,
                    depositTokenInfo.decimals
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: depositTokenInfo.decimals,
                  }),
                  minAmount: (
                    convertMicroDenomToDenomWithDecimals(
                      depositToken.amount,
                      depositTokenInfo.decimals
                    ) * govParams.minInitialDepositRatio
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: depositTokenInfo.decimals,
                  }),
                  symbol: depositTokenInfo.symbol,
                })}
              </p>
            </div>

            <div className="flex grow flex-col items-end">
              <NumberInput
                containerClassName="grow"
                error={errors?.deposit?.[0]?.amount}
                fieldName="deposit.0.amount"
                ghost
                hidePlusMinus
                min={
                  convertMicroDenomToDenomWithDecimals(
                    depositToken.amount,
                    depositTokenInfo.decimals
                  ) * govParams.minInitialDepositRatio
                }
                register={register}
                setValue={setValue}
                step={convertMicroDenomToDenomWithDecimals(
                  1,
                  depositTokenInfo.decimals
                )}
                textClassName="text-lg font-mono"
                transformDecimals={depositTokenInfo.decimals}
                unit={'$' + depositTokenInfo.symbol}
                validation={[validateRequired, validatePositive]}
                watch={watch}
              />
              <InputErrorMessage error={errors.deposit?.[0]?.amount} />
            </div>
          </div>
        </div>

        <p className="title-text -mb-2 text-text-body">
          {t('title.configuration')}
        </p>

        <div className="flex max-w-2xl flex-col gap-4">
          <SuspenseLoader fallback={<Loader size={36} />}>
            <GovActionsProvider>
              <governanceProposalAction.Component
                addAction={() => {}}
                allActionsWithData={[]}
                data={proposalData}
                errors={errors}
                fieldNamePrefix=""
                index={-1}
                isCreating
                remove={() => {}}
              />
            </GovActionsProvider>
          </SuspenseLoader>
        </div>

        <div className="flex flex-col gap-2 border-y border-border-secondary py-6">
          <div className="flex flex-row items-center justify-between gap-6">
            <p className="title-text text-text-body">
              {t('info.reviewYourProposal')}
            </p>

            <div className="flex flex-row items-center justify-end gap-2">
              <Button
                disabled={loading}
                onClick={() => setShowPreview((p) => !p)}
                type="submit"
                value={ProposeSubmitValue.Preview}
                variant="secondary"
              >
                {showPreview ? (
                  <>
                    {t('button.hidePreview')}
                    <VisibilityOff className="!h-5 !w-5" />
                  </>
                ) : (
                  <>
                    {t('button.preview')}
                    <Visibility className="!h-5 !w-5" />
                  </>
                )}
              </Button>

              <Tooltip
                title={
                  !isWalletConnected
                    ? t('error.logInToContinue')
                    : depositUnsatisfied
                    ? t('error.notEnoughForDeposit')
                    : undefined
                }
              >
                <Button
                  disabled={!isWalletConnected || depositUnsatisfied}
                  loading={loading}
                  type="submit"
                  value={ProposeSubmitValue.Submit}
                >
                  <p>{t('button.publish')}</p>
                  <GavelRounded className="!h-4 !w-4" />
                </Button>
              </Tooltip>
            </div>
          </div>

          {showSubmitErrorNote && (
            <p className="secondary-text self-end text-right text-text-interactive-error">
              {t('error.correctErrorsAbove')}
            </p>
          )}

          {!!submitError && (
            <p className="secondary-text self-end text-right text-text-interactive-error">
              {submitError}
            </p>
          )}

          {showPreview && (
            <div className="mt-4 rounded-md border border-border-secondary p-6">
              <ProposalContentDisplay
                EntityDisplay={EntityDisplay}
                createdAt={new Date()}
                creator={{
                  address: walletAddress,
                  name: walletProfileData.loading
                    ? { loading: true }
                    : { loading: false, data: walletProfileData.profile.name },
                }}
                description={proposalData.description}
                innerContentDisplay={
                  <GovProposalActionDisplay
                    content={govProposalActionDataToDecodedContent(
                      proposalData
                    )}
                  />
                }
                title={proposalData.title}
              />
            </div>
          )}
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          {draft ? (
            <>
              <p
                className={clsx(
                  'caption-text italic',
                  draftSaving && 'animate-pulse'
                )}
              >
                {draftSaving
                  ? t('info.draftSaving')
                  : t('info.draftSavedAtTime', {
                      time: formatTime(new Date(draft.lastUpdatedAt)),
                    })}
              </p>

              <Tooltip
                title={draftSaving ? undefined : t('info.draftStillSaved')}
              >
                <Button
                  className="caption-text -ml-1"
                  disabled={draftSaving}
                  onClick={unloadDraft}
                  variant="underline"
                >
                  {t('button.resetQuestion')}
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              {drafts.length > 0 && (
                <FilterableItemPopup
                  filterableItemKeys={FILTERABLE_KEYS}
                  items={drafts.map(
                    ({ name, createdAt, lastUpdatedAt }, index) => ({
                      key: createdAt,
                      label: name,
                      description: (
                        <>
                          {t('title.created')}:{' '}
                          {formatDateTime(new Date(createdAt))}
                          <br />
                          {t('title.lastUpdated')}:{' '}
                          {formatDateTime(new Date(lastUpdatedAt))}
                        </>
                      ),
                      rightNode: (
                        <Tooltip title={t('button.deleteDraft')}>
                          <IconButton
                            Icon={Close}
                            onClick={(event) => {
                              // Don't click on item button.
                              event.stopPropagation()
                              deleteDraft(index)
                            }}
                            variant="ghost"
                          />
                        </Tooltip>
                      ),
                    })
                  )}
                  onSelect={(_, index) => loadDraft(index)}
                  searchPlaceholder={t('info.searchDraftPlaceholder')}
                  trigger={{
                    type: 'button',
                    props: {
                      variant: 'secondary',
                      children: t('button.loadDraft'),
                    },
                  }}
                />
              )}

              <Tooltip
                title={
                  proposalData.title
                    ? undefined
                    : t('info.enterNameBeforeSavingDraft')
                }
              >
                <Button
                  disabled={!proposalData.title}
                  onClick={saveDraft}
                  variant="secondary"
                >
                  {t('button.saveDraft')}
                </Button>
              </Tooltip>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<FilterableItem>[] = ['label']
