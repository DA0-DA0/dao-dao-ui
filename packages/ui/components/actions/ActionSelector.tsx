import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Action } from '@dao-dao/tstypes/actions'
import { usePlatform } from '@dao-dao/utils'

import { Button } from '../Button'
import { FilterableItemPopup, FilterableItemPopupProps } from '../popup'

export interface ActionSelectorProps {
  actions: Action[]
  onSelectAction: (action: Action) => void
}

export const ActionSelector = ({
  actions,
  onSelectAction,
}: ActionSelectorProps) => {
  const { t } = useTranslation()

  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()

  const getKeydownEventListener: Required<
    FilterableItemPopupProps<Action>
  >['getKeydownEventListener'] = useCallback(
    (open, setOpen) => (event) => {
      if (
        // If showing popup, do nothing. This allows the keybinding to
        // function normally when the selector is open. The escape keybinding
        // can always be used to exit the popup.
        open ||
        // If focused on an input, do nothing. This command overlaps with
        // select all, so if we're focused on a text input, don't open it.
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      if ((!isMac && event.ctrlKey) || event.metaKey) {
        if (event.key === 'a') {
          event.preventDefault()
          setOpen(true)
        }
      }
    },
    [isMac]
  )

  return (
    <FilterableItemPopup
      Trigger={({ open, ...props }) => (
        <Button pressed={open} variant="secondary" {...props}>
          <Add
            className={clsx(
              'w-4 h-4',
              open ? 'text-icon-brand' : 'text-icon-primary'
            )}
          />{' '}
          {t('button.addAnAction')}{' '}
          <p className="text-text-tertiary">{isMac ? '⌘' : '⌃'}A</p>
        </Button>
      )}
      filterableItemKeys={FILTERABLE_KEYS}
      getKeydownEventListener={getKeydownEventListener}
      items={actions}
      onSelect={onSelectAction}
      popupClassName="!w-[24rem] max-w-[96vw] !h-[32rem] max-h-[96vh]"
      position="right"
      searchPlaceholder={t('info.searchActionPlaceholder')}
    />
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<Action>[] = ['label', 'description']
