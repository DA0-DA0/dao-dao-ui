import { DecoratorFn } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/tstypes'

export const CreateDaoFormDecorator: DecoratorFn = (Story) => {
  const methods = useForm<NewDao>({
    defaultValues: DefaultNewDao,
  })

  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  )
}
