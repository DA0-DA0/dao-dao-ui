import Emoji from 'a11y-react-emoji'
import { FC, useCallback } from 'react'

import {
  DefaultNewOrg,
  DEFAULT_NEW_ORG_GOV_TOKEN_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_ORG_SIMPLE_INITIAL_TIER_WEIGHT,
  NewOrgStructure,
} from '@/atoms/newOrg'
import { CreateOrgFormWrapper } from '@/components/org/create/CreateOrgFormWrapper'
import { CreateOrgStructure } from '@/components/org/create/CreateOrgStructure'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgPage: FC = () => {
  const { watchedNewOrg, setValue, formWrapperProps } = useCreateOrgForm(0)

  const onChange = useCallback(
    (structure: NewOrgStructure) => {
      setValue('structure', structure)

      // Swap initial tier voting power to the default for the structure
      // if the tiers have not yet been changed.
      if (
        watchedNewOrg.tiers.length === 1 &&
        watchedNewOrg.tiers[0].name === DefaultNewOrg.tiers[0].name &&
        watchedNewOrg.tiers[0].members.length === 1 &&
        watchedNewOrg.tiers[0].members[0].address === ''
      ) {
        setValue(
          'tiers.0.weight',
          structure === NewOrgStructure.UsingGovToken
            ? DEFAULT_NEW_ORG_GOV_TOKEN_INITIAL_TIER_WEIGHT
            : DEFAULT_NEW_ORG_SIMPLE_INITIAL_TIER_WEIGHT
        )
      }
    },
    [setValue, watchedNewOrg]
  )

  return (
    <>
      <SmallScreenNav />

      <CreateOrgFormWrapper {...formWrapperProps}>
        <div className="flex flex-col gap-4 items-stretch sm:flex-row md:flex-col xl:flex-row">
          <CreateOrgStructure
            description="Small organization with a few members who are likely to stick around. Members can be added and removed by a vote of existing members."
            emoji={<Emoji className="text-5xl" label="Handshake" symbol="🤝" />}
            newOrg={watchedNewOrg}
            onChange={onChange}
            structure={NewOrgStructure.Simple}
            title="Simple"
          />

          <CreateOrgStructure
            description="Fluid organization with many members who leave and join frequently. Members can join and leave by exchanging governance shares."
            emoji={<Emoji className="text-5xl" label="Yin yang" symbol="☯️" />}
            newOrg={watchedNewOrg}
            onChange={onChange}
            structure={NewOrgStructure.UsingGovToken}
            title="Governance Token-based"
          />
        </div>
      </CreateOrgFormWrapper>
    </>
  )
}

export default CreateOrgPage
