import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/tstypes'

import { Cw4VotingAdapter } from '../../../index'
import { DaoCreationConfig } from '../types'
import { TierCard } from './TierCard'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw4-voting / daoCreation / ui / TierCard',
  component: TierCard,
} as ComponentMeta<typeof TierCard>

// TODO: Fix memory crash.
const Template: ComponentStory<typeof TierCard> = (args) => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewDao<DaoCreationConfig>>({
    defaultValues: {
      ...DefaultNewDao,
      votingModuleAdapter: {
        id: Cw4VotingAdapter.id,
        data: Cw4VotingAdapter.daoCreation!.defaultConfig,
      },
    },
  })

  return (
    <div className="max-w-2xl">
      <TierCard
        {...args}
        control={control}
        data={watch('votingModuleAdapter.data')}
        errors={errors}
        register={register}
        remove={() => alert('remove')}
        setValue={setValue}
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
