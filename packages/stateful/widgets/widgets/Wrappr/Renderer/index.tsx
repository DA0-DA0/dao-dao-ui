import {
  useCachedLoading,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../../actions'
import { ButtonLink, IconButtonLink } from '../../../../components'
import { useMembership } from '../../../../hooks/useMembership'
import { wrapprsSelector } from '../state'
import { WrapprData } from '../types'
import { Renderer as StatelessRenderer } from './Renderer'

export const Renderer = ({
  variables: { contract },
}: WidgetRendererProps<WrapprData>) => {
  const { chain_id: chainId } = useChain()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const wrapprsLoading = useCachedLoading(
    wrapprsSelector({
      contractAddress: contract,
      chainId,
    }),
    []
  )

  const createWrapprAction = useActionForKey(ActionKey.CreateWrappr)
  const createWrapprActionDefaults = createWrapprAction?.action.useDefaults()
  const updateWrapprAction = useActionForKey(ActionKey.UpdateWrappr)
  const updateWrapprActionDefaults = updateWrapprAction?.action.useDefaults()
  const deleteWrapprAction = useActionForKey(ActionKey.DeleteWrappr)

  return (
    <StatelessRenderer
      ButtonLink={ButtonLink}
      IconButtonLink={IconButtonLink}
      createWrapprHref={
        createWrapprAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: createWrapprAction.action.key,
                    data: createWrapprActionDefaults,
                  },
                ],
              }),
            })
          : undefined
      }
      deleteWrapprHref={
        deleteWrapprAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: deleteWrapprAction.action.key,
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
      wrapprsLoading={wrapprsLoading}
      updateWrapprHref={
        updateWrapprAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: updateWrapprAction.action.key,
                    data: {
                      ...updateWrapprActionDefaults,
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
