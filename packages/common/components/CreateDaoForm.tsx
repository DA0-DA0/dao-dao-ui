import { findAttribute } from '@cosmjs/stargate/build/logs'
import { ArrowBack } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
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
  NewDao,
} from '@dao-dao/tstypes'
import { InstantiateMsg } from '@dao-dao/tstypes/contracts/cw-core-0.2.0'
import {
  BreadcrumbsProps,
  Button,
  CreateDaoPages,
  DaoHeader,
  GradientHero,
  ImageSelector,
  PageHeader,
  useAppLayoutContext,
  useThemeContext,
} from '@dao-dao/ui'
import {
  CWCORE_CODE_ID,
  V1_FACTORY_CONTRACT_ADDRESS,
  makeValidateMsg,
  processError,
  validateUrl,
} from '@dao-dao/utils'
import {
  getAdapterById as getVotingModuleAdapterById,
  getAdapters as getVotingModuleAdapters,
} from '@dao-dao/voting-module-adapter'

// i18n keys
export enum CreateDaoSubmitLabel {
  Back = 'button.goBack',
  Continue = 'button.continue',
  Review = 'button.review',
  CreateDao = 'button.createDAO',
}

export interface CreateDaoFormProps {
  children: ReactNode
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs?: BreadcrumbsProps['crumbs']

  // Primarily for testing in storybook.
  defaults?: Partial<NewDao>
  initialPageIndex?: number
}

// TODO: Add NextSeo with title description and URL in page that uses this component.
export const CreateDaoForm = ({
  extraCrumbs,
  defaults,
  initialPageIndex = 0,
}: CreateDaoFormProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { setPinned } = usePinnedDaos()

  const [_newDaoAtom, setNewDaoAtom] = useRecoilState(newDaoAtom)
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
    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(() => setNewDaoAtom(cloneDeep(newDao)), 10000)
    return () => clearTimeout(timeout)
  }, [newDao, setNewDaoAtom])

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
  const { pageIndex, setPageIndex } = useAppLayoutContext().daoCreation
  // Initialize on mount.
  // TODO: Check if this method of initializing page index causes problems when
  // creating a DAO more than once without refreshing the page. Might need to
  // use a router hook that checks when this component is re-displayed.
  useEffect(() => {
    setPageIndex(initialPageIndex)
  }, [initialPageIndex, setPageIndex])

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
    () => makeValidateMsg<InstantiateMsg>(instantiateSchema, t),
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

    const instantiateMsg: InstantiateMsg = {
      admin: null,
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
            const address = await toast.promise(
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

            if (address) {
              setPinned(address)

              await refreshBalances()

              // Clear saved creation data.
              setNewDaoAtom(DefaultNewDao)
              router.push(`/dao/${address}`)
              // Don't stop creating loading on success since we're
              // navigating, and it's weird when loading stops and
              // nothing happens for a sec.
            }
          } catch (err) {
            // toast.promise above will handle displaying the error
            console.error(err)
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
      router,
    ]
  )

  const onError: SubmitErrorHandler<NewDao> = useCallback(
    (_, event) => {
      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Allow backwards navigation without valid fields.
      const pageDelta = parseSubmitterValueDelta(submitterValue)
      if (pageDelta < 0) {
        return onSubmit(form.getValues(), event)
      }
    },
    [form, onSubmit, parseSubmitterValueDelta]
  )

  const _handleSubmit = useMemo(
    () => form.handleSubmit(onSubmit, onError),
    [form, onSubmit, onError]
  )

  const [customValidator, setCustomValidator] =
    useState<CreateDaoCustomValidator>()
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
      setCustomValidator,
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
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <form
      className="flex flex-col items-stretch mx-auto max-w-6xl"
      onSubmit={formOnSubmit}
    >
      <GradientHero childContainerClassName="px-6">
        <PageHeader
          breadcrumbs={{
            crumbs: [{ href: '/home', label: 'Home' }, ...(extraCrumbs ?? [])],
            current: name.trim() || t('title.newDao'),
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
          {/* SubmitButton (input tags) can't display the loading spinner. */}
          <Button loading={creating} type="submit" value={submitValue}>
            {submitValue}
          </Button>
        </div>
      </div>
    </form>
  )
}
