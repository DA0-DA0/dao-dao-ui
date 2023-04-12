import clsx from 'clsx'

import { Tooltip } from '@dao-dao/stateless'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import { Post } from '../types'

export type PostLineProps = {
  post: Post
  onClick: () => void
  transparentBackground?: boolean
}

export const PostLine = ({
  post,
  onClick,
  transparentBackground,
}: PostLineProps) => (
  <div
    className={clsx(
      'box-content grid h-8 cursor-pointer grid-cols-2 items-center gap-4 rounded-lg py-3 px-4 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
      !transparentBackground && 'bg-background-tertiary'
    )}
    onClick={onClick}
  >
    <p className="primary-text">{post.title}</p>

    <div className="flex flex-row items-center justify-end">
      <Tooltip title={formatDateTimeTz(post.lastUpdated)}>
        <p className="secondary-text text-right font-mono">
          {formatDate(post.lastUpdated)}
        </p>
      </Tooltip>
    </div>
  </div>
)
