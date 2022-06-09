import Emoji from 'a11y-react-emoji'
import { FC, useCallback } from 'react'

import i18n from '@dao-dao/i18n'

import {
  DefaultNewOrg,
  DEFAULT_NEW_ORG_GOV_TOKEN_INITIAL_GROUP_WEIGHT,
  DEFAULT_NEW_ORG_SIMPLE_INITIAL_GROUP_WEIGHT,
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

      // Swap initial group voting power to the default for the structure
      // if the groups have not yet been changed.
      if (
        watchedNewOrg.groups.length === 1 &&
        watchedNewOrg.groups[0].name === DefaultNewOrg.groups[0].name &&
        watchedNewOrg.groups[0].members.length === 1 &&
        watchedNewOrg.groups[0].members[0].address === ''
      ) {
        setValue(
          'groups.0.weight',
          structure === NewOrgStructure.UsingGovToken
            ? DEFAULT_NEW_ORG_GOV_TOKEN_INITIAL_GROUP_WEIGHT
            : DEFAULT_NEW_ORG_SIMPLE_INITIAL_GROUP_WEIGHT
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
            description={i18n.t('Simple DAO description')}
            emoji={<Emoji className="text-5xl" label="Handshake" symbol="🤝" />}
            newOrg={watchedNewOrg}
            onChange={onChange}
            structure={NewOrgStructure.Simple}
            title={i18n.t('Simple DAO')}
          />

          <CreateOrgStructure
            description={i18n.t('Gov token DAO description')}
            emoji={<Emoji className="text-5xl" label="Yin yang" symbol="☯️" />}
            newOrg={watchedNewOrg}
            onChange={onChange}
            structure={NewOrgStructure.UsingGovToken}
            title={i18n.t('Gov token DAO')}
          />
        </div>
      </CreateOrgFormWrapper>
    </>
  )
}

export default CreateOrgPage
