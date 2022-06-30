import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useCallback, useState } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { Button, CosmosMessageDisplay, Logo } from '@dao-dao/ui'
import { parseEncodedMessage } from '@dao-dao/utils'

import { NewDAOStructure } from '@/atoms'
import {
  CreateDAOAllowRevotingCard,
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

const CreateDAOReviewPage: NextPage = () => {
  const { t } = useTranslation()
  const {
    watchedNewDAO,
    creating,
    formWrapperProps,
    register,
    setValue,
    watch,
    makeCreateDAOMsg,
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

  const [previewJson, setPreviewJson] = useState<string>()
  const [previewError, setPreviewError] = useState<string>()
  const togglePreview = useCallback(() => {
    setPreviewJson('')
    setPreviewError('')

    // If already displaying, do nothing since it was cleared above.
    if (previewJson && !previewError) {
      return
    }

    try {
      const msg = makeCreateDAOMsg(watchedNewDAO)
      msg.proposal_modules_instantiate_info.forEach((info) => {
        info.msg = parseEncodedMessage(info.msg)
      })
      msg.voting_module_instantiate_info.msg = parseEncodedMessage(
        msg.voting_module_instantiate_info.msg
      )
      setPreviewJson(JSON.stringify(msg, undefined, 2))
    } catch (err) {
      console.error(err)
      setPreviewError(err instanceof Error ? err.message : `${err}`)
    }
  }, [makeCreateDAOMsg, previewError, previewJson, watchedNewDAO])

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="flex flex-col items-stretch gap-6 rounded-lg bg-disabled py-6 md:gap-10 md:py-10">
          <div className="mx-auto grid w-5/6 grid-cols-[1fr_2fr] items-center justify-center gap-16">
            <div className="flex flex-col items-center">
              <div
                className={clsx('h-24 w-24 overflow-hidden rounded-full', {
                  'animate-spin-medium': creating,
                })}
              >
                {watchedNewDAO.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={t('info.daosLogo')}
                    className="h-full w-full object-cover"
                    src={watchedNewDAO.imageUrl}
                  />
                ) : (
                  <Logo alt={t('info.daodaoLogo')} height="100%" width="100%" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="caption-text font-mono">{t('form.name')}</p>
                <p className="text-xl">{watchedNewDAO.name}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="caption-text font-mono">
                  {t('form.description')}
                </p>
                <p
                  className={clsx('secondary-text', {
                    'text-base': watchedNewDAO.description,
                    'text-sm italic': !watchedNewDAO.description,
                  })}
                >
                  {watchedNewDAO.description || t('info.none')}
                </p>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-card"></div>

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
          <CreateDAOAllowRevotingCard {...configCardProps} />
          <CreateDAOThresholdCard {...configCardProps} />
          <CreateDAOQuorumCard {...configCardProps} />
        </div>

        <div className="flex w-full flex-col items-end">
          <Button
            className={clsx('mt-8 justify-end', {
              'mb-4': previewJson || previewError,
            })}
            onClick={togglePreview}
            size="sm"
            variant="secondary"
          >
            {previewJson
              ? t('button.hideInstantiateMessage')
              : t('button.showInstantiateMessage')}
          </Button>
        </div>
        {previewJson && <CosmosMessageDisplay value={previewJson} />}
        {previewError && <p className="text-error">{previewError}</p>}
      </CreateDAOFormWrapper>
    </>
  )
}

export default CreateDAOReviewPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
