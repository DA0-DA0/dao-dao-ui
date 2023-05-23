import {
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../../actions'
import { ButtonLink, IconButtonLink } from '../../../../components'
import { useMembership } from '../../../../hooks/useMembership'
import { postsSelector } from '../state'
import { PressData } from '../types'
import { Renderer as StatelessRenderer } from './Renderer'

export const Renderer = ({
  variables: { contract },
}: WidgetRendererProps<PressData>) => {
  const { coreAddress, chainId } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
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
  const updatePostAction = useActionForKey(ActionKey.UpdatePost)
  const updatePostActionDefaults = updatePostAction?.action.useDefaults()
  const deletePostAction = useActionForKey(ActionKey.DeletePost)

  return (
    <StatelessRenderer
      ButtonLink={ButtonLink}
      IconButtonLink={IconButtonLink}
      createPostHref={
        createPostAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: createPostAction.action.key,
                    data: createPostActionDefaults,
                  },
                ],
              }),
            })
          : undefined
      }
      deletePostHref={
        deletePostAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: deletePostAction.action.key,
                    data: {
                      id: 'IDTODELETE',
                    },
                  },
                ],
              }),
            })
          : undefined
      }
      isMember={isMember}
      postsLoading={postsLoading}
      updatePostHref={
        updatePostAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: updatePostAction.action.key,
                    data: {
                      ...updatePostActionDefaults,
                      updateId: 'IDTOUPDATE',
                    },
                  },
                ],
              }),
            })
          : undefined
      }
    />
  )
}
