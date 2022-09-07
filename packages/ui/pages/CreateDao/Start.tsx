import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { NewDao } from '@dao-dao/tstypes'
import { validateUrl } from '@dao-dao/utils'

import {
  Breadcrumbs,
  BreadcrumbsProps,
  GradientHero,
  ImageSelector,
} from '../../components'

export interface CreateDaoStartProps {
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs?: BreadcrumbsProps['crumbs']
}

export const CreateDaoStart = ({ extraCrumbs }: CreateDaoStartProps) => {
  const { t } = useTranslation()

  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext<NewDao>()

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <form className="flex flex-col items-stretch mx-auto max-w-6xl">
      <GradientHero childContainerClassName="px-6">
        <div className="flex flex-row items-center h-20">
          <Breadcrumbs
            crumbs={[{ href: '/home', label: 'Home' }, ...(extraCrumbs ?? [])]}
            current={t('title.newDao')}
          />
        </div>

        <div className="flex flex-col items-center py-10">
          <ImageSelector
            error={errors?.imageUrl}
            fieldName="imageUrl"
            register={register}
            validation={[validateUrl]}
            watch={watch}
          />

          <p className="mt-6 text-text-tertiary primary-text">
            {t('form.addAnImage')}
          </p>
        </div>
      </GradientHero>
    </form>
  )
}
