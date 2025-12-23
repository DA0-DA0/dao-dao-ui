import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  MembersTab as StatelessMembersTab,
  useDaoNavHelpers,
  useVotingModule,
} from '@dao-dao/stateless'
import {
  ActionKey,
  LoadingDataWithError,
  StatefulDaoMemberCardProps,
} from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { ButtonLink, DaoMemberCard } from '../../../../components'
import { useEntityMap, useMembership } from '../../../../hooks'
import { useLoadingVotingModuleInfo } from '../hooks/useLoadingVotingModuleInfo'

export const MembersTab = () => {
  const { t } = useTranslation()
  const votingModule = useVotingModule()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const { isMember = false, totalVotingWeight } = useMembership()
  const loadingMembers = useLoadingVotingModuleInfo({
    fetchMembers: true,
  })

  const members: LoadingDataWithError<StatefulDaoMemberCardProps[]> =
    loadingMembers.loading
      ? { loading: true, errored: false }
      : loadingMembers.errored
        ? { loading: false, errored: true, error: loadingMembers.error }
        : {
            loading: false,
            errored: false,
            data:
              loadingMembers.data.members?.map(({ addr, weight }) => ({
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
                        data: HugeDecimal.from(weight)
                          .div(totalVotingWeight)
                          .times(100)
                          .toNumber(),
                      },
              })) || [],
          }

  const { map: entityMap } = useEntityMap({
    addresses:
      members.loading || members.errored
        ? []
        : members.data.map((member) => member.address),
  })

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      addMemberHref={getDaoProposalPath(
        votingModule.dao.coreAddress,
        'create',
        {
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
        }
      )}
      entityMap={entityMap}
      isMember={isMember}
      members={members}
      topVoters={{
        show: false,
      }}
    />
  )
}
