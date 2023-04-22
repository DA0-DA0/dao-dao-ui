import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { NewDao } from '@dao-dao/types'
import { DaoVotingMembershipBasedCreatorId } from '@dao-dao/utils'

import { DaoVotingMembershipBasedCreator } from '.'
import { makeDefaultNewDao } from '../../../recoil/atoms'
import { TierCard } from './TierCard'
import { VotingModuleCreatorConfig } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / creators / DaoVotingCw4 / TierCard',
  component: TierCard,
} as ComponentMeta<typeof TierCard>

const Template: ComponentStory<typeof TierCard> = (args) => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewDao<VotingModuleCreatorConfig>>({
    defaultValues: {
      ...makeDefaultNewDao(),
      votingModuleCreator: {
        id: DaoVotingMembershipBasedCreatorId,
        data: DaoVotingMembershipBasedCreator.defaultConfig,
      },
    },
  })

  return (
    <div className="max-w-2xl">
      <TierCard
        {...args}
        control={control}
        data={watch('votingModuleCreator.data')}
        errors={errors}
        register={register}
        remove={() => alert('remove')}
        setValue={setValue}
        watch={watch}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  tierIndex: 0,
  showColorDotOnMember: true,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A42908',
  },
}
