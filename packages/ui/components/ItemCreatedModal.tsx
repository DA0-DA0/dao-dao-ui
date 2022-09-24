import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { CopyToClipboard } from './CopyToClipboard'
import { Modal, ModalProps } from './Modal'

export interface ItemCreatedModalProps<T> {
  modalProps: Omit<ModalProps, 'header' | 'children'>
  header: Required<ModalProps>['header']
  Item: ComponentType<Omit<T, 'onMouseOver' | 'onMouseLeave'>>
  itemProps: T
  url: string
}

export const ItemCreatedModal = <
  T extends {
    className?: string
    onMouseOver?: () => void
    onMouseLeave?: () => void
  }
>({
  modalProps: { containerClassName: modalContainerClassName, ...modalProps },
  header,
  url,
  ...props
}: ItemCreatedModalProps<T>) => {
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
      header={header}
    >
      <div className="flex relative flex-col gap-10 p-6 pt-8 -m-6">
        {confettiVisible && (
          <Confetti
            className="!z-10"
            gravity={0.042069 * 1.337}
            numberOfPieces={1337 / 2}
            onConfettiComplete={() => setConfettiVisible(false)}
            recycle={recycleConfetti}
          />
        )}

        <div className="relative z-20 self-center space-y-10 max-w-[18rem] bg-background-base shadow-dp8">
          <props.Item
            {...props.itemProps}
            className="w-full"
            onMouseLeave={() => setRecycleConfetti(false)}
            onMouseOver={() => {
              setRecycleConfetti(true)
              setConfettiVisible(true)
            }}
          />
        </div>

        <div className="overflow-hidden relative z-20 shrink-0 bg-background-base rounded-md shadow-dp4">
          <CopyToClipboard
            className="gap-4 p-4 w-full font-mono text-left bg-background-secondary hover:bg-btn-secondary-hover symbol-small-body-text"
            onCopy={() => {
              setResetConfetti(true)
              setConfettiVisible(false)
            }}
            // Move hover background to whole container.
            takeAll
            textClassName="!bg-transparent"
            value={url}
          />
        </div>
      </div>
    </Modal>
  )
}
