import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CommandModalProps } from '@dao-dao/types/components/CommandModal'

import { SearchBar } from '../inputs/SearchBar'
import { Modal } from '../modals/Modal'
import { ContextPill } from './ContextPill'

export const CommandModal = ({
  visible,
  setVisible,
  filter,
  setFilter,
  contexts,
  closeCurrentContext,
  children,
  searchBarRef,
}: CommandModalProps) => {
  const { t } = useTranslation()

  // Auto focus search bar on open and blur on close.
  useEffect(() => {
    if (visible) {
      searchBarRef.current?.focus()
    } else {
      searchBarRef.current?.blur()
    }
  }, [searchBarRef, visible])

  return (
    <Modal
      backdropClassName="!justify-start"
      closeButtonClassName="md:hidden"
      containerClassName="!w-[36rem] xs:!max-w-[82dvw] mt-[2dvw] xs:mt-[9dvw] md:mt-[18dvh] !max-h-[60dvh] min-h-96"
      contentContainerClassName="!p-3 !pt-4"
      headerContainerClassName="!p-4 relative !gap-0"
      headerContent={
        <>
          <div
            className={clsx(
              '-ml-1 flex flex-row flex-wrap items-center gap-x-2 gap-y-1 transition-all',
              contexts.length > 1 ? 'max-h-12 overflow-y-auto' : 'max-h-0'
            )}
          >
            {/* Don't show the root context. */}
            {contexts.slice(1).map((context, index) => (
              <ContextPill
                key={index}
                className="mb-1"
                imageUrl={context.imageUrl}
                name={context.name}
                onClose={
                  // Only the most recent context can go back. Sliced off the
                  // first one, so add one to the current index before
                  // comparing.
                  index + 1 === contexts.length - 1
                    ? closeCurrentContext
                    : undefined
                }
                size="sm"
              />
            ))}
          </div>

          <SearchBar
            className="!primary-text relative h-8 leading-8 text-text-body"
            containerClassName="grow"
            ghost
            hideIcon
            onChange={(event) => setFilter(event.currentTarget.value)}
            onKeyDown={(event) => {
              // Handle in list.
              if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                return event.preventDefault()
              } else if (
                (event.key === 'Backspace' && !filter.length) ||
                // If escape and not at root context, go back instead of close
                // modal.
                (event.key === 'Escape' && contexts.length > 1)
              ) {
                event.stopPropagation()
                return closeCurrentContext()
              }
              // If hits Escape and there are no contexts, this event will
              // propagate to the Modal, which will then close itself.
            }}
            placeholder={t('info.whatAreYouLookingForPrompt')}
            ref={searchBarRef}
            value={filter}
          />
        </>
      }
      onClose={() => setVisible(false)}
      smallCloseButton
      visible={visible}
    >
      {children}
    </Modal>
  )
}
