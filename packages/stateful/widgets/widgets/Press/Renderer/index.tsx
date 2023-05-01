import {
  useCachedLoading,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'

import { useActionForKey } from '../../../../actions'
import { ButtonLink, IconButtonLink } from '../../../../components'
import { useDaoProposalSinglePrefill } from '../../../../hooks/useDaoProposalSinglePrefill'
import { useMembership } from '../../../../hooks/useMembership'
import { postsSelector } from '../state'
import { PressData } from '../types'
import { Renderer as StatelessRenderer } from './Renderer'

export const Renderer = ({
  variables: { contract },
}: WidgetRendererProps<PressData>) => {
  const { chain_id: chainId } = useChain()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const postsLoading = useCachedLoading(
    postsSelector({
      contractAddress: contract,
      chainId,
    }),
    []
  )

  const createPostAction = useActionForKey(ActionKey.CreatePost)
  const createPostActionDefaults = createPostAction?.action.useDefaults()
  const createPostPrefill = useDaoProposalSinglePrefill({
    actions: createPostAction
      ? [
          {
            actionKey: createPostAction.action.key,
            data: createPostActionDefaults,
          },
        ]
      : [],
  })

  const updatePostAction = useActionForKey(ActionKey.UpdatePost)
  const updatePostActionDefaults = updatePostAction?.action.useDefaults()
  const updatePostPrefill = useDaoProposalSinglePrefill({
    actions: updatePostAction
      ? [
          {
            actionKey: updatePostAction.action.key,
            data: {
              ...updatePostActionDefaults,
              updateId: 'IDTOUPDATE',
            },
          },
        ]
      : [],
  })

  const deletePostAction = useActionForKey(ActionKey.DeletePost)
  const deletePostPrefill = useDaoProposalSinglePrefill({
    actions: deletePostAction
      ? [
          {
            actionKey: deletePostAction.action.key,
            data: {
              id: 'IDTODELETE',
            },
          },
        ]
      : [],
  })

  return (
    <StatelessRenderer
      ButtonLink={ButtonLink}
      IconButtonLink={IconButtonLink}
      createPostHref={
        createPostAction && createPostPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: createPostPrefill,
            })
          : undefined
      }
      deletePostHref={
        deletePostAction && deletePostPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: deletePostPrefill,
            })
          : undefined
      }
      isMember={isMember}
      postsLoading={postsLoading}
      updatePostHref={
        updatePostAction && updatePostPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: updatePostPrefill,
            })
          : undefined
      }
    />
  )
}
