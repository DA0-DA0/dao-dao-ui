import Emoji from 'a11y-react-emoji'
import { FC, useCallback } from 'react'

import {
  DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
  DefaultNewDAO,
  NewDAOStructure,
} from '@/atoms'
import {
  CreateDAOFormWrapper,
  CreateDAOStructure,
  SmallScreenNav,
} from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOPage: FC = () => {
  const { watchedNewDAO, setValue, formWrapperProps } = useCreateDAOForm(0)

  const onChange = useCallback(
    (structure: NewDAOStructure) => {
      setValue('structure', structure)

      // Swap initial tier voting power to the default for the structure
      // if the tiers have not yet been changed.
      if (
        watchedNewDAO.tiers.length === 1 &&
        watchedNewDAO.tiers[0].name === DefaultNewDAO.tiers[0].name &&
        watchedNewDAO.tiers[0].members.length === 1 &&
        watchedNewDAO.tiers[0].members[0].address === ''
      ) {
        setValue(
          'tiers.0.weight',
          structure === NewDAOStructure.UsingGovToken
            ? DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT
            : DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT
        )
      }
    },
    [setValue, watchedNewDAO]
  )

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="flex flex-col gap-4 items-stretch sm:flex-row md:flex-col xl:flex-row">
          <CreateDAOStructure
            description="Small organization with a few members who are likely to stick around. Members can be added and removed by a vote of existing members."
            emoji={<Emoji className="text-5xl" label="Handshake" symbol="🤝" />}
            newDAO={watchedNewDAO}
            onChange={onChange}
            structure={NewDAOStructure.Simple}
            title="Simple"
          />

          <CreateDAOStructure
            description="Fluid organization with many members who leave and join frequently. Members can join and leave by exchanging governance shares."
            emoji={<Emoji className="text-5xl" label="Yin yang" symbol="☯️" />}
            newDAO={watchedNewDAO}
            onChange={onChange}
            structure={NewDAOStructure.UsingGovToken}
            title="Governance Token-based"
          />
        </div>
      </CreateDAOFormWrapper>
    </>
  )
}

export default CreateDAOPage
