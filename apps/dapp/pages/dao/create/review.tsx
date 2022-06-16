import clsx from 'clsx'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
import { Logo } from '@dao-dao/ui'

import { NewDAOStructure } from '@/atoms'
import {
  CreateDAOFormWrapper,
  CreateDAOProposalDepositCard,
  CreateDAOQuorumCard,
  CreateDAORefundFailedProposalDepositCard,
  CreateDAOThresholdCard,
  CreateDAOUnstakingDurationCard,
  CreateDAOVotingDurationCard,
  SmallScreenNav,
  VotingPowerPieDistribution,
} from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOReviewPage: FC = () => {
  const {
    watchedNewDAO,
    creating,
    formWrapperProps,
    register,
    setValue,
    watch,
  } = useCreateDAOForm(2)

  const governanceTokenEnabled =
    watchedNewDAO.structure === NewDAOStructure.GovernanceToken

  const configCardProps = {
    newDAO: watchedNewDAO,
    register,
    setValue,
    watch,
    readOnly: true,
  }

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="flex flex-col gap-6 items-stretch py-6 bg-disabled rounded-lg md:gap-10 md:py-10">
          <div className="grid grid-cols-[1fr_2fr] gap-16 justify-center items-center mx-auto w-5/6">
            <div className="flex flex-col items-center">
              <div
                className={clsx('overflow-hidden w-24 h-24 rounded-full', {
                  'animate-spin-medium': creating,
                })}
              >
                {watchedNewDAO.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="DAO Logo"
                    className="w-full h-full"
                    src={watchedNewDAO.imageUrl}
                  />
                ) : (
                  <Logo alt="DAO DAO logo" height="100%" width="100%" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="font-mono caption-text">{i18n.t('DAO Name')}</p>
                <p className="text-xl">{watchedNewDAO.name}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-mono caption-text">
                  {i18n.t('DAO Description')}
                </p>
                <p
                  className={clsx('secondary-text', {
                    'text-base': watchedNewDAO.description,
                    'text-sm italic': !watchedNewDAO.description,
                  })}
                >
                  {watchedNewDAO.description || i18n.t('None')}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-card"></div>

          <div className="mx-auto w-5/6">
            <VotingPowerPieDistribution newDAO={watchedNewDAO} />
          </div>
        </div>

        <div className="mt-3 space-y-3">
          <CreateDAOVotingDurationCard {...configCardProps} />
          {governanceTokenEnabled && (
            <>
              {!!watchedNewDAO.governanceTokenOptions.proposalDeposit
                ?.value && (
                <>
                  <CreateDAOProposalDepositCard {...configCardProps} />
                  <CreateDAORefundFailedProposalDepositCard
                    {...configCardProps}
                  />
                </>
              )}

              <CreateDAOUnstakingDurationCard {...configCardProps} />
            </>
          )}
          <CreateDAOThresholdCard {...configCardProps} />
          <CreateDAOQuorumCard {...configCardProps} />
        </div>
      </CreateDAOFormWrapper>
    </>
  )
}

export default CreateDAOReviewPage
