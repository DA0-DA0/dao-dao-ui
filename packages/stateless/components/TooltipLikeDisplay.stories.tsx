import { ArrowOutward } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TooltipLikeDisplay } from './TooltipLikeDisplay'

export default {
  title: 'DAO DAO / packages / stateless / components / TooltipLikeDisplay',
  component: TooltipLikeDisplay,
} as ComponentMeta<typeof TooltipLikeDisplay>

const Template: ComponentStory<typeof TooltipLikeDisplay> = (args) => (
  <TooltipLikeDisplay {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: <ArrowOutward className="!h-5 !w-5" />,
  label: 'Open in Stargaze',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=1114%3A5988',
  },
}

export const WithCaption = Template.bind({})
WithCaption.args = {
  icon: <ArrowOutward className="!h-5 !w-5" />,
  label: 'Open in Stargaze',
  caption: 'There is more information',
}
WithCaption.parameters = Default.parameters
