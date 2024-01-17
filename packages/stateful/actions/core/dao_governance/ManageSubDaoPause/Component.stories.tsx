import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { EntityDisplay } from '../../../../components'
import { ManageSubDaoPauseComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / ManageSubDaoPause',
  component: ManageSubDaoPauseComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageSubDaoPauseComponent>
const Template: ComponentStory<typeof ManageSubDaoPauseComponent> = (args) => (
  <ManageSubDaoPauseComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    neutronSubdaos: {
      loading: false,
      updating: false,
      data: [
        'neutron1zjdv3u6svlazlydmje2qcp44yqkt0059chz8gmyl5yrklmgv6fzq9chelu',
        'neutron1fuyxwxlsgjkfjmxfthq8427dm2am3ya3cwcdr8gls29l7jadtazsuyzwcc',
      ],
    },
    EntityDisplay,
  },
}
