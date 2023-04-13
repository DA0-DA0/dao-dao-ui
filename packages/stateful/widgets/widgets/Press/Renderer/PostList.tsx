import { WarningRounded } from '@mui/icons-material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader, NoContent } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'

import { Post } from '../types'
import { PostLine } from './PostLine'

export interface PostListProps {
  postsLoading: LoadingData<Post[]>
  onClick: (id: string) => void
  createPostHref: string | undefined
}

export const PostList = ({
  postsLoading,
  onClick,
  createPostHref,
}: PostListProps) => {
  const { t } = useTranslation()

  const sortedPosts = useMemo(
    () =>
      postsLoading.loading
        ? []
        : postsLoading.data.sort((a, b) => b.order - a.order),
    [postsLoading]
  )

  return postsLoading.loading ? (
    <Loader fill={false} />
  ) : sortedPosts.length > 0 ? (
    <div className="space-y-1 border-t border-border-secondary pt-6">
      {sortedPosts.map((post, index) => (
        <PostLine
          key={post.id}
          onClick={() => onClick(post.id)}
          post={post}
          transparentBackground={index % 2 !== 0}
        />
      ))}
    </div>
  ) : (
    <NoContent
      Icon={WarningRounded}
      actionNudge={t('info.createFirstOneQuestion')}
      body={t('info.noPostsFound')}
      buttonLabel={t('button.create')}
      href={createPostHref}
    />
  )
}
