import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useTranslation } from 'react-i18next'

import { SITE_URL } from '@dao-dao/utils'

import { CopyToClipboard } from '../../CopyToClipboard'
import { Modal, ModalProps } from '../../Modal'
import { DaoCard, DaoCardProps } from '../DaoCard'

export interface DaoCreateModalProps {
  modalProps: Omit<ModalProps, 'header' | 'children'>
  daoCardProps: Omit<DaoCardProps, 'onMouseOver'>
}

export const DaoCreateModal = ({
  modalProps: { containerClassName: modalContainerClassName, ...modalProps },
  daoCardProps: { className: daoCardClassName, ...daoCardProps },
}: DaoCreateModalProps) => {
  const { t } = useTranslation()

  const [confettiVisible, setConfettiVisible] = useState(true)
  const [recycleConfetti, setRecycleConfetti] = useState(false)
  // Turn confetti off and back on.
  const [resetConfetti, setResetConfetti] = useState(false)
  useEffect(() => {
    if (resetConfetti && !confettiVisible) {
      setResetConfetti(false)
      setConfettiVisible(true)
    }
  }, [confettiVisible, resetConfetti])

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx('max-w-lg', modalContainerClassName)}
      header={{
        title: t('title.congratsOnDao'),
        subtitle: t('info.easilyShareLink'),
      }}
    >
      {confettiVisible && (
        <Confetti
          gravity={0.042069}
          numberOfPieces={1337}
          onConfettiComplete={() => setConfettiVisible(false)}
          recycle={recycleConfetti}
        />
      )}

      <DaoCard
        {...daoCardProps}
        className={clsx(
          'my-10 mx-auto max-w-[18rem] shadow-dp8',
          daoCardClassName
        )}
        onMouseLeave={() => setRecycleConfetti(false)}
        onMouseOver={() => {
          setRecycleConfetti(true)
          setConfettiVisible(true)
        }}
      />

      <CopyToClipboard
        className="p-4 font-mono bg-background-secondary hover:bg-btn-secondary-hover rounded-md shadow-dp4 symbol-small-body-text"
        onCopy={() => {
          setResetConfetti(true)
          setConfettiVisible(false)
        }}
        // Move hover background to whole container.
        takeAll
        textClassName="!bg-transparent"
        value={SITE_URL + `/dao/${daoCardProps.coreAddress}`}
      />
    </Modal>
  )
}
