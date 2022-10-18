import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { Notifications } from './Notifications'

export default {
  title: 'DAO DAO / packages / ui / components / Notifications',
  component: Notifications,
} as ComponentMeta<typeof Notifications>

const Template: ComponentStory<typeof Notifications> = (_args) => {
  useEffect(() => {
    toast.success('Success')
    toast.error('Error')
    toast.loading('Loading...')
  }, [])

  return <Notifications />
}

export const Default = Template.bind({})
Default.args = {}
