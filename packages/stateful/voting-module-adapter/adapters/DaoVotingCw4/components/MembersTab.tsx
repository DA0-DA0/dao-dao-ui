import { useTranslation } from 'react-i18next'

import {
  MembersTab as StatelessMembersTab,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionKey,
  LoadingDataWithError,
  StatefulDaoMemberCardProps,
} from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { ButtonLink, DaoMemberCard } from '../../../../components'
import { useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useLoadingVotingModule } from '../hooks/useLoadingVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const { isMember = false, totalVotingWeight } = useMembership({
    coreAddress,
  })
  const votingModule = useLoadingVotingModule(coreAddress, {
    fetchMembers: true,
  })

  const members: LoadingDataWithError<StatefulDaoMemberCardProps[]> =
    votingModule.loading
      ? { loading: true, errored: false }
      : votingModule.errored
      ? { loading: false, errored: true, error: votingModule.error }
      : {
          loading: false,
          errored: false,
          data:
            votingModule.data.members?.map(({ addr, weight }) => ({
              address: addr,
              balanceLabel: t('title.votingWeight'),
              balance: {
                loading: false,
                data: {
                  amount: weight,
                },
              },
              votingPowerPercent:
                totalVotingWeight === undefined
                  ? { loading: true }
                  : {
                      loading: false,
                      data: (weight / totalVotingWeight) * 100,
                    },
            })) || [],
        }

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      addMemberHref={getDaoProposalPath(coreAddress, 'create', {
        prefill: getDaoProposalSinglePrefill({
          actions: [
            {
              actionKey: ActionKey.ManageMembers,
              data: {
                toAdd: [{ addr: '', weight: NaN }],
                toRemove: [],
              },
            },
          ],
        }),
      })}
      isMember={isMember}
      members={members}
      topVoters={{
        show: false,
      }}
    />
  )
}
