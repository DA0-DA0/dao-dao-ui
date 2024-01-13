import {
  ArrowBackRounded,
  ArrowForwardRounded,
  Remove,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect } from 'react'

import { Button } from './buttons'
import { IconButton } from './icon_buttons'
import { Loader } from './logo'

export const PAGINATION_MIN_PAGE = 1

export type PaginationProps = {
  total: number
  page: number
  setPage: (page: number) => void
  pageSize: number
  className?: string
  /**
   * Show loading indicator over current page.
   */
  loading?: boolean
}

export const Pagination = ({
  total,
  page: _page,
  setPage,
  pageSize,
  className,
  loading,
}: PaginationProps) => {
  const maxPage = Math.ceil(total / pageSize)
  const page = Math.min(Math.max(PAGINATION_MIN_PAGE, _page), maxPage)

  // If page is out of bounds, correct it.
  useEffect(() => {
    if (_page !== page) {
      setPage(maxPage)
    }
  }, [_page, maxPage, page, setPage])

  if (maxPage <= PAGINATION_MIN_PAGE) {
    return null
  }

  return (
    <div
      className={clsx(
        'flex max-w-sm flex-row items-center justify-between gap-4',
        className
      )}
    >
      <IconButton
        Icon={ArrowBackRounded}
        circular
        disabled={page === PAGINATION_MIN_PAGE}
        onClick={() => setPage(page - 1)}
        size="sm"
        variant="ghost"
      />

      <Button
        circular
        className="text-lg"
        disabled={page === PAGINATION_MIN_PAGE}
        onClick={() => setPage(PAGINATION_MIN_PAGE)}
        pressed={page === PAGINATION_MIN_PAGE}
        size="sm"
        variant="ghost"
      >
        {PAGINATION_MIN_PAGE}
      </Button>

      <div className="flex h-6 w-6 items-center justify-center">
        {loading ? (
          <Loader fill={false} size={22} />
        ) : // Show current page if not first or last.
        page > PAGINATION_MIN_PAGE && page < maxPage ? (
          <Button
            className="text-lg"
            disabled
            pressed
            size="sm"
            variant="ghost"
          >
            {page}
          </Button>
        ) : (
          <Remove className="!h-5 !w-5" />
        )}
      </div>

      <Button
        circular
        className="text-lg"
        disabled={page === maxPage}
        onClick={() => setPage(maxPage)}
        pressed={page === maxPage}
        size="sm"
        variant="ghost"
      >
        {maxPage}
      </Button>

      <IconButton
        Icon={ArrowForwardRounded}
        circular
        disabled={page === maxPage}
        onClick={() => setPage(page + 1)}
        size="sm"
        variant="ghost"
      />
    </div>
  )
}
