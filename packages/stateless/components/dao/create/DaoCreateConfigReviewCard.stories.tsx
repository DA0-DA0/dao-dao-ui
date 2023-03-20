import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { makeDefaultNewDao } from '@dao-dao/stateful'
import { VotingDurationReview } from '@dao-dao/stateful/proposal-module-adapter/adapters/common/VotingDurationVotingConfigItem'
import { NewDao } from '@dao-dao/types'

import { HourglassEmoji } from '../../emoji'
import { DaoCreateConfigReviewCard } from './DaoCreateConfigReviewCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / DaoCreateConfigReviewCard',
  component: DaoCreateConfigReviewCard,
  decorators: [],
} as ComponentMeta<typeof DaoCreateConfigReviewCard>

const Template: ComponentStory<typeof DaoCreateConfigReviewCard> = (args) => {
  const { watch } = useForm<NewDao>({
    defaultValues: makeDefaultNewDao(),
    mode: 'onChange',
  })

  const newDao = watch()

  return (
    <div className="max-w-xs">
      <DaoCreateConfigReviewCard
        {...args}
        review={
          <VotingDurationReview
            data={newDao.proposalModuleAdapters[0].data}
            newDao={newDao}
          />
        }
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  Icon: HourglassEmoji,
  name: 'Voting duration',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=982%3A45084',
  },
}
