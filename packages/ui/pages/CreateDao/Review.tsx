import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ProposalModuleAdapter,
  getAdapterById as getProposalModuleAdapterById,
} from '@dao-dao/proposal-module-adapter'
import { NewDao } from '@dao-dao/tstypes'
import { getAdapterById as getVotingModuleAdapterById } from '@dao-dao/voting-module-adapter'

import {
  BreadcrumbsProps,
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
  // const generateInstantiateMsg = useCallback(() => {
  //   // Generate voting module adapter instantiation message.
  //   const votingModuleInstantiateInfo =
  //     votingModuleDaoCreationAdapter.getInstantiateInfo(
  //       newDao,
  //       votingModuleAdapter.data,
  //       t
  //     )

  //   // Generate proposal module adapters instantiation messages.
  //   const proposalModuleInstantiateInfos =
  //     proposalModuleDaoCreationAdapters.map(({ getInstantiateInfo }, index) =>
  //       getInstantiateInfo(newDao, proposalModuleAdapters[index].data, t)
  //     )

  //   const instantiateMsg: InstantiateMsg = {
  //     admin: null,
  //     automatically_add_cw20s: true,
  //     automatically_add_cw721s: true,
  //     description,
  //     image_url: imageUrl ?? null,
  //     name,
  //     proposal_modules_instantiate_info: proposalModuleInstantiateInfos,
  //     voting_module_instantiate_info: votingModuleInstantiateInfo,
  //   }

  //   return instantiateMsg
  // }, [
  //   description,
  //   imageUrl,
  //   name,
  //   newDao,
  //   proposalModuleAdapters,
  //   proposalModuleDaoCreationAdapters,
  //   t,
  //   votingModuleAdapter.data,
  //   votingModuleDaoCreationAdapter,
  // ])

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
      </div>
    </form>
  )
}
