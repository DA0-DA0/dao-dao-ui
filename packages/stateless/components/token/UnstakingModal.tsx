import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { UnstakingTask } from '@dao-dao/types'

import { Button } from '../buttons/Button'
import { Modal, ModalProps } from '../modals/Modal'
import { UnstakingLine } from './UnstakingLine'
import { UnstakingTaskStatus } from './UnstakingStatus'

export interface UnstakingModalProps extends Omit<ModalProps, 'children'> {
  unstakingDuration?: string
  tasks: UnstakingTask[]
  onClaim?: () => void
  refresh?: () => void
}

export const UnstakingModal = ({
  unstakingDuration,
  tasks,
  containerClassName,
  onClaim,
  refresh,
  ...modalProps
}: UnstakingModalProps) => {
  const { t } = useTranslation()

  modalProps.header = {
    title: modalProps.header?.title || t('title.unstaking'),
    subtitle:
      modalProps.header?.subtitle ||
      (unstakingDuration
        ? t('info.unstakingDurationExplanation', {
            duration: unstakingDuration,
          })
        : t('info.unstakingDurationNoneExplanation')),
  }

  // Combine into tasks grouped by token.
  const readyToClaim = useMemo(
    () =>
      tasks
        .filter(({ status }) => status === UnstakingTaskStatus.ReadyToClaim)
        .sort(
          (a, b) =>
            // Place undefined last.
            (a.date?.getTime() ?? Infinity) - (b.date?.getTime() ?? Infinity)
        )
        .reduce((combinedTasks, task) => {
          const existingTask = combinedTasks.find(
            ({ token }) => token.symbol === task.token.symbol
          )
          // If found, just modify existing by increasing amount. No need to
          // worry about the date since it will be replaced by a claim button.
          if (existingTask) {
            existingTask.amount += task.amount
          } else {
            // If not found, add this task as the new one.
            combinedTasks.push(task)
          }

          return combinedTasks
        }, [] as UnstakingTask[]),
    [tasks]
  )
  // Sorted ascending so that the next one to finish is first.
  const unstaking = useMemo(
    () =>
      tasks
        .filter(({ status }) => status === UnstakingTaskStatus.Unstaking)
        .sort(
          (a, b) =>
            // Place undefined last.
            (a.date?.getTime() ?? Infinity) - (b.date?.getTime() ?? Infinity)
        ),
    [tasks]
  )
  const claimed = useMemo(
    () =>
      tasks
        .filter(({ status }) => status === UnstakingTaskStatus.Claimed)
        .sort(
          (a, b) =>
            // Place undefined last.
            (b.date?.getTime() ?? -Infinity) - (a.date?.getTime() ?? -Infinity)
        ),
    [tasks]
  )

  // Refresh when the soonest task completes if refresh provided.
  useEffect(() => {
    if (!refresh || unstaking.length === 0 || !unstaking[0].date) {
      return
    }

    // Unstaking is sorted so that the first one is next to finish.
    const msUntilNextTaskCompletion = unstaking[0].date.getTime() - Date.now()

    // `setTimeout` uses 32-bit integers, so we need to check if the number is
    // too large. Why JavaScript...
    if (msUntilNextTaskCompletion < 2 ** 31) {
      const timeout = setTimeout(refresh, msUntilNextTaskCompletion)
      // Clean up on unmount.
      return () => clearTimeout(timeout)
    }
  }, [unstaking, refresh])

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx(
        '!h-[38rem] !max-h-[90vh] w-full max-w-2xl',
        containerClassName
      )}
    >
      {/* Only show if something is ready to claim. */}
      {readyToClaim.length > 0 && (
        <>
          <div className="mb-5 space-y-1">
            {readyToClaim.map((task, index) => (
              <UnstakingLine
                key={index}
                dateReplacement={
                  onClaim && (
                    <Button onClick={onClaim}>{t('button.claim')}</Button>
                  )
                }
                task={task}
              />
            ))}
          </div>
        </>
      )}

      <div className="link-text ml-2 flex flex-row items-center gap-2 text-text-secondary">
        <ArrowDropDown
          className={clsx('!h-5 !w-5', {
            '-rotate-90': unstaking.length === 0,
          })}
        />

        <p>{t('title.numTasks', { count: unstaking.length })}</p>
      </div>

      {unstaking.length > 0 && (
        <div className="mt-5 space-y-1">
          {unstaking.map((task, index) => (
            <UnstakingLine key={index} task={task} />
          ))}
        </div>
      )}

      {claimed.length > 0 && (
        <>
          <div className="link-text mt-6 ml-2 mb-5 flex flex-row items-center gap-2 text-text-secondary">
            <ArrowDropDown
              className={clsx('!h-5 !w-5', {
                '-rotate-90': claimed.length === 0,
              })}
            />

            <p>
              {claimed.length === 0 ? t('title.noHistory') : t('title.history')}
            </p>
          </div>

          <div className="space-y-1">
            {claimed.map((task, index) => (
              <UnstakingLine key={index} task={task} />
            ))}
          </div>
        </>
      )}
    </Modal>
  )
}
