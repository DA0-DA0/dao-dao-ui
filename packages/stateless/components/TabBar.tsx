import { ArrowBackIosNew } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'

import { TabBarProps } from '@dao-dao/types'

import { Button, IconButton } from '../components'

export const TabBar = ({
  tabs,
  selectedTabId,
  onSelect,
  className,
}: TabBarProps) => {
  const [tabContainer, _setTabContainer] = useState<HTMLDivElement | null>(null)
  const setTabContainer = useCallback((tabContainer: HTMLDivElement | null) => {
    _setTabContainer(tabContainer)
  }, [])

  const [showTabLeftButton, setShowTabLeftButton] = useState(false)
  const [showTabRightButton, setShowTabRightButton] = useState(false)

  // When the selected tab changes, center the new tab.
  useEffect(() => {
    const tabIndex = tabs.findIndex(({ id }) => id === selectedTabId)
    if (tabIndex < 0 || !tabContainer) {
      return
    }

    const tab = tabContainer.children[tabIndex]
    if (tab) {
      const tabRect = tab.getBoundingClientRect()

      // The left edge of the tab inside its scrollable container.
      const tabScrollLeft =
        tabRect.left -
        tabContainer.getBoundingClientRect().left +
        tabContainer.scrollLeft

      const tabCenter = tabScrollLeft + tabRect.width / 2
      const newContainerLeft = tabCenter - tabContainer.offsetWidth / 2

      tabContainer.scrollTo({
        left: Math.max(
          0,
          Math.min(
            newContainerLeft,
            tabContainer.scrollWidth - tabContainer.offsetWidth
          )
        ),
        behavior: 'smooth',
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabId, tabContainer])

  // Show/hide the tab left/right buttons based on scroll position.
  useEffect(() => {
    if (typeof window === 'undefined' || !tabContainer) {
      return
    }

    const updateVisibilities = () => {
      setShowTabLeftButton(tabContainer.scrollLeft > 0)
      // This needs a tiny 2 pixel buffer in case of rounding in some cases.
      setShowTabRightButton(
        tabContainer.scrollLeft <
          tabContainer.scrollWidth - tabContainer.offsetWidth - 2
      )
    }

    updateVisibilities()

    tabContainer.addEventListener('scroll', updateVisibilities)
    window.addEventListener('resize', updateVisibilities)

    return () => {
      tabContainer.removeEventListener('scroll', updateVisibilities)
      window.removeEventListener('resize', updateVisibilities)
    }
  }, [tabContainer])

  // Detect vertical scrolling from a mouse and scroll the tabs horizontally if
  // the mouse is hovering over them. This is to add support for scrolling the
  // tabs on a desktop with only a single scrollable direction. Horizontal
  // scrolling can be used natively by holding shift, but most people don't know
  // that.
  const [horizontalScrollActive, setHorizontalScrollActive] = useState(false)
  useEffect(() => {
    if (!horizontalScrollActive || !tabContainer) {
      return
    }

    const onWheel = (event: WheelEvent) => {
      // Subtract Y delta so that this scrolls horizontally to the right when
      // scrolling down and to the left when scrolling up.
      tabContainer.scrollLeft += event.deltaX - event.deltaY

      event.preventDefault()
    }

    tabContainer.addEventListener('wheel', onWheel)
    return () => tabContainer.removeEventListener('wheel', onWheel)
  }, [horizontalScrollActive, tabContainer])

  return (
    <div
      className={clsx(
        'relative flex flex-row items-center justify-center border-b border-border-primary',
        className
      )}
    >
      {/* -bottom-1 to account for border of the container */}
      <div
        className={clsx(
          'pointer-events-none absolute left-0 top-0 -bottom-1 z-10 flex flex-col items-center justify-center transition-opacity',
          showTabLeftButton ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className="absolute top-0 bottom-0 left-0 w-8"
          style={{
            background:
              'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 75%, rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>

        <IconButton
          Icon={ArrowBackIosNew}
          className={clsx(
            'relative -left-3',
            showTabLeftButton && 'pointer-events-auto'
          )}
          iconClassName="text-icon-tertiary"
          onClick={() => {
            if (tabContainer) {
              tabContainer.scrollBy({
                left: -Math.min(
                  tabContainer.scrollLeft,
                  tabContainer.offsetWidth
                ),
                behavior: 'smooth',
              })
            }
          }}
          size="xs"
          variant="none"
        />
      </div>

      {/* -bottom-1 to account for border of the container */}
      <div
        className={clsx(
          'pointer-events-none absolute right-0 top-0 -bottom-1 z-10 flex flex-col items-center justify-center transition-opacity',
          showTabRightButton ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className="absolute top-0 bottom-0 right-0 w-8"
          style={{
            background:
              'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 75%, rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>

        <IconButton
          Icon={ArrowBackIosNew}
          className={clsx(
            'relative -right-3',
            showTabRightButton && 'pointer-events-auto'
          )}
          iconClassName="rotate-180 text-icon-tertiary"
          onClick={() => {
            if (tabContainer) {
              tabContainer.scrollBy({
                left: Math.min(
                  tabContainer.scrollWidth -
                    tabContainer.scrollLeft -
                    tabContainer.offsetWidth,
                  tabContainer.offsetWidth
                ),
                behavior: 'smooth',
              })
            }
          }}
          size="xs"
          variant="none"
        />
      </div>

      {/* -mb-[1px] to account for border of the container so the selected tab's border overlaps instead of stacking vertically */}
      <div
        className="no-scrollbar -mb-[1px] flex flex-row items-end overflow-x-auto pt-1"
        onMouseLeave={() => setHorizontalScrollActive(false)}
        onMouseOver={() => setHorizontalScrollActive(true)}
        ref={setTabContainer}
      >
        {tabs.map(({ id, label, Icon }) => (
          <Button
            key={id}
            className={clsx(
              'shrink-0 !rounded-b-none border-b border-transparent !py-2 !px-3 text-text-primary md:!px-4',
              selectedTabId === id && '!border-icon-primary'
            )}
            contentContainerClassName="!gap-1.5"
            onClick={() => onSelect(id)}
            size="lg"
            variant="none"
          >
            {Icon && <Icon className="!h-6 !w-6" />}
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
