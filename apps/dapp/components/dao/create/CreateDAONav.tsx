import clsx from 'clsx'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { mountedInBrowserAtom } from '@dao-dao/state'
import { Button } from '@dao-dao/ui'

import { useCreateDAOFormPages } from '@/hooks'

interface CreateDAONavProps {
  currentPageIndex: number
}

export const CreateDAONav: FC<CreateDAONavProps> = ({ currentPageIndex }) => {
  const { t } = useTranslation()
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const createDAOFormPages = useCreateDAOFormPages()

  return (
    <div>
      <p className="mb-3 font-mono text-sm font-bold text-disabled md:mb-7">
        {t('steps')}
      </p>

      <div className="flex flex-col gap-2 items-start md:gap-5">
        {createDAOFormPages.map(({ href, title }, index) => (
          <Button
            key={href}
            className={clsx('text-sm', {
              'text-disabled': index !== currentPageIndex,
            })}
            disabled={
              !mountedInBrowser ||
              // We can only validate fields that are registered on the
              // current page. Thus, we can't move past the page after
              // current.
              index > currentPageIndex + 1
            }
            type="submit"
            value={
              // Number serves as page delta to move.
              index - currentPageIndex
            }
            variant="ghost"
          >
            <div className="flex flex-row gap-1 items-center md:gap-3">
              <p className="font-mono">{index + 1}.</p>
              {title}
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
