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
  variables: { chainId: configuredChainId, contract },
}: WidgetRendererProps<PressData>) => {
  const { chainId: daoChainId, coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership()

  // The chain that Press is set up on. If chain ID is undefined, default to
  // native DAO chain for backwards compatibility.
  const pressChainId = configuredChainId || daoChainId

  const postsLoading = useCachedLoading(
    postsSelector({
      contractAddress: contract,
      chainId: pressChainId,
    }),
    []
  )

  const createPostAction = useActionForKey(ActionKey.CreatePost)
  const createPostActionDefaults = createPostAction?.useDefaults()
  const updatePostAction = useActionForKey(ActionKey.UpdatePost)
  const updatePostActionDefaults = updatePostAction?.useDefaults()
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
                    actionKey: createPostAction.key,
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
                    actionKey: deletePostAction.key,
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
                    actionKey: updatePostAction.key,
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
