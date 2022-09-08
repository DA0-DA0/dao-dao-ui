import { DecoratorFn } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/tstypes'

export const makeCreateDaoFormDecorator: (
  defaults?: Partial<NewDao>
) => DecoratorFn = (defaults) =>
  function CreateDaoFormDecorator(Story) {
    const methods = useForm<NewDao>({
      defaultValues: {
        ...DefaultNewDao,
        ...defaults,
      },
    })

    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    )
  }
