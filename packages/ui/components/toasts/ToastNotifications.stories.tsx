import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { ToastNotifications } from './ToastNotifications'

export default {
  title: 'DAO DAO / packages / ui / components / toasts / ToastNotifications',
  component: ToastNotifications,
} as ComponentMeta<typeof ToastNotifications>

const Template: ComponentStory<typeof ToastNotifications> = (_args) => {
  useEffect(() => {
    toast.success('Success')
    toast.error('Error')
    toast.loading('Loading...')
  }, [])

  return <ToastNotifications />
}

export const Default = Template.bind({})
Default.args = {}
