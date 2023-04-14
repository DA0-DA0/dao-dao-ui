import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { MarkdownRenderer, Tooltip } from '@dao-dao/stateless'
import {
  formatDate,
  formatDateTimeTz,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import { Post } from '../types'

export type PostMarkdownProps = {
  post: Post
  className?: string
  addAnchors?: boolean
}

export const PostMarkdown = ({
  post: { title, content, image, created, initiallyCreated },
  className,
  addAnchors,
}: PostMarkdownProps) => {
  const { t } = useTranslation()

  // Scroll to hash manually if available since this component and thus the
  // desired target anchor text won't be ready right when the page renders.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Ignore the '#' character at the beginning.
      const element = document.getElementById(window.location.hash.slice(1))
      if (!element) {
        return
      }

      // 24px offset so the element isn't touching the edge of the browser.
      const top = element.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div
      className={clsx(
        'mx-auto flex w-full max-w-[38rem] flex-col self-center',
        className
      )}
    >
      {image && (
        <div
          className="mb-6 h-64 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${transformIpfsUrlToHttpsIfNecessary(
              image
            )})`,
          }}
        ></div>
      )}

      <p className="hero-text mb-1 text-4xl">{title}</p>

      <Tooltip title={formatDateTimeTz(initiallyCreated)}>
        <p className="caption-text font-xs mb-8 self-start italic">
          {t('info.postedOnDate', {
            date: formatDate(initiallyCreated),
          })}
        </p>
      </Tooltip>
      {/* If this post's creation date is different from when it was initially created, show last updated. */}
      {initiallyCreated.getTime() !== created.getTime() && (
        <Tooltip title={formatDateTimeTz(created)}>
          <p className="caption-text font-xs -mt-7 mb-8 self-start italic">
            {t('info.lastUpdatedOnDate', { date: formatDate(created) })}
          </p>
        </Tooltip>
      )}

      <MarkdownRenderer
        addAnchors={addAnchors}
        className="!max-w-[38rem]"
        markdown={content}
      />
    </div>
  )
}
