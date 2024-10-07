import {
  useCachedLoading,
  useDao,
  useDaoNavHelpers,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { ButtonLink, IconButtonLink } from '../../../../components'
import { useMembership } from '../../../../hooks/useMembership'
import { postsSelector } from '../state'
import { PressData } from '../types'
import { Renderer as StatelessRenderer } from './Renderer'

export const Renderer = ({
  variables: { chainId: configuredChainId, contract },
}: WidgetRendererProps<PressData>) => {
  const { chainId: daoChainId, coreAddress } = useDao()
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

  const createPostAction = useInitializedActionForKey(ActionKey.CreatePost)
  const updatePostAction = useInitializedActionForKey(ActionKey.UpdatePost)
  const deletePostAction = useInitializedActionForKey(ActionKey.DeletePost)

  return (
    <StatelessRenderer
      ButtonLink={ButtonLink}
      IconButtonLink={IconButtonLink}
      createPostHref={
        !createPostAction.loading && !createPostAction.errored
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: createPostAction.data.key,
                    data: createPostAction.data.defaults,
                  },
                ],
              }),
            })
          : undefined
      }
      deletePostHref={
        !deletePostAction.loading && !deletePostAction.errored
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: deletePostAction.data.key,
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
        !updatePostAction.loading && !updatePostAction.errored
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: updatePostAction.data.key,
                    data: {
                      ...updatePostAction.data.defaults,
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
