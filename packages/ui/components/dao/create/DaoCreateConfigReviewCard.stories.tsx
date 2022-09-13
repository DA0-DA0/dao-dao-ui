import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import {
  VotingDurationIcon,
  VotingDurationReview,
} from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/daoCreation'
import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/tstypes'

import { DaoCreateConfigReviewCard } from './DaoCreateConfigReviewCard'

export default {
  title:
    'DAO DAO / packages / ui / components / dao / create / DaoCreateConfigReviewCard',
  component: DaoCreateConfigReviewCard,
  decorators: [],
} as ComponentMeta<typeof DaoCreateConfigReviewCard>

const Template: ComponentStory<typeof DaoCreateConfigReviewCard> = (args) => {
  const { watch } = useForm<NewDao>({
    defaultValues: DefaultNewDao,
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
  Icon: VotingDurationIcon,
  name: 'Voting duration',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=982%3A45084',
  },
}
