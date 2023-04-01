import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { useLoadedActionsAndCategories } from '../../../react'
import { CsvImportComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / advanced / CsvImport',
  component: CsvImportComponent,
  decorators: [
    makeDaoProvidersDecorator(makeDaoInfo()),
    ReactHookFormDecorator,
  ],
} as ComponentMeta<typeof CsvImportComponent>

const Template: ComponentStory<typeof CsvImportComponent> = (args) => (
  <CsvImportComponent
    {...args}
    options={{
      loadedActions: useLoadedActionsAndCategories().loadedActions,
    }}
  />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
}
