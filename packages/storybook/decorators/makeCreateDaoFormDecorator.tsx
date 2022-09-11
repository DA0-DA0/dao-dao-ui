import { DecoratorFn } from '@storybook/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DefaultNewDao } from '@dao-dao/state'
import { NewDao } from '@dao-dao/tstypes'
import { useThemeContext } from '@dao-dao/ui'

export const makeCreateDaoFormDecorator: (
  defaults?: Partial<NewDao>
) => DecoratorFn = (defaults) =>
  function CreateDaoFormDecorator(Story) {
    const methods = useForm<NewDao>({
      defaultValues: {
        ...DefaultNewDao,
        ...defaults,
      },
      mode: 'onChange',
    })

    const imageUrl = methods.watch('imageUrl')
    const { setAccentColor } = useThemeContext()

    // TODO: Move this logic to some wrapper that wraps all forms.
    // Set accent color based on image provided.
    useEffect(() => {
      if (!imageUrl) {
        setAccentColor(undefined)
        return
      }

      const absoluteUrl = new URL(imageUrl, document.baseURI).href
      fetch(`https://fac.withoutdoing.com/${absoluteUrl}`)
        .then((response) => response.text())
        // Only set color if appears to be valid color string.
        .then((value) => {
          const color = value.trim()
          if (!color.startsWith('#')) {
            return
          }

          setAccentColor(color)
        })
        .catch(console.error)
    }, [imageUrl, setAccentColor])

    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    )
  }
