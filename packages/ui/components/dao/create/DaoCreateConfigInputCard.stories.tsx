import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import {
  VotingDurationIcon,
  VotingDurationInput,
} from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/daoCreation'
import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/tstypes'

import { DaoCreateConfigInputCard } from './DaoCreateConfigInputCard'

export default {
  title:
    'DAO DAO / packages / ui / components / dao / create / DaoCreateConfigInputCard',
  component: DaoCreateConfigInputCard,
  decorators: [],
} as ComponentMeta<typeof DaoCreateConfigInputCard>

const Template: ComponentStory<typeof DaoCreateConfigInputCard> = (args) => {
  const { register, watch, setValue } = useForm<NewDao>({
    defaultValues: DefaultNewDao,
    mode: 'onChange',
  })

  const newDao = watch()

  return (
    <div className="max-w-xs">
      <DaoCreateConfigInputCard
        {...args}
        input={
          <VotingDurationInput
            data={newDao.proposalModuleAdapters[0].data}
            newDao={newDao}
            register={(fieldName, options) =>
              register(
                (`proposalModuleAdapters.0.data.` +
                  fieldName) as `proposalModuleAdapters.${number}.data.${string}`,
                options
              )
            }
            setValue={(fieldName, value, options) =>
              setValue(
                (`proposalModuleAdapters.0.data.` +
                  fieldName) as `proposalModuleAdapters.${number}.data.${string}`,
                value,
                options
              )
            }
            watch={(fieldName) =>
              watch(
                (`proposalModuleAdapters.0.data.` +
                  fieldName) as `proposalModuleAdapters.${number}.data.${string}`
              )
            }
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
  description:
    'The amount of time proposals are open for voting. A low proposal duration may increase the speed at which your DAO can pass proposals. Setting the duration too low may make it diffcult for proposals to pass as voters will have limited time to vote. After this time elapses, the proposal will either pass or fail.',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A46355',
  },
}
