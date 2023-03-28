import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'
import { parseEncodedMessage, processError } from '@dao-dao/utils'

import { CosmosMessageDisplay } from '../../../CosmosMessageDisplay'
import { Checkbox } from '../../../inputs/Checkbox'
import { DaoCreateConfigReviewCard } from '../DaoCreateConfigReviewCard'

export const CreateDaoReview = ({
  form: { watch },
  commonVotingConfig,
  votingModuleDaoCreationAdapter,
  proposalModuleDaoCreationAdapters,
  generateInstantiateMsg,
}: CreateDaoContext) => {
  const { t } = useTranslation()

  const newDao = watch()
  const { votingModuleAdapter, proposalModuleAdapters, votingConfig } = newDao

  const [decodeModuleMessages, setDecodeModuleMessages] = useState(true)
  const togglePreviewRef = useRef<HTMLDivElement>(null)
  const [previewJson, setPreviewJson] = useState<string>()
  const [previewError, setPreviewError] = useState<string>()
  const [scrollToPreview, setScrollToPreview] = useState(false)
  const generatePreview = useCallback(
    (scroll = true) => {
      setPreviewJson(undefined)
      setPreviewError(undefined)

      try {
        const msg = generateInstantiateMsg()
        // Convert encoded module instantiation messages back to readable JSON.
        if (decodeModuleMessages) {
          msg.proposal_modules_instantiate_info.forEach((info) => {
            const msg = parseEncodedMessage(info.msg)

            // Convert encoded pre_propose_info message back to readable JSON.
            if (
              'pre_propose_info' in msg &&
              'module_may_propose' in msg.pre_propose_info &&
              'info' in msg.pre_propose_info.module_may_propose &&
              'msg' in msg.pre_propose_info.module_may_propose.info
            ) {
              msg.pre_propose_info.module_may_propose.info.msg =
                parseEncodedMessage(
                  msg.pre_propose_info.module_may_propose.info.msg
                )
            }

            info.msg = msg
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
        // Scroll to preview output or error once the state updates.
        setScrollToPreview(scroll)
      }
    },
    [decodeModuleMessages, generateInstantiateMsg]
  )
  // When scrollToPreview is true and either previewJson or previewError is set,
  // scroll to it. This effect waits for the state to update before scrolling,
  // since the DOM needs time to render.
  useEffect(() => {
    if (!scrollToPreview || (!previewJson && !previewError)) {
      return
    }

    // Scroll.
    togglePreviewRef.current?.scrollIntoView({
      behavior: 'smooth',
    })

    setScrollToPreview(false)
  }, [previewJson, previewError, scrollToPreview])

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
    <>
      <p className="title-text mt-9 mb-7 text-text-body">
        {t('title.governanceConfiguration')}
      </p>

      <votingModuleDaoCreationAdapter.governanceConfig.Review
        data={votingModuleAdapter.data}
        newDao={newDao}
      />

      <p className="title-text mt-9 mb-7 text-text-body">
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
          (
            { extraVotingConfig: { items = [], advancedItems = [] } = {} },
            index
          ) =>
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
        {[...commonVotingConfig.items, ...commonVotingConfig.advancedItems].map(
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
                review={<Review data={votingConfig} newDao={newDao} />}
                reviewClassName={getReviewClassName?.(votingConfig)}
                tooltip={tooltipI18nKey && t(tooltipI18nKey)}
              />
            )
        )}
      </div>

      <div
        className="mt-8 flex flex-row flex-wrap items-center gap-6"
        ref={togglePreviewRef}
      >
        <div className="flex flex-row items-center gap-2">
          <Checkbox checked={!!previewJson} onClick={togglePreview} />

          <p className="body-text cursor-pointer" onClick={togglePreview}>
            {t('button.showInstantiateMessage')}
          </p>
        </div>

        {!!previewJson && (
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              checked={decodeModuleMessages}
              onClick={() => setDecodeModuleMessages((d) => !d)}
            />

            <p
              className="body-text cursor-pointer"
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
      {previewError && (
        <p className="mt-4 text-text-interactive-error">{previewError}</p>
      )}
    </>
  )
}
