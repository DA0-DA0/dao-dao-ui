import { ArrowBack } from '@mui/icons-material'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import { useEffect, useMemo, useState } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilState, useRecoilValue } from 'recoil'

import { averageColorSelector, walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  Button,
  ChainProvider,
  CreateDaoPages,
  DaoHeader,
  ImageSelector,
  Loader,
  TooltipInfoIcon,
  useAppContext,
  useCachedLoadable,
  useDaoNavHelpers,
  useSupportedChainContext,
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
  CHAIN_GAS_MULTIPLIER,
  DaoProposalMultipleAdapterId,
  NEW_DAO_TOKEN_DECIMALS,
  TokenBasedCreatorId,
  convertMicroDenomToDenomWithDecimals,
  encodeMessageAsBase64,
  findWasmAttributeValue,
  getFallbackImage,
  getFundsFromDaoInstantiateMsg,
  getNativeTokenForChainId,
  getSupportedChainConfig,
  getSupportedChains,
  makeValidateMsg,
  processError,
} from '@dao-dao/utils'

import { getCreatorById, getCreators } from '../../creators'
import {
  GovernanceTokenType,
  CreatorData as TokenBasedCreatorData,
} from '../../creators/TokenBased/types'
import {
  CwAdminFactoryHooks,
  useAwaitNextBlock,
  useFollowingDaos,
  useQuerySyncedRecoilState,
  useWallet,
  useWalletInfo,
} from '../../hooks'
import { getAdapterById as getProposalModuleAdapterById } from '../../proposal-module-adapter'
import {
  daoCreatedCardPropsAtom,
  makeDefaultNewDao,
  newDaoAtom,
} from '../../recoil/atoms/newDao'
import { LinkWrapper } from '../LinkWrapper'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { TokenAmountDisplay } from '../TokenAmountDisplay'
import { Trans } from '../Trans'
import { WalletChainSwitcher } from '../wallet'
import { loadCommonVotingConfigItems } from './commonVotingConfig'
import { ImportMultisigModal } from './ImportMultisigModal'

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

export const CreateDaoForm = (props: CreateDaoFormProps) => {
  // Sync chain ID in query param.
  const [, setWalletChainId] = useQuerySyncedRecoilState({
    // If parent DAO exists, we use the parent DAO's chain, so no need to sync
    // this in state as it won't be used.
    param: props.parentDao ? undefined : 'chain',
    atom: walletChainIdAtom,
  })

  // If parent DAO exists, we're making a SubDAO, so use the parent DAO's chain.
  const chainId = useRecoilValue(
    props.parentDao ? constSelector(props.parentDao.chainId) : walletChainIdAtom
  )

  const config = getSupportedChainConfig(chainId)
  // Switch to a valid chain if not a valid supported chain.
  useEffect(() => {
    if (!config) {
      setWalletChainId(getSupportedChains()[0].chainId)
    }
  }, [config, setWalletChainId])

  if (!config) {
    return <Loader />
  }

  return (
    <ChainProvider key={chainId} chainId={chainId}>
      <InnerCreateDaoForm {...props} />
    </ChainProvider>
  )
}

export const InnerCreateDaoForm = ({
  parentDao,
  override,
  initialPageIndex = 0,
}: CreateDaoFormProps) => {
  const { t } = useTranslation()

  const chainContext = useSupportedChainContext()
  const {
    chainId,
    config: { factoryContractAddress, codeIds },
  } = chainContext

  const { goToDao } = useDaoNavHelpers()
  const { setFollowing } = useFollowingDaos(chainId)

  const { mode } = useAppContext()

  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )

  const [_newDaoAtom, setNewDaoAtom] = useRecoilState(
    newDaoAtom({
      chainId,
      parentDaoAddress: parentDao?.coreAddress,
    })
  )

  // Verify cached value is still valid, and fix if not.
  const defaultForm = useMemo(() => {
    const defaultNewDao = makeDefaultNewDao(chainId)

    const cached = cloneDeep(_newDaoAtom)

    // Verify that the creator is still valid, since the IDs have been renamed a
    // couple times.
    if (!cached?.creator || !getCreatorById(cached.creator.id)) {
      cached.creator = defaultNewDao.creator
    }
    // Verify that the proposal module adapters are still valid, since the IDs
    // have been renamed a couple times.
    if (
      cached?.proposalModuleAdapters &&
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
    const creator = getCreatorById(cached.creator.id)
    cached.creator.data = merge(
      {},
      // Start with defaults.
      creator?.defaultConfig,
      // Overwrite with existing values.
      cached.creator.data
    )

    cached.proposalModuleAdapters?.forEach((adapter) => {
      const proposalModuleAdapter = getProposalModuleAdapterById(adapter.id)
      adapter.data = merge(
        {},
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
    cached.votingConfig = merge(
      {},
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
  }, [_newDaoAtom, chainId, override])

  const form = useForm<NewDao>({
    defaultValues: defaultForm,
    mode: 'onChange',
  })

  const newDao = form.watch()
  const {
    name,
    description,
    imageUrl,
    creator: { id: creatorId, data: creatorData },
    proposalModuleAdapters,
    votingConfig,
  } = newDao

  // If chain ID changes, update form values.
  useEffect(() => {
    if (newDao.chainId !== chainId) {
      form.reset(_newDaoAtom)
    }
  }, [_newDaoAtom, chainId, form, newDao.chainId])

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

  // Get available creators.
  const availableCreators: CreateDaoContext['availableCreators'] = useMemo(
    () => getCreators(),
    []
  )

  // Get selected creator.
  const creator = useMemo(() => getCreatorById(creatorId), [creatorId])
  if (!creator) {
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

  let instantiateMsg: DaoCoreV2InstantiateMsg | undefined
  let instantiateMsgError: string | undefined
  try {
    // Generate proposal module adapters' instantiation messages.
    const proposalModuleInstantiateInfos =
      proposalModuleDaoCreationAdapters.map(({ getInstantiateInfo }, index) =>
        getInstantiateInfo(
          chainContext.config,
          newDao,
          proposalModuleAdapters[index].data,
          t
        )
      )

    instantiateMsg = {
      // If parentDao exists, let's make a subDAO :D
      admin: parentDao?.coreAddress ?? null,
      automatically_add_cw20s: true,
      automatically_add_cw721s: true,
      description,
      image_url: imageUrl ?? null,
      name: name.trim(),
      proposal_modules_instantiate_info: proposalModuleInstantiateInfos,
      // Placeholder. Should be replaced by creator's mutate function.
      voting_module_instantiate_info: {
        code_id: -1,
        funds: [],
        label: '',
        msg: '',
      },
    }

    // Mutate instantiateMsg via creator. Voting module adapter should be set
    // through this.
    instantiateMsg = creator.mutate(
      instantiateMsg,
      newDao,
      creatorData,
      t,
      codeIds
    )

    // Validate and throw error if invalid according to JSON schema.
    validateInstantiateMsg(instantiateMsg)
  } catch (err) {
    instantiateMsgError = err instanceof Error ? err.message : `${err}`
  }

  const instantiateMsgFunds =
    instantiateMsg && getFundsFromDaoInstantiateMsg(instantiateMsg)

  //! Submit handlers

  const [creating, setCreating] = useState(false)
  const { isWalletConnected, address: walletAddress } = useWallet()
  const { refreshBalances } = useWalletInfo()

  const instantiateWithFactory =
    CwAdminFactoryHooks.useInstantiateWithAdminFactory({
      contractAddress: factoryContractAddress,
      sender: walletAddress ?? '',
    })

  const createDaoWithFactory = async () => {
    if (instantiateMsgError) {
      throw new Error(instantiateMsgError)
    } else if (!instantiateMsg) {
      throw new Error(t('error.loadingData'))
    }

    const { logs } = await instantiateWithFactory(
      {
        codeId: codeIds.DaoCore,
        instantiateMsg: encodeMessageAsBase64(instantiateMsg),
        label: instantiateMsg.name,
      },
      CHAIN_GAS_MULTIPLIER,
      undefined,
      getFundsFromDaoInstantiateMsg(instantiateMsg)
    )
    return findWasmAttributeValue(
      logs,
      factoryContractAddress,
      'set contract admin as itself'
    )!
  }

  const parseSubmitterValueDelta = (value: string): number => {
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
  }

  const [customValidator, setCustomValidator] =
    useState<CreateDaoCustomValidator>()

  const daoVotingTokenBasedCreatorData =
    creatorId === TokenBasedCreatorId
      ? (creatorData as TokenBasedCreatorData)
      : undefined

  const awaitNextBlock = useAwaitNextBlock()
  const onSubmit: SubmitHandler<NewDao> = async (values, event) => {
    // If navigating, no need to display errors.
    form.clearErrors()

    const nativeEvent = event?.nativeEvent as SubmitEvent
    const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

    // Create the DAO.
    if (submitterValue === CreateDaoSubmitValue.Create) {
      if (isWalletConnected) {
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

          const nativeToken = getNativeTokenForChainId(chainId)

          // Get tokenSymbol and tokenBalance for DAO card.
          const { tokenSymbol, tokenBalance, tokenDecimals } =
            creatorId === TokenBasedCreatorId && daoVotingTokenBasedCreatorData
              ? //! Display governance token supply if using governance tokens.
                {
                  tokenBalance:
                    daoVotingTokenBasedCreatorData.tokenType ===
                    GovernanceTokenType.New
                      ? daoVotingTokenBasedCreatorData.newInfo.initialSupply
                      : // If using existing token but no token info loaded (should
                      // be impossible), just display 0.
                      !daoVotingTokenBasedCreatorData.existingToken ||
                        daoVotingTokenBasedCreatorData.existingTokenSupply ===
                          undefined
                      ? 0
                      : // If using existing token, convert supply from query using decimals.
                        convertMicroDenomToDenomWithDecimals(
                          daoVotingTokenBasedCreatorData.existingTokenSupply,
                          daoVotingTokenBasedCreatorData.existingToken.decimals
                        ),
                  tokenSymbol:
                    daoVotingTokenBasedCreatorData.tokenType ===
                    GovernanceTokenType.New
                      ? daoVotingTokenBasedCreatorData.newInfo.symbol
                      : // If using existing token but no token info loaded (should
                      // be impossible), the tokenBalance above will be set to
                      // 0, so use the native token here so this value is
                      // accurate.
                      !daoVotingTokenBasedCreatorData.existingToken
                      ? nativeToken.symbol
                      : daoVotingTokenBasedCreatorData.existingToken.symbol ||
                        t('info.token').toLocaleUpperCase(),
                  tokenDecimals:
                    daoVotingTokenBasedCreatorData.tokenType ===
                      GovernanceTokenType.Existing &&
                    daoVotingTokenBasedCreatorData.existingToken
                      ? daoVotingTokenBasedCreatorData.existingToken.decimals
                      : // If using existing token but no token info loaded
                        // (should be impossible), the tokenBalance above will
                        // be set to 0, so it doesn't matter that this is
                        // wrong.
                        NEW_DAO_TOKEN_DECIMALS,
                }
              : //! Otherwise display native token, which has a balance of 0 initially.
                {
                  tokenBalance: 0,
                  tokenSymbol: nativeToken.symbol,
                  tokenDecimals: nativeToken.decimals,
                }

          // Set card props to show modal.
          setDaoCreatedCardProps({
            chainId,
            coreAddress,
            name,
            description,
            imageUrl: imageUrl || getFallbackImage(coreAddress),
            polytoneProxies: {},
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
          setNewDaoAtom(makeDefaultNewDao(chainId))

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
  }

  const onError: SubmitErrorHandler<NewDao> = (errors, event) => {
    const nativeEvent = event?.nativeEvent as SubmitEvent
    const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

    // Allow backwards navigation without valid fields.
    const pageDelta = parseSubmitterValueDelta(submitterValue)
    if (pageDelta < 0) {
      return onSubmit(form.getValues(), event)
    } else {
      console.error('Form errors', errors)
    }
  }

  const _handleSubmit = form.handleSubmit(onSubmit, onError)
  const formOnSubmit = (...args: Parameters<typeof _handleSubmit>) => {
    const nativeEvent = args[0]?.nativeEvent as SubmitEvent
    const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value
    const pageDelta = parseSubmitterValueDelta(submitterValue)

    // Validate here instead of in onSubmit since custom errors prevent form
    // submission, and we still want to be able to move backwards.
    customValidator?.(
      // Only set new errors when progressing. If going back, don't.
      pageDelta > 0
    )

    return _handleSubmit(...args)
  }

  const createDaoContext: CreateDaoContext = {
    form,
    instantiateMsg,
    instantiateMsgError,
    setCustomValidator: (fn) => setCustomValidator(() => fn),
    commonVotingConfig: loadCommonVotingConfigItems(),
    availableCreators,
    creator,
    proposalModuleDaoCreationAdapters,
    makeDefaultNewDao,
    SuspenseLoader,
    ImportMultisigModal,
  }

  const Page = CreateDaoPages[pageIndex]

  return (
    <>
      {/* <RightSidebarContent>
        <DaoCreateSidebarCard
          // Once created, set pageIndex to 4 to show all checkboxes.
          pageIndex={daoCreatedCardProps ? 4 : pageIndex}
        />
      </RightSidebarContent> */}

      <PageHeaderContent
        breadcrumbs={{
          className: !makingSubDao ? 'hidden md:flex' : undefined,
          // Use the SubDAOs tab as the home breadcrumb if making a SubDAO.
          homeTab: makingSubDao
            ? {
                id: DaoTabId.SubDaos,
                sdaLabel: t('title.subDaos'),
              }
            : undefined,
          current: makingSubDao ? t('title.newSubDao') : t('title.newDao'),
        }}
        centerNode={
          !makingSubDao && (
            <WalletChainSwitcher
              buttonClassName="md:hidden"
              headerMode
              selectedLabelClassName="hidden xs:block"
            />
          )
        }
        rightNode={
          !makingSubDao && (
            <WalletChainSwitcher buttonClassName="hidden md:block" headerMode />
          )
        }
      />

      {/* No container padding because we want the gradient to expand. Apply px-6 to children instead. */}
      <form
        className="relative z-[1] flex flex-col items-stretch"
        onSubmit={formOnSubmit}
      >
        {/* Show image selector or DAO header depending on page. */}
        {pageIndex === 0 ? (
          <div className="flex flex-col items-center pb-10">
            <ImageSelector
              Trans={Trans}
              className="md:mt-10"
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
            className="mb-8 md:mt-4 md:mb-12"
            description={description}
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
          <FormProvider {...form}>
            <Page {...createDaoContext} />
          </FormProvider>

          {/* If funds are required, display on last page. */}
          {pageIndex === CreateDaoPages.length - 1 &&
            !!instantiateMsgFunds?.length &&
            instantiateMsgFunds.some(({ amount }) => amount !== '0') && (
              <div className="mt-6 -mb-8 flex flex-row justify-end">
                <div className="flex flex-col items-end gap-2">
                  <div className="flex flex-row items-center gap-1 self-start">
                    <p className="primary-text text-text-body">
                      {t('title.fees')}
                    </p>
                    <TooltipInfoIcon
                      size="sm"
                      title={t('info.createDaoFeesExplanation')}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    {instantiateMsgFunds.map((coin, index) => (
                      <TokenAmountDisplay
                        key={coin.denom + index}
                        coin={coin}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
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
