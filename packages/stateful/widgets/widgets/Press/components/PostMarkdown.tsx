import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { MarkdownRenderer } from '@dao-dao/stateless'
import { formatDate } from '@dao-dao/utils'

import { Post } from '../types'

export type PostMarkdownProps = {
  post: Post
  className?: string
  addAnchors?: boolean
}

export const PostMarkdown = ({
  post: { title, content, headerImage, lastUpdated },
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
      className={clsx('mx-auto w-full max-w-[38rem] self-center', className)}
    >
      {headerImage && (
        <div
          className="mb-8 h-64 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${headerImage})`,
          }}
        ></div>
      )}

      <p className="hero-text mb-1 text-4xl">{title}</p>

      <p className="caption-text font-xs mb-6 italic">
        {t('info.postedOnDate', { date: formatDate(lastUpdated) })}
      </p>

      <MarkdownRenderer
        addAnchors={addAnchors}
        className="!max-w-[38rem]"
        markdown={content}
      />
    </div>
  )
}
