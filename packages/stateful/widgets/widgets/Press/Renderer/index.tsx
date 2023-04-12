import {
  useCachedLoading,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'

import { useActionForKey } from '../../../../actions'
import { ButtonLink } from '../../../../components'
import { useDaoProposalSinglePrefill } from '../../../../hooks/useDaoProposalSinglePrefill'
import { useMembership } from '../../../../hooks/useMembership'
import { postsSelector } from '../state'
import { PressData } from '../types'
import { Renderer as StatelessRenderer } from './Renderer'

export const Renderer = ({
  variables: { contract },
}: WidgetRendererProps<PressData>) => {
  const { coreAddress, chainId } = useDaoInfoContext()
  const { getDaoProposalPath } = useNavHelpers()
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

  return (
    <StatelessRenderer
      ButtonLink={ButtonLink}
      createPostHref={
        createPostAction && createPostPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: createPostPrefill,
            })
          : undefined
      }
      isMember={isMember}
      postsLoading={postsLoading}
    />
  )
}
