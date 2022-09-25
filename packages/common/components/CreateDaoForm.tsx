import { findAttribute } from '@cosmjs/stargate/build/logs'
import { ArrowBack } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import {
  ProposalModuleAdapter,
  getAdapterById as getProposalModuleAdapterById,
} from '@dao-dao/proposal-module-adapter'
import {
  CwAdminFactoryHooks,
  DefaultNewDao,
  newDaoAtom,
  usePinnedDaos,
  useWalletBalance,
} from '@dao-dao/state'
import instantiateSchema from '@dao-dao/state/clients/cw-core/instantiate_schema_0.2.0.json'
import {
  CreateDaoContext,
  CreateDaoCustomValidator,
  DaoParentInfo,
  NewDao,
} from '@dao-dao/tstypes'
import { CwCoreV0_2_0InstantiateMsg } from '@dao-dao/tstypes/contracts/cw-core-0.2.0'
import {
  Button,
  CreateDaoPages,
  DaoCreatedModal,
  DaoCreateSidebarCard,
  DaoHeader,
  GradientHero,
  ImageSelector,
  PageHeader,
  useAppLayoutContext,
  useThemeContext,
} from '@dao-dao/ui'
import {
  CWCORE_CODE_ID,
  NATIVE_DENOM,
  V1_FACTORY_CONTRACT_ADDRESS,
  convertMicroDenomToDenomWithDecimals,
  getParentDaoBreadcrumbs,
  makeValidateMsg,
  nativeTokenLabel,
  processError,
  validateUrl,
} from '@dao-dao/utils'
import {
  Cw20StakedBalanceVotingAdapter,
  getAdapterById as getVotingModuleAdapterById,
  getAdapters as getVotingModuleAdapters,
} from '@dao-dao/voting-module-adapter'
import {
  DaoCreationConfig as Cw20StakedBalalanceVotingCreationConfig,
  GovernanceTokenType,
} from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/types'

// i18n keys
export enum CreateDaoSubmitLabel {
  Back = 'button.goBack',
  Continue = 'button.continue',
  Review = 'button.review',
  CreateDao = 'button.createDAO',
}

export interface CreateDaoFormProps {
  parentDao?: DaoParentInfo

  // Primarily for testing in storybook.
  defaults?: Partial<NewDao>
  initialPageIndex?: number
}

// TODO: Add NextSeo with title description and URL in page that uses this component.
export const CreateDaoForm = ({
  parentDao,
  defaults,
  initialPageIndex = 0,
}: CreateDaoFormProps) => {
  const { t } = useTranslation()
  const { isPinned, setPinned, setUnpinned } = usePinnedDaos()

  const { RightSidebarContent } = useAppLayoutContext()

  const [createdDaoCoreAddress, setCreatedDaoCoreAddress] = useState<string>()

  const [_newDaoAtom, setNewDaoAtom] = useRecoilState(
    newDaoAtom(parentDao?.coreAddress ?? '')
  )
  const form = useForm<NewDao>({
    // Don't clone every render.
    defaultValues: useMemo(
      () => ({
        ...cloneDeep(_newDaoAtom),
        ...defaults,
      }),
      [_newDaoAtom, defaults]
    ),
    mode: 'onChange',
  })

  const newDao = form.watch()
  const {
    name,
    description,
    imageUrl,
    votingModuleAdapter,
    proposalModuleAdapters,
  } = newDao

  // Debounce saving latest data to atom and thus localStorage every 10 seconds.
  useEffect(() => {
    // If created DAO, clear saved data and don't update.
    if (createdDaoCoreAddress) {
      // Clear saved form data.
      setNewDaoAtom(DefaultNewDao)
      return
    }

    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(() => setNewDaoAtom(cloneDeep(newDao)), 10000)
    return () => clearTimeout(timeout)
  }, [newDao, setNewDaoAtom, createdDaoCoreAddress])

  // Set accent color based on image provided.
  const { setAccentColor } = useThemeContext()
  useEffect(() => {
    if (!imageUrl) {
      setAccentColor(undefined)
      return
    }

    const absoluteUrl = new URL(imageUrl, document.baseURI).href
    fetch(`https://fac.withoutdoing.com/${absoluteUrl}`)
      .then((response) => response.text())
      // Only set color if appears to be valid color string.
      .then((value) => {
        const color = value.trim()
        if (!color.startsWith('#')) {
          return
        }

        setAccentColor(color)
      })
      .catch(console.error)
  }, [imageUrl, setAccentColor])

  //! Page state
  const [pageIndex, setPageIndex] = useState(initialPageIndex)

  const showBack = pageIndex > 0
  const submitValue =
    pageIndex < CreateDaoPages.length - 2
      ? t(CreateDaoSubmitLabel.Continue)
      : // Second to last links to the Review page.
      pageIndex === CreateDaoPages.length - 2
      ? t(CreateDaoSubmitLabel.Review)
      : // Last page creates the DAO.
        t(CreateDaoSubmitLabel.CreateDao)

  //! Adapters and message generators

  // Get voting module adapters with daoCreation fields set.
  const availableVotingModuleAdapters: CreateDaoContext['availableVotingModuleAdapters'] =
    useMemo(
      () =>
        getVotingModuleAdapters()
          .filter(({ daoCreation }) => !!daoCreation)
          .map(({ id, daoCreation }) => ({
            id,
            daoCreation: daoCreation!,
          })),
      []
    )

  // Get selected voting module adapter.
  const votingModuleDaoCreationAdapter = useMemo(
    () => getVotingModuleAdapterById(votingModuleAdapter.id)?.daoCreation,
    [votingModuleAdapter.id]
  )
  if (!votingModuleDaoCreationAdapter) {
    throw new Error(t('error.loadingData'))
  }

  // Get all proposal module adapters.
  const proposalModuleDaoCreationAdapters = useMemo(
    () =>
      proposalModuleAdapters
        .map(({ id }) => getProposalModuleAdapterById(id)?.daoCreation)
        // Remove undefined adapters.
        .filter(Boolean) as Required<ProposalModuleAdapter>['daoCreation'][],
    [proposalModuleAdapters]
  )

  const validateInstantiateMsg = useMemo(
    () => makeValidateMsg<CwCoreV0_2_0InstantiateMsg>(instantiateSchema, t),
    [t]
  )

  // Generate instantiation message.
  const generateInstantiateMsg = useCallback(() => {
    // Generate voting module adapter instantiation message.
    const votingModuleInstantiateInfo =
      votingModuleDaoCreationAdapter.getInstantiateInfo(
        newDao,
        votingModuleAdapter.data,
        t
      )

    // Generate proposal module adapters instantiation messages.
    const proposalModuleInstantiateInfos =
      proposalModuleDaoCreationAdapters.map(({ getInstantiateInfo }, index) =>
        getInstantiateInfo(newDao, proposalModuleAdapters[index].data, t)
      )

    const instantiateMsg: CwCoreV0_2_0InstantiateMsg = {
      // If parentDao exists, let's make a subDAO :D
      admin: parentDao?.coreAddress ?? null,
      automatically_add_cw20s: true,
      automatically_add_cw721s: true,
      description,
      image_url: imageUrl ?? null,
      name,
      proposal_modules_instantiate_info: proposalModuleInstantiateInfos,
      voting_module_instantiate_info: votingModuleInstantiateInfo,
    }

    // Validate and throw error if invalid according to JSON schema.
    validateInstantiateMsg(instantiateMsg)

    return instantiateMsg
  }, [
    description,
    imageUrl,
    name,
    newDao,
    parentDao?.coreAddress,
    proposalModuleAdapters,
    proposalModuleDaoCreationAdapters,
    t,
    validateInstantiateMsg,
    votingModuleAdapter.data,
    votingModuleDaoCreationAdapter,
  ])

  //! Submit handlers

  const [creating, setCreating] = useState(false)
  const { connected, address: walletAddress } = useWallet()
  const { refreshBalances } = useWalletBalance()

  const instantiateWithFactory =
    CwAdminFactoryHooks.useInstantiateWithAdminFactory({
      contractAddress: V1_FACTORY_CONTRACT_ADDRESS,
      sender: walletAddress ?? '',
    })

  const createDaoWithFactory = useCallback(async () => {
    const cwCoreInstantiateMsg = generateInstantiateMsg()

    const { logs } = await instantiateWithFactory({
      codeId: CWCORE_CODE_ID,
      instantiateMsg: Buffer.from(
        JSON.stringify(cwCoreInstantiateMsg),
        'utf8'
      ).toString('base64'),
      label: cwCoreInstantiateMsg.name,
    })
    const contractAddress = findAttribute(
      logs,
      'wasm',
      'set contract admin as itself'
    ).value
    return contractAddress
  }, [generateInstantiateMsg, instantiateWithFactory])

  const parseSubmitterValueDelta = useCallback(
    (value: string): number => {
      switch (value) {
        case t(CreateDaoSubmitLabel.Back):
          return -1
        case t(CreateDaoSubmitLabel.Continue):
        case t(CreateDaoSubmitLabel.Review):
          return 1
        default:
          // Pass a number to step that many pages in either direction.
          const valueNumber = parseInt(value || '1', 10)
          if (!isNaN(valueNumber) && valueNumber !== 0) return valueNumber

          return 0
      }
    },
    [t]
  )

  const [customValidator, setCustomValidator] =
    useState<CreateDaoCustomValidator>()

  const cw20StakedBalanceVotingData =
    votingModuleAdapter.id === Cw20StakedBalanceVotingAdapter.id
      ? (votingModuleAdapter.data as Cw20StakedBalalanceVotingCreationConfig)
      : undefined

  const onSubmit: SubmitHandler<NewDao> = useCallback(
    async (values, event) => {
      // If navigating, no need to display errors.
      form.clearErrors()

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Create the DAO.
      if (submitterValue === t(CreateDaoSubmitLabel.CreateDao)) {
        if (connected) {
          setCreating(true)
          try {
            const coreAddress = await toast.promise(
              createDaoWithFactory().then(
                // TODO: Figure out better solution for detecting block.
                (address) =>
                  // New wallet balances will not appear until the next block.
                  new Promise<string>((resolve) =>
                    setTimeout(() => resolve(address), 6500)
                  )
              ),
              {
                loading: t('info.creatingDao'),
                success: t('success.daoCreatedPleaseWait'),
                error: (err) => processError(err),
              }
            )

            if (coreAddress) {
              setPinned(coreAddress)

              await refreshBalances()

              // Show DAO created modal
              setCreatedDaoCoreAddress(coreAddress)
            }
          } catch (err) {
            // toast.promise above will handle displaying the error
            console.error(err)
          } finally {
            setCreating(false)
          }
        } else {
          toast.error(t('error.connectWalletToCreate'))
        }

        return
      }

      // Save values to state.
      setNewDaoAtom((prevNewDao) => ({
        ...prevNewDao,
        // Deep clone to prevent values from becoming readOnly.
        ...cloneDeep(values),
      }))

      // Clear custom validation function in case next page does not override
      // the previous page's.
      setCustomValidator(undefined)

      // Navigate pages.
      const pageDelta = parseSubmitterValueDelta(submitterValue)
      setPageIndex(
        Math.min(Math.max(0, pageIndex + pageDelta), CreateDaoPages.length - 1)
      )
    },
    [
      form,
      t,
      setNewDaoAtom,
      parseSubmitterValueDelta,
      setPageIndex,
      pageIndex,
      connected,
      createDaoWithFactory,
      setPinned,
      refreshBalances,
    ]
  )

  const onError: SubmitErrorHandler<NewDao> = useCallback(
    (errors, event) => {
      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Allow backwards navigation without valid fields.
      const pageDelta = parseSubmitterValueDelta(submitterValue)
      if (pageDelta < 0) {
        return onSubmit(form.getValues(), event)
      } else {
        console.error('Form errors', errors)
      }
    },
    [form, onSubmit, parseSubmitterValueDelta]
  )

  const _handleSubmit = useMemo(
    () => form.handleSubmit(onSubmit, onError),
    [form, onSubmit, onError]
  )

  const formOnSubmit = useCallback(
    (...args: Parameters<typeof _handleSubmit>) => {
      const nativeEvent = args[0]?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value
      const pageDelta = parseSubmitterValueDelta(submitterValue)

      // Validate here instead of in onSubmit since custom errors prevent
      // form submission, and we still want to be able to move backwards.
      customValidator?.(
        // Only set new errors when progressing. If going back, don't.
        pageDelta > 0
      )

      return _handleSubmit(...args)
    },
    [parseSubmitterValueDelta, customValidator, _handleSubmit]
  )

  const createDaoContext: CreateDaoContext = useMemo(
    () => ({
      form,
      availableVotingModuleAdapters,
      generateInstantiateMsg,
      setCustomValidator: (fn) => setCustomValidator(() => fn),
      votingModuleDaoCreationAdapter,
      proposalModuleDaoCreationAdapters,
    }),
    [
      availableVotingModuleAdapters,
      form,
      generateInstantiateMsg,
      proposalModuleDaoCreationAdapters,
      votingModuleDaoCreationAdapter,
    ]
  )

  const Page = CreateDaoPages[pageIndex]

  return (
    <>
      <RightSidebarContent>
        <DaoCreateSidebarCard
          // Once created, set pageIndex to 4 to show all checkboxes.
          pageIndex={createdDaoCoreAddress ? 4 : pageIndex}
        />
      </RightSidebarContent>

      {/* No container padding because we want the gradient to expand. Apply px-6 to children instead. */}
      <form
        className="flex flex-col items-stretch mx-auto max-w-6xl"
        onSubmit={formOnSubmit}
      >
        <GradientHero childContainerClassName="px-6">
          <PageHeader
            breadcrumbs={{
              crumbs: [
                { href: '/home', label: 'Home' },
                ...getParentDaoBreadcrumbs(parentDao),
              ],
              current:
                name.trim() ||
                (parentDao ? t('title.newSubDao') : t('title.newDao')),
            }}
          />

          {/* Show image selector or DAO header depending on page. */}
          {pageIndex === 0 ? (
            <div className="flex flex-col items-center py-10">
              <ImageSelector
                error={form.formState.errors.imageUrl}
                fieldName="imageUrl"
                register={form.register}
                validation={[validateUrl]}
                watch={form.watch}
              />

              <p className="mt-6 text-text-tertiary primary-text">
                {t('form.addAnImage')}
              </p>
            </div>
          ) : (
            <DaoHeader
              description={description}
              established={t('info.today')}
              imageUrl={imageUrl}
              name={name}
            />
          )}
        </GradientHero>

        <div className="mx-6">
          {/* Divider line shown after first page. */}
          {pageIndex > 0 && (
            <div className="mb-7 w-full h-[1px] bg-border-base"></div>
          )}

          <div className="mb-14">
            <Page {...createDaoContext} />
          </div>

          <div
            className="flex flex-row items-center py-7 border-y border-border-secondary"
            // justify-end doesn't work in tailwind for some reason
            style={{
              justifyContent: showBack ? 'space-between' : 'flex-end',
            }}
          >
            {showBack && (
              <Button
                disabled={creating}
                type="submit"
                value={t(CreateDaoSubmitLabel.Back)}
                variant="secondary"
              >
                <ArrowBack className="!w-4 !h-4 text-icon-primary" />
                <p>{t(CreateDaoSubmitLabel.Back)}</p>
              </Button>
            )}
            <Button loading={creating} type="submit" value={submitValue}>
              {submitValue}
            </Button>
          </div>
        </div>
      </form>

      {createdDaoCoreAddress && (
        <DaoCreatedModal
          itemProps={{
            coreAddress: createdDaoCoreAddress,
            name,
            description,
            imageUrl,
            established: new Date(),
            pinned: isPinned(createdDaoCoreAddress),
            onPin: () =>
              isPinned(createdDaoCoreAddress)
                ? setUnpinned(createdDaoCoreAddress)
                : setPinned(createdDaoCoreAddress),
            showIsMember: false,
            parentDao,
            lazyData: {
              loading: false,
              data: {
                // Does not matter, will not show.
                isMember: false,
                proposalCount: 0,
                // Display governance token supply if using governance tokens.
                ...(votingModuleAdapter.id ===
                  Cw20StakedBalanceVotingAdapter.id &&
                cw20StakedBalanceVotingData
                  ? {
                      tokenBalance:
                        cw20StakedBalanceVotingData.tokenType ===
                        GovernanceTokenType.New
                          ? cw20StakedBalanceVotingData.newInfo.initialSupply
                          : // If using existing token but no token info loaded (should
                          // be impossible), just display 0.
                          !cw20StakedBalanceVotingData.existingGovernanceTokenInfo
                          ? 0
                          : // If using existing token, convert supply from query using decimals.
                            convertMicroDenomToDenomWithDecimals(
                              cw20StakedBalanceVotingData
                                .existingGovernanceTokenInfo.total_supply,
                              cw20StakedBalanceVotingData
                                .existingGovernanceTokenInfo.decimals
                            ),
                      tokenSymbol:
                        cw20StakedBalanceVotingData.tokenType ===
                        GovernanceTokenType.New
                          ? cw20StakedBalanceVotingData.newInfo.symbol
                          : // If using existing token but no token info loaded (should
                          // be impossible), the tokenBalance above will be set to
                          // 0, so use NATIVE_DENOM here so this value is accurate.
                          !cw20StakedBalanceVotingData.existingGovernanceTokenInfo
                          ? nativeTokenLabel(NATIVE_DENOM)
                          : cw20StakedBalanceVotingData
                              .existingGovernanceTokenInfo?.symbol ||
                            t('info.token').toLocaleUpperCase(),
                    }
                  : {
                      tokenBalance: 0,
                      tokenSymbol: nativeTokenLabel(NATIVE_DENOM),
                    }),
              },
            },
          }}
          modalProps={{
            onClose: () => setCreatedDaoCoreAddress(undefined),
          }}
        />
      )}
    </>
  )
}
