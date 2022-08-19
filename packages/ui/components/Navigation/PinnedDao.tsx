/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TriangleUp } from '@dao-dao/icons'

import { IconButton } from '../IconButton'

export interface Dao {
  imageUrl: string
  name: string
  subdaos?: Dao[]
}

export interface PinnedDaoProps {
  dao: Dao
  expandedLocalStorageKey?: string
  defaultExpanded?: boolean
}

export const PinnedDao = ({
  dao: { imageUrl, name, subdaos },
  expandedLocalStorageKey,
  defaultExpanded = false,
}: PinnedDaoProps) => {
  const { t } = useTranslation()
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

  return (
    <div className="space-y-2">
      <div
        className={clsx('flex flex-row gap-2 items-center py-2 px-2', {
          'pb-0': subdaos?.length && expanded,
        })}
      >
        <div className="flex justify-center items-center w-6 h-6">
          {subdaos?.length ? (
            <IconButton
              icon={
                <TriangleUp
                  className={clsx(
                    'w-4 h-4 transition-transform text-icon-primary',
                    {
                      'rotate-90': !expanded,
                      'rotate-180': expanded,
                    }
                  )}
                />
              }
              onClick={() => setExpanded((e) => !e)}
              size="xs"
              variant="ghost"
            />
          ) : (
            <div className="w-1 h-1 rounded-full bg-icon-interactive-disabled"></div>
          )}
        </div>

        <img
          alt={t('info.daosLogo')}
          className="w-5 h-5 rounded-full"
          src={imageUrl}
        />

        <p className="link-text text-text-body">{name}</p>
      </div>

      {!!subdaos?.length && expanded && (
        // w-3 (0.75rem) is half the size of the triangle `IconButton` above, so
        // this centers the border beneath the arrow.
        <div className="ml-[calc(1.25rem-1px)] border-l border-border-secondary">
          {subdaos.map((dao, index) => (
            <PinnedDao key={index} dao={dao} />
          ))}
        </div>
      )}
    </div>
  )
}
