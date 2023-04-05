import {
  ArrowBackRounded,
  ArrowForwardRounded,
  Remove,
} from '@mui/icons-material'
import clsx from 'clsx'

import { Button } from './buttons'
import { IconButton } from './icon_buttons'

export const PAGINATION_MIN_PAGE = 1

export type PaginationProps = {
  total: number
  page: number
  setPage: (page: number) => void
  pageSize: number
  className?: string
}

export const Pagination = ({
  total,
  page: _page,
  setPage,
  pageSize,
  className,
}: PaginationProps) => {
  const maxPage = Math.ceil(total / pageSize)
  const page = Math.min(Math.max(PAGINATION_MIN_PAGE, _page), maxPage)

  if (maxPage === PAGINATION_MIN_PAGE) {
    return null
  }

  return (
    <div
      className={clsx(
        'flex max-w-md flex-row items-center justify-between gap-2',
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

      {/* Show current page if not first or last. */}
      {page > PAGINATION_MIN_PAGE && page < maxPage ? (
        <Button className="text-lg" disabled pressed size="sm" variant="ghost">
          {page}
        </Button>
      ) : (
        <Remove className="!h-5 !w-5" />
      )}

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
