import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { DaoDropdownProps } from '@dao-dao/types/stateless/DaoDropdown'
import { normalizeImageUrl } from '@dao-dao/utils'

import { DropdownIconButton } from '../icon_buttons'
import { Tooltip } from '../tooltip/Tooltip'

export * from '@dao-dao/types/stateless/DaoDropdown'

export const DaoDropdown = ({
  dao: { coreAddress, imageUrl, name, subdaos, content },
  expandedLocalStorageKey,
  defaultExpanded = false,
  showSubdaos = true,
  indent = 0,
  compact = false,
  LinkWrapper,
}: DaoDropdownProps) => {
  const { asPath } = useRouter()

  const [expanded, setExpanded] = useState(
    expandedLocalStorageKey && typeof localStorage !== 'undefined'
      ? localStorage.getItem(expandedLocalStorageKey) === '1'
      : defaultExpanded
  )
  useEffect(() => {
    if (expandedLocalStorageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(expandedLocalStorageKey, Number(expanded).toString())
    }
  }, [expanded, expandedLocalStorageKey])

  const selected = asPath.startsWith(`/dao/${coreAddress}`)

  // If compact, just show image.
  return compact ? (
    <LinkWrapper
      className={clsx(
        'box-content flex h-8 w-8 flex-row items-center justify-center py-1.5 px-6 transition-opacity hover:opacity-70 active:opacity-60',
        selected && 'bg-background-interactive-selected'
      )}
      href={`/dao/${coreAddress}`}
    >
      <Tooltip title={name}>
        <div
          className="h-7 w-7 overflow-hidden rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${normalizeImageUrl(imageUrl)})` }}
        />
      </Tooltip>
    </LinkWrapper>
  ) : (
    <div>
      <div
        className={clsx(
          'flex flex-row items-stretch rounded-md',
          selected && 'bg-background-interactive-selected'
        )}
      >
        {[...Array(indent)].map((_, index) => (
          <div
            key={index}
            // The triangle `IconButton` is w-6 and offset by the container's
            // ml-2, so to center this border beneath the arrow, we need to
            // include the full offset (ml-2) and half the width (w-3), getting
            // w-5.
            className="w-5 shrink-0 border-r border-border-secondary"
          ></div>
        ))}

        <div className="ml-2 flex grow flex-row items-center gap-2 overflow-hidden">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {(showSubdaos && subdaos?.length) || content ? (
              <DropdownIconButton
                className="text-icon-primary"
                open={expanded}
                toggle={() => setExpanded((e) => !e)}
              />
            ) : (
              <div className="h-1 w-1 rounded-full bg-icon-interactive-disabled"></div>
            )}
          </div>

          <LinkWrapper
            className="flex grow flex-row items-center gap-2 overflow-hidden py-2 transition-opacity hover:opacity-70 active:opacity-60"
            href={`/dao/${coreAddress}`}
          >
            <div
              className="h-5 w-5 overflow-hidden rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${normalizeImageUrl(imageUrl)})` }}
            />

            <p className="link-text truncate text-text-body">{name}</p>
          </LinkWrapper>
        </div>
      </div>

      <div
        className={clsx(
          'overflow-hidden transition-all',
          expanded ? 'h-auto' : 'h-0'
        )}
      >
        {content}

        {showSubdaos &&
          subdaos?.map((dao, index) => (
            <DaoDropdown
              key={index}
              LinkWrapper={LinkWrapper}
              compact={compact}
              dao={dao}
              indent={indent + 1}
            />
          ))}
      </div>
    </div>
  )
}
