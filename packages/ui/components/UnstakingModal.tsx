import clsx from 'clsx'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowDropdown } from '@dao-dao/icons'

import { Button } from './Button'
import { Modal, ModalProps } from './Modal'
import { UnstakingLine, UnstakingTask } from './UnstakingLine'
import { UnstakingTaskStatus } from './UnstakingStatus'

export interface UnstakingModalProps extends Omit<ModalProps, 'children'> {
  unstakingDuration: string
  tasks: UnstakingTask[]
  onClaim: () => void
}

export const UnstakingModal = ({
  unstakingDuration,
  tasks,
  containerClassName,
  onClaim,
  ...modalProps
}: UnstakingModalProps) => {
  const { t } = useTranslation()

  modalProps.header = {
    title: modalProps.header?.title || t('title.unstaking'),
    subtitle:
      modalProps.header?.subtitle ||
      t('info.unstakingDurationExplanation', { duration: unstakingDuration }),
  }

  const readyToClaim = useMemo(
    () =>
      tasks
        .filter(({ status }) => status === UnstakingTaskStatus.ReadyToClaim)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [tasks]
  )
  const unstaking = useMemo(
    () =>
      tasks
        .filter(({ status }) => status === UnstakingTaskStatus.Unstaking)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [tasks]
  )
  const claimed = useMemo(
    () =>
      tasks
        .filter(({ status }) => status === UnstakingTaskStatus.Claimed)
        .sort((a, b) => b.date.getTime() - a.date.getTime()),
    [tasks]
  )

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx('w-full max-w-2xl', containerClassName)}
    >
      {/* Only show if something is ready to claim. */}
      {readyToClaim.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center mb-3">
            <div className="flex flex-row gap-3 items-center ml-2 text-text-secondary link-text">
              <ArrowDropdown className="w-2 h-2" />

              <p>{t('title.numTasks', { count: readyToClaim.length })}</p>
            </div>

            <Button onClick={onClaim}>{t('button.claimTokens')}</Button>
          </div>

          <div className="mb-5 space-y-1">
            {readyToClaim.map((task, index) => (
              <UnstakingLine key={index} task={task} />
            ))}
          </div>
        </>
      )}

      <div className="flex flex-row gap-3 items-center ml-2 text-text-secondary link-text">
        <ArrowDropdown
          className={clsx('w-2 h-2', {
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

      <div className="flex flex-row gap-3 items-center mt-6 ml-2 text-text-secondary link-text">
        <ArrowDropdown
          className={clsx('w-2 h-2', {
            '-rotate-90': claimed.length === 0,
          })}
        />

        <p>{t('title.history')}</p>
      </div>

      {claimed.length > 0 && (
        <div className="mt-5 space-y-1">
          {claimed.map((task, index) => (
            <UnstakingLine key={index} task={task} />
          ))}
        </div>
      )}
    </Modal>
  )
}
