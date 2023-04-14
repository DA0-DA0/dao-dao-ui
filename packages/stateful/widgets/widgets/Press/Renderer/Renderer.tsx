import {
  Add,
  ArrowBackIosRounded,
  DeleteRounded,
  EditRounded,
} from '@mui/icons-material'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Tooltip } from '@dao-dao/stateless'
import {
  ButtonLinkProps,
  IconButtonLinkProps,
  LoadingData,
} from '@dao-dao/types'

import { PostMarkdown } from '../components/PostMarkdown'
import { Post } from '../types'
import { PostList } from './PostList'

export interface RendererProps {
  postsLoading: LoadingData<Post[]>
  isMember: boolean
  createPostHref: string | undefined
  // Template containing IDTOUPDATE for the post ID to update.
  updatePostHref: string | undefined
  // Template containing IDTODELETE for the post ID to update.
  deletePostHref: string | undefined
  ButtonLink: ComponentType<ButtonLinkProps>
  IconButtonLink: ComponentType<IconButtonLinkProps>
}

export const Renderer = ({
  postsLoading,
  isMember,
  createPostHref,
  updatePostHref,
  deletePostHref,
  ButtonLink,
  IconButtonLink,
}: RendererProps) => {
  const { t } = useTranslation()

  const [openPostId, setOpenPostId] = useState(() =>
    // Default to post from URL hash if present and valid.
    typeof window === 'undefined'
      ? undefined
      : window.location.hash.replace('#', '').split('/')[1]
  )
  const openPost =
    postsLoading.loading || !openPostId
      ? undefined
      : postsLoading.data.find(
          (post) =>
            // Select post if it's the one we're looking for or if it's a newer
            // version of the selected ID (this ensures that old links stay
            // valid when posts are updated).
            post.id === openPostId ||
            post.pastVersions.some(
              (version) => 'id' in version && version.id === openPostId
            )
        )

  // Store selected post in URL hash.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // Only update hash if we're on the press page.
    const baseHash = window.location.hash.slice(1).split('/')[0]
    if (baseHash !== 'press') {
      return
    }

    const hash = baseHash + (openPostId ? `/${openPostId}` : '')

    if (window.location.hash.slice(1) !== hash) {
      window.location.hash = hash
    }
  }, [openPostId])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8">
        {openPost ? (
          <Button onClick={() => setOpenPostId(undefined)} variant="ghost">
            <ArrowBackIosRounded className="!h-5 !w-5" />
            <p className="title-text text-text-body">{t('title.posts')}</p>
          </Button>
        ) : (
          <p className="title-text text-text-body">{t('title.posts')}</p>
        )}

        {createPostHref && !openPost && (
          <Tooltip
            title={!isMember ? t('error.mustBeMemberToCreatePost') : undefined}
          >
            <ButtonLink
              className="shrink-0"
              disabled={!isMember}
              href={createPostHref}
              variant="primary"
            >
              <Add className="!h-4 !w-4" />
              {t('button.newPost')}
            </ButtonLink>
          </Tooltip>
        )}

        {openPost && isMember && updatePostHref && deletePostHref && (
          <div className="flex flex-row items-stretch justify-end gap-2">
            <Tooltip title={t('info.proposeUpdateTooltip')}>
              <IconButtonLink
                Icon={EditRounded}
                href={updatePostHref.replace('IDTOUPDATE', openPost.id)}
                variant="secondary"
              />
            </Tooltip>

            <Tooltip title={t('info.proposeDeleteTooltip')}>
              <IconButtonLink
                Icon={DeleteRounded}
                href={deletePostHref.replace('IDTODELETE', openPost.id)}
                variant="secondary"
              />
            </Tooltip>
          </div>
        )}
      </div>

      <div className="mb-9">
        {openPost ? (
          <PostMarkdown addAnchors post={openPost} />
        ) : (
          <PostList
            createPostHref={createPostHref}
            onClick={setOpenPostId}
            postsLoading={postsLoading}
          />
        )}
      </div>
    </div>
  )
}
