import { useMemo } from 'react'

import { BallotDepositEmoji, useDaoContext } from '@dao-dao/stateless'
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
  UpdateProposalConfigComponent,
  UpdateProposalConfigData,
} from './Component'

const useUpdateProposalConfigActions = (): ProposalModuleWithAction[] => {
  const options = useActionOptions()
  const { dao } = useDaoContext()

  const proposalModuleActions = useMemo(
    () =>
      dao.info.proposalModules
        .flatMap((proposalModule): ProposalModuleWithAction | [] => {
          const action = matchAndLoadCommon(
            dao,
            proposalModule.address
          ).fields.updateConfigActionMaker(options)

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
    [dao, options]
  )

  return proposalModuleActions
}

const Component: ActionComponent = (props) => {
  const options = useUpdateProposalConfigActions()
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
    <UpdateProposalConfigComponent
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

export const makeUpdateProposalConfigAction: ActionMaker<
  UpdateProposalConfigData
> = ({ context, t }) => {
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
    const actions = useUpdateProposalConfigActions()
    // Proposal modules should never change, so it should be safe to call hooks
    // in a loop here.
    const defaults = actions.map(({ action }) => action.useDefaults())

    return {
      proposalModuleAddress: actions[0]?.proposalModule.address ?? '',
      data: defaults[0] ?? {},
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    UpdateProposalConfigData
  > = () => {
    const actions = useUpdateProposalConfigActions()
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

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
    msg
  ) => {
    const actions = useUpdateProposalConfigActions()
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
    key: ActionKey.UpdateProposalConfig,
    Icon: BallotDepositEmoji,
    label: t('form.updateVotingConfigTitle'),
    description: t('info.updateVotingConfigActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
