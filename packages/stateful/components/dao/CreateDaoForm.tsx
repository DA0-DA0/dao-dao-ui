import { Buffer } from 'buffer'

import { findAttribute } from '@cosmjs/stargate/build/logs'
import { ArrowBack } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { averageColorSelector } from '@dao-dao/state/recoil'
import {
  Button,
  CreateDaoPages,
  DaoCreateSidebarCard,
  DaoHeader,
  ImageSelector,
  PageHeaderContent,
  RightSidebarContent,
  useAppContext,
  useCachedLoadable,
  useNavHelpers,
  useThemeContext,
} from '@dao-dao/stateless'
import {
  CreateDaoContext,
  CreateDaoCustomValidator,
  DaoPageMode,
  DaoParentInfo,
  DaoTabId,
  NewDao,
  ProposalModuleAdapter,
} from '@dao-dao/types'
import { InstantiateMsg as DaoCoreV2InstantiateMsg } from '@dao-dao/types/contracts/DaoCore.v2'
import instantiateSchema from '@dao-dao/types/contracts/DaoCore.v2.instantiate_schema.json'
import {
  CHAIN_ID,
  CODE_ID_CONFIG,
  DaoProposalMultipleAdapterId,
  DaoVotingCw20StakedAdapterId,
  FACTORY_CONTRACT_ADDRESS,
  NATIVE_TOKEN,
  NEW_DAO_CW20_DECIMALS,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  makeValidateMsg,
  processError,
} from '@dao-dao/utils'

import {
  CwAdminFactoryHooks,
  useAwaitNextBlock,
  useFollowingDaos,
  useWalletInfo,
} from '../../hooks'
import { getAdapterById as getProposalModuleAdapterById } from '../../proposal-module-adapter'
import {
  daoCreatedCardPropsAtom,
  makeDefaultNewDao,
  newDaoAtom,
} from '../../recoil/atoms/newDao'
import {
  getAdapterById as getVotingModuleAdapterById,
  getAdapters as getVotingModuleAdapters,
} from '../../voting-module-adapter'
import {
  DaoCreationConfig as DaoVotingCw20StakedCreationConfig,
  GovernanceTokenType,
} from '../../voting-module-adapter/adapters/DaoVotingCw20Staked/types'
import { LinkWrapper } from '../LinkWrapper'
import { SuspenseLoader } from '../SuspenseLoader'
import { Trans } from '../Trans'
import { loadCommonVotingConfigItems } from './commonVotingConfig'

// i18n keys
export enum CreateDaoSubmitValue {
  Back = 'button.goBack',
  Continue = 'button.continue',
  Review = 'button.review',
  Create = 'button.createDAO',
}

export interface CreateDaoFormProps {
  parentDao?: DaoParentInfo

  // Primarily for testing in storybook.
  override?: Partial<NewDao>
  initialPageIndex?: number
}

export const CreateDaoForm = ({
  parentDao,
  override,
  initialPageIndex = 0,
}: CreateDaoFormProps) => {
  const { t } = useTranslation()
  const { goToDao } = useNavHelpers()
  const { setFollowing } = useFollowingDaos()

  const { mode } = useAppContext()

  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )

  const [_newDaoAtom, setNewDaoAtom] = useRecoilState(
    newDaoAtom(parentDao?.coreAddress ?? '')
  )

  // Verify cached value is still valid, and fix if not.
  const defaultForm = useMemo(() => {
    const defaultNewDao = makeDefaultNewDao()

    const cached = cloneDeep(_newDaoAtom)

    // Verify that the voting module adapter is still valid, since the IDs have
    // been renamed a couple times.
    if (
      cached &&
      cached.votingModuleAdapter &&
      !getVotingModuleAdapterById(cached.votingModuleAdapter.id)
    ) {
      cached.votingModuleAdapter = defaultNewDao.votingModuleAdapter
    }
    // Verify that the proposal module adapters are still valid, since the IDs
    // have been renamed a couple times.
    if (
      cached &&
      cached.proposalModuleAdapters &&
      Array.isArray(cached.proposalModuleAdapters)
    ) {
      cached.proposalModuleAdapters = cached.proposalModuleAdapters.filter(
        (adapter) => adapter && getProposalModuleAdapterById(adapter.id)
      )
      if (cached.proposalModuleAdapters.length === 0) {
        cached.proposalModuleAdapters = defaultNewDao.proposalModuleAdapters
      }
    }

    // Merge defaults in case there are any new fields.
    const votingModuleAdapter = getVotingModuleAdapterById(
      cached.votingModuleAdapter.id
    )
    merge(
      // Merges into this object.
      cached.votingModuleAdapter.data,
      // Start with defaults.
      votingModuleAdapter?.daoCreation?.defaultConfig,
      // Overwrite with existing values.
      cached.votingModuleAdapter.data
    )

    cached.proposalModuleAdapters.forEach((adapter) => {
      const proposalModuleAdapter = getProposalModuleAdapterById(adapter.id)
      merge(
        // Merges into this object.
        adapter.data,
        // Start with defaults.
        proposalModuleAdapter?.daoCreation?.extraVotingConfig?.default,
        // Overwrite with existing values.
        adapter.data
      )
    })

    // Ensure voting config object exists.
    if (!cached.votingConfig) {
      cached.votingConfig = defaultNewDao.votingConfig
    }
    merge(
      // Merge into this object.
      cached.votingConfig,
      // Start with defaults.
      defaultNewDao.votingConfig,
      // Overwrite with existing values.
      cached.votingConfig
    )

    return merge(
      // Merges into this object.
      cached,
      // Use overrides passed into component.
      override
    )
  }, [_newDaoAtom, override])

  const form = useForm<NewDao>({
    defaultValues: defaultForm,
    mode: 'onChange',
  })

  const newDao = form.watch()
  const {
    name,
    description,
    imageUrl,
    votingModuleAdapter,
    proposalModuleAdapters,
    votingConfig,
  } = newDao

  const makingSubDao = !!parentDao

  // Debounce saving latest data to atom and thus localStorage every 10 seconds.
  useEffect(() => {
    // If created DAO, don't update.
    if (daoCreatedCardProps) {
      return
    }

    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(() => setNewDaoAtom(cloneDeep(newDao)), 10000)
    return () => clearTimeout(timeout)
  }, [newDao, setNewDaoAtom, daoCreatedCardProps])

  // Set accent color based on image provided.
  const { setAccentColor } = useThemeContext()
  // Get average color of image URL.
  const averageImgColorLoadable = useCachedLoadable(
    !imageUrl ? undefined : averageColorSelector(imageUrl)
  )
  useEffect(() => {
    if (
      averageImgColorLoadable.state !== 'hasValue' ||
      !averageImgColorLoadable.contents
    ) {
      setAccentColor(undefined)
      return
    }

    setAccentColor(averageImgColorLoadable.contents)
  }, [averageImgColorLoadable, imageUrl, setAccentColor])

  //! Page state
  const [pageIndex, setPageIndex] = useState(initialPageIndex)

  const showBack = pageIndex > 0
  const submitValue =
    pageIndex < CreateDaoPages.length - 2
      ? CreateDaoSubmitValue.Continue
      : // Second to last links to the Review page.
      pageIndex === CreateDaoPages.length - 2
      ? CreateDaoSubmitValue.Review
      : // Last page creates the DAO.
        CreateDaoSubmitValue.Create
  const submitLabel =
    // Override with SubDAO button if necessary.
    submitValue === CreateDaoSubmitValue.Create && makingSubDao
      ? t('button.createSubDao')
      : t(submitValue)

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

  // Get enabled proposal module adapters.
  const proposalModuleDaoCreationAdapters = useMemo(
    () =>
      proposalModuleAdapters
        // Filter out multiple choice adapter if not enabled.
        .filter(
          ({ id }) =>
            id !== DaoProposalMultipleAdapterId ||
            votingConfig.enableMultipleChoice
        )
        .map(({ id }) => getProposalModuleAdapterById(id)?.daoCreation)
        // Remove undefined adapters.
        .filter(Boolean) as Required<ProposalModuleAdapter>['daoCreation'][],
    [proposalModuleAdapters, votingConfig.enableMultipleChoice]
  )

  const validateInstantiateMsg = useMemo(
    () => makeValidateMsg<DaoCoreV2InstantiateMsg>(instantiateSchema, t),
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

    // Generate proposal module adapters' instantiation messages.
    const proposalModuleInstantiateInfos =
      proposalModuleDaoCreationAdapters.map(({ getInstantiateInfo }, index) =>
        getInstantiateInfo(newDao, proposalModuleAdapters[index].data, t)
      )

    const instantiateMsg: DaoCoreV2InstantiateMsg = {
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
  const { refreshBalances } = useWalletInfo()

  const instantiateWithFactory =
    CwAdminFactoryHooks.useInstantiateWithAdminFactory({
      contractAddress: FACTORY_CONTRACT_ADDRESS,
      sender: walletAddress ?? '',
    })

  const createDaoWithFactory = useCallback(async () => {
    const cwCoreInstantiateMsg = generateInstantiateMsg()

    const { logs } = await instantiateWithFactory({
      codeId: CODE_ID_CONFIG.DaoCore,
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

  const parseSubmitterValueDelta = useCallback((value: string): number => {
    switch (value) {
      case CreateDaoSubmitValue.Back:
        return -1
      case CreateDaoSubmitValue.Continue:
      case CreateDaoSubmitValue.Review:
        return 1
      default:
        // Pass a number to step that many pages in either direction.
        const valueNumber = parseInt(value || '1', 10)
        if (!isNaN(valueNumber) && valueNumber !== 0) return valueNumber

        return 0
    }
  }, [])

  const [customValidator, setCustomValidator] =
    useState<CreateDaoCustomValidator>()

  const cw20StakedBalanceVotingData =
    votingModuleAdapter.id === DaoVotingCw20StakedAdapterId
      ? (votingModuleAdapter.data as DaoVotingCw20StakedCreationConfig)
      : undefined

  const awaitNextBlock = useAwaitNextBlock()
  const onSubmit: SubmitHandler<NewDao> = useCallback(
    async (values, event) => {
      // If navigating, no need to display errors.
      form.clearErrors()

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Create the DAO.
      if (submitterValue === CreateDaoSubmitValue.Create) {
        if (connected) {
          setCreating(true)
          try {
            const coreAddress = await toast.promise(createDaoWithFactory(), {
              loading: t('info.creatingDao'),
              success: t('success.daoCreatedPleaseWait'),
              error: (err) => processError(err),
            })

            // Don't set following on SDA. Only dApp.
            if (mode !== DaoPageMode.Sda) {
              setFollowing(coreAddress)
            }

            // New wallet balances will not appear until the next block.
            awaitNextBlock().then(refreshBalances)

            //! Show DAO created modal.

            // Get tokenSymbol and tokenBalance for DAO card.
            const { tokenSymbol, tokenBalance, tokenDecimals } =
              votingModuleAdapter.id === DaoVotingCw20StakedAdapterId &&
              cw20StakedBalanceVotingData
                ? //! Display governance token supply if using governance tokens.
                  {
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
                        // 0, so use the native token here so this value is
                        // accurate.
                        !cw20StakedBalanceVotingData.existingGovernanceTokenInfo
                        ? NATIVE_TOKEN.symbol
                        : cw20StakedBalanceVotingData
                            .existingGovernanceTokenInfo?.symbol ||
                          t('info.token').toLocaleUpperCase(),
                    tokenDecimals:
                      cw20StakedBalanceVotingData.tokenType ===
                        GovernanceTokenType.Existing &&
                      cw20StakedBalanceVotingData.existingGovernanceTokenInfo
                        ? cw20StakedBalanceVotingData
                            .existingGovernanceTokenInfo.decimals
                        : // If using existing token but no token info loaded
                          // (should be impossible), the tokenBalance above will be
                          // set to 0, so this doesn't matter.
                          NEW_DAO_CW20_DECIMALS,
                  }
                : //! Otherwise display native token, which has a balance of 0 initially.
                  {
                    tokenBalance: 0,
                    tokenSymbol: NATIVE_TOKEN.symbol,
                    tokenDecimals: NATIVE_TOKEN.decimals,
                  }

            // Set card props to show modal.
            setDaoCreatedCardProps({
              chainId: CHAIN_ID,
              coreAddress,
              name,
              description,
              imageUrl: imageUrl || getFallbackImage(coreAddress),
              established: new Date(),
              showIsMember: false,
              parentDao,
              tokenDecimals,
              tokenSymbol,
              showingEstimatedUsdValue: false,
              lazyData: {
                loading: false,
                data: {
                  tokenBalance,
                  // Does not matter, will not show.
                  isMember: false,
                  proposalCount: 0,
                },
              },
            })

            // Clear saved form data.
            setNewDaoAtom(makeDefaultNewDao())

            // Navigate to DAO page (underneath the creation modal).
            goToDao(coreAddress)
          } catch (err) {
            // toast.promise above will handle displaying the error
            console.error(err)
            setCreating(false)
          }
          // Don't stop creating on success, since we are navigating to a new
          // page and want to prevent creating duplicate DAOs.
        } else {
          toast.error(t('error.logInToCreate'))
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
      setNewDaoAtom,
      parseSubmitterValueDelta,
      pageIndex,
      connected,
      createDaoWithFactory,
      t,
      mode,
      refreshBalances,
      votingModuleAdapter.id,
      cw20StakedBalanceVotingData,
      setDaoCreatedCardProps,
      name,
      description,
      imageUrl,
      parentDao,
      goToDao,
      awaitNextBlock,
      setFollowing,
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
      commonVotingConfig: loadCommonVotingConfigItems(),
      votingModuleDaoCreationAdapter,
      proposalModuleDaoCreationAdapters,
      SuspenseLoader,
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
          pageIndex={daoCreatedCardProps ? 4 : pageIndex}
        />
      </RightSidebarContent>
      <PageHeaderContent
        breadcrumbs={{
          // Use the SubDAOs tab as the home breadcrumb if making a SubDAO.
          homeTab: makingSubDao
            ? {
                id: DaoTabId.SubDaos,
                sdaLabel: t('title.subDaos'),
              }
            : undefined,
          current:
            name.trim() ||
            (makingSubDao ? t('title.newSubDao') : t('title.newDao')),
        }}
        className="mx-auto max-w-4xl"
        gradient
      />

      {/* No container padding because we want the gradient to expand. Apply px-6 to children instead. */}
      <form
        className="relative z-[1] mx-auto flex max-w-4xl flex-col items-stretch"
        onSubmit={formOnSubmit}
      >
        {/* Show image selector or DAO header depending on page. */}
        {pageIndex === 0 ? (
          <div className="flex flex-col items-center py-10">
            <ImageSelector
              Trans={Trans}
              error={form.formState.errors.imageUrl}
              fieldName="imageUrl"
              register={form.register}
              setValue={form.setValue}
              watch={form.watch}
            />

            <p className="primary-text mt-6 text-text-tertiary">
              {t('form.addAnImage')}
            </p>
          </div>
        ) : (
          <DaoHeader
            LinkWrapper={LinkWrapper}
            description={description}
            established={t('info.today')}
            imageUrl={imageUrl}
            name={name}
            parentDao={parentDao}
          />
        )}

        {/* Divider line shown after first page. */}
        {pageIndex > 0 && (
          <div className="mb-7 h-[1px] w-full bg-border-base"></div>
        )}

        <div className="mb-14">
          <Page {...createDaoContext} />
        </div>

        <div
          className="flex flex-row items-center border-y border-border-secondary py-7"
          // justify-end doesn't work in tailwind for some reason
          style={{
            justifyContent: showBack ? 'space-between' : 'flex-end',
          }}
        >
          {showBack && (
            <Button
              disabled={creating}
              type="submit"
              value={CreateDaoSubmitValue.Back}
              variant="secondary"
            >
              <ArrowBack className="!h-4 !w-4 text-icon-primary" />
              <p>{t(CreateDaoSubmitValue.Back)}</p>
            </Button>
          )}
          <Button loading={creating} type="submit" value={submitValue}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </>
  )
}
