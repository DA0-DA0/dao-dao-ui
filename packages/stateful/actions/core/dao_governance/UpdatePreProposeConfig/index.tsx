import { useMemo } from 'react'

import { BallotDepositEmoji, useDaoInfoContext } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'

import { SuspenseLoader, Trans } from '../../../../components'
import { matchAndLoadCommon } from '../../../../proposal-module-adapter'
import { useActionOptions } from '../../../react'
import {
  ProposalModuleWithAction,
  UpdatePreProposeConfigComponent,
  UpdatePreProposeConfigData,
} from './Component'

const useUpdatePreProposeConfigActions = (): ProposalModuleWithAction[] => {
  const options = useActionOptions()
  const { coreAddress, proposalModules } = useDaoInfoContext()

  const proposalModuleActions = useMemo(
    () =>
      proposalModules
        .flatMap((proposalModule): ProposalModuleWithAction | [] => {
          const action = matchAndLoadCommon(proposalModule, {
            chain: options.chain,
            coreAddress,
          }).fields.updatePreProposeConfigActionMaker?.(options)

          return action
            ? {
                proposalModule,
                action,
              }
            : []
        })
        // Sort proposal modules by prefix.
        .sort((a, b) =>
          a.proposalModule.prefix.localeCompare(b.proposalModule.prefix)
        ),
    [coreAddress, options, proposalModules]
  )

  return proposalModuleActions
}

const Component: ActionComponent = (props) => {
  const options = useUpdatePreProposeConfigActions()
  // Proposal modules should never change, so it should be safe to call hooks
  // in a loop here.
  const defaults = options.reduce(
    (acc, { proposalModule, action }) => ({
      ...acc,
      [proposalModule.address]: action.useDefaults(),
    }),
    {} as Record<string, Record<string, unknown>>
  )

  return (
    <UpdatePreProposeConfigComponent
      {...props}
      options={{
        options,
        defaults,
        SuspenseLoader,
        Trans,
      }}
    />
  )
}

export const makeUpdatePreProposeConfigAction: ActionMaker<
  UpdatePreProposeConfigData
> = ({ context, t }) => {
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<UpdatePreProposeConfigData> = () => {
    const actions = useUpdatePreProposeConfigActions()
    // Proposal modules should never change, so it should be safe to call hooks
    // in a loop here.
    const defaults = actions.map(({ action }) => action.useDefaults())

    return {
      proposalModuleAddress: actions[0]?.proposalModule.address ?? '',
      data: defaults[0] ?? {},
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    UpdatePreProposeConfigData
  > = () => {
    const actions = useUpdatePreProposeConfigActions()
    // Proposal modules should never change, so it should be safe to call hooks
    // in a loop here.
    const transforms = actions.map(({ action, ...props }) => ({
      ...props,
      transform: action.useTransformToCosmos(),
    }))

    return ({ proposalModuleAddress, data }) => {
      const transform = transforms.find(
        ({ proposalModule }) => proposalModule.address === proposalModuleAddress
      )?.transform
      if (!transform) {
        throw new Error(t('error.failedToFindMatchingProposalModule'))
      }

      return transform(data)
    }
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdatePreProposeConfigData> = (
    msg
  ) => {
    const actions = useUpdatePreProposeConfigActions()
    // Proposal modules should never change, so it should be safe to call hooks
    // in a loop here.
    const decodes = actions.map(({ action, ...props }) => ({
      ...props,
      decoded: action.useDecodedCosmosMsg(msg),
    }))

    const matchingDecode = decodes.find(({ decoded }) => decoded.match)

    return matchingDecode?.decoded.match
      ? {
          match: true,
          data: {
            proposalModuleAddress: matchingDecode.proposalModule.address,
            data: matchingDecode.decoded.data,
          },
        }
      : {
          match: false,
        }
  }

  return {
    key: ActionKey.UpdatePreProposeConfig,
    Icon: BallotDepositEmoji,
    label: t('form.updateProposalSubmissionConfigTitle'),
    description: t('info.updateProposalSubmissionConfigActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
