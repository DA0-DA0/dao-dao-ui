import {
  Close,
  GavelRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { ComponentType, useCallback, useState } from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useFormContext,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  ActionCategorySelector,
  Button,
  CategorizedActionEditor,
  FilterableItem,
  FilterableItemPopup,
  IconButton,
  InputErrorMessage,
  ProposalContentDisplay,
  RawActionsRenderer,
  TextAreaInput,
  TextInput,
  Tooltip,
} from '@dao-dao/stateless'
import {
  ActionCategoryWithLabel,
  BaseNewProposalProps,
  LoadedActions,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import {
  convertActionsToMessages,
  formatDateTime,
  formatTime,
  processError,
  validateRequired,
} from '@dao-dao/utils'

import { useWalletInfo } from '../../../../../hooks'
import { NewProposalData, NewProposalForm } from '../../types'

enum ProposeSubmitValue {
  Preview = 'Preview',
  Submit = 'Submit',
}

export interface NewProposalProps
  extends Pick<
    BaseNewProposalProps<NewProposalForm>,
    | 'draft'
    | 'saveDraft'
    | 'drafts'
    | 'loadDraft'
    | 'unloadDraft'
    | 'draftSaving'
    | 'deleteDraft'
    | 'proposalModuleSelector'
  > {
  createProposal: (newProposalData: NewProposalData) => Promise<void>
  loading: boolean
  isPaused: boolean
  isMember: boolean
  anyoneCanPropose: boolean
  depositUnsatisfied: boolean
  connected: boolean
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  simulationBypassExpiration?: Date
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const NewProposal = ({
  createProposal,
  loading,
  isPaused,
  isMember,
  anyoneCanPropose,
  depositUnsatisfied,
  connected,
  categories,
  loadedActions,
  draft,
  saveDraft,
  drafts,
  loadDraft,
  unloadDraft,
  draftSaving,
  deleteDraft,
  simulationBypassExpiration,
  proposalModuleSelector,
  SuspenseLoader,
}: NewProposalProps) => {
  const { t } = useTranslation()

  // Unpack here because we use these at the top level as well as inside of
  // nested components.
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<NewProposalForm>()

  const [showPreview, setShowPreview] = useState(false)
  const [showSubmitErrorNote, setShowSubmitErrorNote] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { status: walletStatus } = useWallet()
  const { walletAddress = '', walletProfileData } = useWalletInfo()

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')

  const {
    fields: actionDataFields,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray({
    name: 'actionData',
    control,
    shouldUnregister: true,
  })

  const actionData = watch('actionData') || []

  const onSubmitForm: SubmitHandler<NewProposalForm> = useCallback(
    ({ title, description, actionData }, event) => {
      setShowSubmitErrorNote(false)
      setSubmitError('')

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Preview toggled in onClick handler.
      if (submitterValue === ProposeSubmitValue.Preview) {
        return
      }

      let msgs
      try {
        msgs = convertActionsToMessages(loadedActions, actionData)
      } catch (err) {
        console.error(err)
        setSubmitError(
          processError(err, {
            forceCapture: false,
          })
        )
        return
      }

      createProposal({
        title,
        description,
        msgs,
      })
    },
    [createProposal, loadedActions]
  )

  const onSubmitError: SubmitErrorHandler<NewProposalForm> = useCallback(
    () => setShowSubmitErrorNote(true),
    [setShowSubmitErrorNote]
  )

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
    >
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex flex-row items-center justify-between gap-6 border-b border-border-secondary py-4 px-6">
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
        <div className="flex flex-col gap-4 p-6 pt-5">
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
      </div>

      {proposalModuleSelector}

      {actionData.length > 0 && (
        <div className="-mb-2 flex flex-col gap-2">
          {actionData.map((field, index) => (
            <CategorizedActionEditor
              key={
                // Use ID from field array that corresponds with this action,
                // but use the data from watching the actions field so that it
                // updates.
                actionDataFields[index].id
              }
              {...field}
              SuspenseLoader={SuspenseLoader}
              actionDataFieldName="actionData"
              actionErrors={errors?.actionData?.[index] || {}}
              addAction={appendAction}
              categories={categories}
              index={index}
              loadedActions={loadedActions}
              onRemove={() => removeAction(index)}
            />
          ))}
        </div>
      )}

      <div className="self-start">
        <ActionCategorySelector
          categories={categories}
          onSelectCategory={({ key }) => {
            appendAction({
              categoryKey: key,
            })
          }}
        />
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
                !connected
                  ? t('error.connectWalletToContinue')
                  : depositUnsatisfied
                  ? t('error.notEnoughForDeposit')
                  : isPaused
                  ? t('error.daoIsPaused')
                  : undefined
              }
            >
              <Button
                disabled={
                  !connected ||
                  (!anyoneCanPropose && !isMember) ||
                  depositUnsatisfied ||
                  isPaused
                }
                loading={loading}
                type="submit"
                value={ProposeSubmitValue.Submit}
              >
                <p>
                  {simulationBypassExpiration ? (
                    // If bypassing simulation, change button label and show a
                    // countdown until simulation bypass expires.
                    <TimeAgo
                      date={simulationBypassExpiration}
                      formatter={(value, _, suffix) =>
                        suffix === 'from now'
                          ? t('button.publishAnywayWithCountdown', {
                              secondsRemaining: value,
                            })
                          : // In case the countdown expires before the re-render,
                            // just show the original button label.
                            t('button.publish')
                      }
                    />
                  ) : (
                    t('button.publish')
                  )}
                </p>
                <GavelRounded className="!h-4 !w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>

        {!anyoneCanPropose &&
          !isMember &&
          walletStatus !== WalletConnectionStatus.Initializing &&
          walletStatus !== WalletConnectionStatus.AttemptingAutoConnection &&
          walletStatus !== WalletConnectionStatus.Connecting && (
            <p className="secondary-text max-w-prose self-end text-right text-text-interactive-error">
              {t('error.mustBeMemberToCreateProposal')}
            </p>
          )}

        {simulationBypassExpiration && (
          <p className="secondary-text max-w-prose self-end text-right text-text-interactive-warning-body">
            {t('info.bypassSimulationExplanation')}
          </p>
        )}

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
              createdAt={new Date()}
              creator={{
                address: walletAddress,
                name: walletProfileData.loading
                  ? { loading: true }
                  : { loading: false, data: walletProfileData.profile.name },
              }}
              description={proposalDescription}
              innerContentDisplay={
                actionData.length ? (
                  <RawActionsRenderer
                    actionData={actionData}
                    loadedActions={loadedActions}
                  />
                ) : undefined
              }
              title={proposalTitle}
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
                proposalTitle ? undefined : t('info.enterNameBeforeSavingDraft')
              }
            >
              <Button
                disabled={!proposalTitle}
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
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<FilterableItem>[] = ['label']
