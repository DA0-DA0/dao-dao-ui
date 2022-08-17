import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/react/types-7-0'
import React, { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const StorybookFormProvider = ({ children }: PropsWithChildren<{}>) => {
  const methods = useForm({
    defaultValues: {
      // Used in various components to choose default values in inputs. Set
      // `fieldName` to one of these to take advantage of its default value.
      true: true,
      false: false,
      two: '2',
      moonphaseImageUrl: 'https://moonphase.is/image.svg',
    },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action('react-hook-form submit'))}>
        {children}
      </form>
    </FormProvider>
  )
}

export const ReactHookFormStoryDecorator = (Story: FC): ReturnType<StoryFn> => (
  <StorybookFormProvider>
    <Story />
  </StorybookFormProvider>
)
