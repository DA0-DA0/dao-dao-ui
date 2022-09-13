import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ProposalModuleAdapter,
  getAdapterById as getProposalModuleAdapterById,
} from '@dao-dao/proposal-module-adapter'
import { NewDao } from '@dao-dao/tstypes'
import { InstantiateMsg } from '@dao-dao/tstypes/contracts/cw-core-0.2.0'
import { parseEncodedMessage, processError } from '@dao-dao/utils'
import { getAdapterById as getVotingModuleAdapterById } from '@dao-dao/voting-module-adapter'

import {
  BreadcrumbsProps,
  Checkbox,
  CosmosMessageDisplay,
  DaoCreateConfigReviewCard,
  DaoHeader,
  GradientHero,
  PageHeader,
} from '../../components'

export interface CreateDaoReviewProps {
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs?: BreadcrumbsProps['crumbs']
}

export const CreateDaoReview = ({ extraCrumbs }: CreateDaoReviewProps) => {
  const { t } = useTranslation()

  const { watch } = useFormContext<NewDao>()

  const newDao = watch()
  const {
    name,
    description,
    imageUrl,
    votingModuleAdapter,
    proposalModuleAdapters,
  } = newDao

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
        .filter(Boolean) as ProposalModuleAdapter['daoCreation'][],
    [proposalModuleAdapters]
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

    return instantiateMsg
  }, [
    description,
    imageUrl,
    name,
    newDao,
    proposalModuleAdapters,
    proposalModuleDaoCreationAdapters,
    t,
    votingModuleAdapter.data,
    votingModuleDaoCreationAdapter,
  ])

  const [decodeModuleMessages, setDecodeModuleMessages] = useState(true)
  const togglePreviewRef = useRef<HTMLDivElement>(null)
  const [previewJson, setPreviewJson] = useState<string>()
  const [previewError, setPreviewError] = useState<string>()
  const generatePreview = useCallback(
    (scroll = true) => {
      setPreviewJson(undefined)
      setPreviewError(undefined)

      try {
        const msg = generateInstantiateMsg()
        // Convert encoded module instantiation messages back to readable JSON.
        if (decodeModuleMessages) {
          msg.proposal_modules_instantiate_info.forEach((info) => {
            info.msg = parseEncodedMessage(info.msg)
          })
          msg.voting_module_instantiate_info.msg = parseEncodedMessage(
            msg.voting_module_instantiate_info.msg
          )
        }
        // Pretty print output.
        setPreviewJson(JSON.stringify(msg, undefined, 2))
      } catch (err) {
        console.error(err)
        setPreviewError(processError(err))
      } finally {
        // Scroll to preview output or error.
        if (scroll) {
          togglePreviewRef.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    },
    [decodeModuleMessages, generateInstantiateMsg]
  )

  const togglePreview = useCallback(() => {
    // If already displaying and error does not exist (should always be true
    // together), clear. Otherwise generate the preview. This ensures that if an
    // error occurred, it will still try again.
    if (previewJson && !previewError) {
      setPreviewJson(undefined)
      setPreviewError(undefined)
    } else {
      generatePreview()
    }
  }, [generatePreview, previewError, previewJson])

  // If a message is showing and the function reference updates, indicating that
  // some input (from the dependency array of the useCallback hook) has changed,
  // regenerate the preview but don't forcibly scroll.
  useEffect(() => {
    if (previewJson) {
      generatePreview(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePreview])

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <form className="flex flex-col items-stretch mx-auto max-w-6xl">
      <GradientHero childContainerClassName="px-6">
        <PageHeader
          breadcrumbs={{
            crumbs: [{ href: '/home', label: 'Home' }, ...(extraCrumbs ?? [])],
            current: name,
          }}
        />

        <DaoHeader
          description={description}
          established={t('info.today')}
          imageUrl={imageUrl}
          name={name}
        />
      </GradientHero>

      <div className="pb-6 mx-6 border-y border-t-border-base border-b-border-secondary">
        <p className="mt-9 mb-7 text-text-body title-text">
          {t('title.governanceConfiguration')}
        </p>

        <votingModuleDaoCreationAdapter.governanceConfig.Review
          data={votingModuleAdapter.data}
          newDao={newDao}
        />

        <p className="mt-9 mb-7 text-text-body title-text">
          {t('title.votingConfiguration')}
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-3">
          {votingModuleDaoCreationAdapter.votingConfig.items
            .concat(
              votingModuleDaoCreationAdapter.votingConfig.advancedItems ?? []
            )
            .map(
              (
                {
                  onlyDisplayCondition,
                  Icon,
                  nameI18nKey,
                  tooltipI18nKey,
                  Review,
                  getReviewClassName,
                },
                index
              ) =>
                // If has display condition, check it. Otherwise display.
                (onlyDisplayCondition?.(newDao) ?? true) && (
                  <DaoCreateConfigReviewCard
                    key={index}
                    Icon={Icon}
                    name={t(nameI18nKey)}
                    review={
                      <Review data={votingModuleAdapter.data} newDao={newDao} />
                    }
                    reviewClassName={getReviewClassName?.(
                      votingModuleAdapter.data
                    )}
                    tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                  />
                )
            )}
          {proposalModuleDaoCreationAdapters.flatMap(
            ({ votingConfig: { items, advancedItems } }, index) =>
              items.concat(advancedItems ?? []).map(
                (
                  {
                    onlyDisplayCondition,
                    Icon,
                    nameI18nKey,
                    tooltipI18nKey,
                    Review,
                    getReviewClassName,
                  },
                  itemIndex
                ) =>
                  // If has display condition, check it. Otherwise display.
                  (onlyDisplayCondition?.(newDao) ?? true) && (
                    <DaoCreateConfigReviewCard
                      key={`${index}:${itemIndex}`}
                      Icon={Icon}
                      name={t(nameI18nKey)}
                      review={
                        <Review
                          data={proposalModuleAdapters[index].data}
                          newDao={newDao}
                        />
                      }
                      reviewClassName={getReviewClassName?.(
                        proposalModuleAdapters[index].data
                      )}
                      tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                    />
                  )
              )
          )}
        </div>

        <div
          className="flex flex-row flex-wrap gap-6 items-center mt-8"
          ref={togglePreviewRef}
        >
          <div className="flex flex-row gap-2 items-center">
            <Checkbox checked={!!previewJson} onClick={togglePreview} />

            <p className="cursor-pointer body-text" onClick={togglePreview}>
              {t('button.showInstantiateMessage')}
            </p>
          </div>

          {!!previewJson && (
            <div className="flex flex-row gap-2 items-center">
              <Checkbox
                checked={decodeModuleMessages}
                onClick={() => setDecodeModuleMessages((d) => !d)}
              />

              <p
                className="cursor-pointer body-text"
                onClick={() => setDecodeModuleMessages((d) => !d)}
              >
                {t('button.withDecodedModuleMessages')}
              </p>
            </div>
          )}
        </div>
        {previewJson && (
          <div className="mt-4">
            <CosmosMessageDisplay value={previewJson} />
          </div>
        )}
        {previewError && <p className="mt-4 text-error">{previewError}</p>}
      </div>
    </form>
  )
}
