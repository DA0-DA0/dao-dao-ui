import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/types'

import { CwdVotingCw20StakedAdapter } from '../../../index'
import { DaoCreationConfig } from '../types'
import { TierCard } from './TierCard'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / CwdVotingCw20Staked / daoCreation / TierCard',
  component: TierCard,
} as ComponentMeta<typeof TierCard>

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
        id: CwdVotingCw20StakedAdapter.id,
        data: CwdVotingCw20StakedAdapter.daoCreation!.defaultConfig,
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
