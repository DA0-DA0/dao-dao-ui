import { Add } from '@mui/icons-material'
import { isMobile } from '@walletconnect/browser-utils'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Action } from '@dao-dao/types/actions'

import { usePlatform } from '../../hooks'
import { FilterableItemPopup, FilterableItemPopupProps } from '../popup'

export interface ActionSelectorProps {
  actions: Action[]
  onSelectAction: (action: Action) => void
  disableKeybind?: boolean
}

export const ActionSelector = ({
  actions,
  onSelectAction,
  disableKeybind = false,
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
      filterableItemKeys={FILTERABLE_KEYS}
      getKeydownEventListener={
        disableKeybind ? undefined : getKeydownEventListener
      }
      items={actions}
      onSelect={onSelectAction}
      searchPlaceholder={t('info.searchActionPlaceholder')}
      trigger={{
        type: 'button',
        props: ({ open }) => ({
          variant: 'secondary',
          children: (
            <>
              <Add
                className={clsx(
                  'h-4 w-4',
                  open ? 'text-icon-brand' : 'text-icon-primary'
                )}
              />{' '}
              {t('button.addAnAction')}
              {!disableKeybind && !isMobile() && (
                <>
                  {' '}
                  <p className="text-text-tertiary">{isMac ? '⌘' : '⌃'}A</p>
                </>
              )}
            </>
          ),
        }),
      }}
    />
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<Action>[] = ['label', 'description']
