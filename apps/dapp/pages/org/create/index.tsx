import Emoji from 'a11y-react-emoji'
import { FC } from 'react'

import { NewOrgStructure } from '@/atoms/newOrg'
import { CreateOrgFormWrapper } from '@/components/org/create/CreateOrgFormWrapper'
import { CreateOrgStructure } from '@/components/org/create/CreateOrgStructure'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgPage: FC = () => {
  const { watchedNewOrg, setValue, formWrapperProps } = useCreateOrgForm(0)

  return (
    <>
      <SmallScreenNav />

      <CreateOrgFormWrapper {...formWrapperProps}>
        <div className="flex flex-col gap-4 items-stretch sm:flex-row md:flex-col xl:flex-row">
          <CreateOrgStructure
            description="Small organization with a few members who are likely to stick around. Members can be added and removed by a vote of existing members."
            emoji={<Emoji className="text-5xl" label="Handshake" symbol="🤝" />}
            newOrg={watchedNewOrg}
            setValue={setValue}
            structure={NewOrgStructure.Simple}
            title="Simple"
          />

          <CreateOrgStructure
            description="Fluid organization with many members who leave and join frequently. Members can join and leave by exchanging governance shares."
            emoji={<Emoji className="text-5xl" label="Yin yang" symbol="☯️" />}
            newOrg={watchedNewOrg}
            setValue={setValue}
            structure={NewOrgStructure.UsingGovToken}
            title="Governance Token-based"
          />
        </div>
      </CreateOrgFormWrapper>
    </>
  )
}

export default CreateOrgPage
