import { action } from '@storybook/addon-actions'
import { DecoratorFn } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

export const makeReactHookFormDecorator =
  (defaultValues?: Record<string, unknown>): DecoratorFn =>
  (Story) => {
    const methods = useForm({
      defaultValues: {
        // Used in various components to choose default values in inputs. Set
        // `fieldName` to one of these to take advantage of its default value.
        true: true,
        false: false,
        two: '2',
        moonphaseImageUrl: 'https://moonphase.is/image.svg',

        ...defaultValues,
      },
    })

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(action('react-hook-form submit'))}>
          <Story />
        </form>
      </FormProvider>
    )
  }

export const ReactHookFormDecorator = makeReactHookFormDecorator()
