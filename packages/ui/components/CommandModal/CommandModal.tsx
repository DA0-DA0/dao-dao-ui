import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CommandModalProps } from '@dao-dao/tstypes/command'

import { Modal } from '../Modal'
import { SearchBar } from '../SearchBar'
import { ContextPill } from './ContextPill'

export const CommandModal = ({
  visible,
  setVisible,
  filter,
  setFilter,
  contexts,
  goBack,
  children,
}: CommandModalProps) => {
  const { t } = useTranslation()

  const searchBarRef = useRef<HTMLInputElement>(null)
  // Auto focus search bar on open and blur on close.
  useEffect(() => {
    if (visible) {
      searchBarRef.current?.focus()
    } else {
      searchBarRef.current?.blur()
    }
  }, [visible])

  // TODO: Re-implement navigation loading and preventing going back contexts.
  // Go back to home when input is empty and backspace is pressed, unless
  // currently navigating as a result of choosing a hit, in which case we don't
  // want the user to get confused since the loader will disappear.
  // const onEmptyBack = useCallback(() => {
  //   if (navigatingFromHit) {
  //     return
  //   }

  //   setCommandState({ type: CommandStateType.Home })
  // }, [navigatingFromHit, setCommandState])

  return (
    <Modal
      containerClassName="p-0 w-full max-w-[550px] h-[450px] max-h-[90vh] border"
      headerContainerClassName="!m-0 px-4 py-6"
      headerContent={
        <div className="flex flex-row gap-4 items-stretch h-8">
          {/* Don't show the root context. */}
          {contexts.slice(1).map((context, index) => (
            <ContextPill
              key={index}
              imageUrl={context.imageUrl}
              name={context.name}
              // Only the most recent context can go back. Sliced off the first
              // one, so add one to the current index before comparing.
              onClose={index + 1 === contexts.length - 1 ? goBack : undefined}
            />
          ))}

          <SearchBar
            className="leading-8 text-text-body !primary-text"
            containerClassName="grow"
            ghost
            hideIcon
            onBlur={(event) => event.target.focus()}
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
                return goBack()
              }
            }}
            placeholder={t('commandModal.prompt')}
            ref={searchBarRef}
            value={filter}
          />
        </div>
      }
      hideCloseButton
      onClose={() => setVisible(false)}
      visible={visible}
    >
      {children}
    </Modal>
  )
}
