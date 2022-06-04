import { FC } from 'react'

import {
  ImageSelector,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '@dao-dao/ui'
import { validateRequired } from '@dao-dao/utils'

import { CreateOrgFormWrapper } from '@/components/org/create/CreateOrgFormWrapper'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgPage: FC = () => {
  const { register, watch, errors, formWrapperProps } = useCreateOrgForm(1)

  return (
    <>
      <SmallScreenNav />

      <CreateOrgFormWrapper {...formWrapperProps}>
        <div className="flex flex-row gap-8 items-stretch p-8 bg-disabled rounded-lg">
          <div className="flex flex-col gap-4 justify-center">
            <ImageSelector
              className="!bg-card !border-0"
              error={errors.imageUrl}
              label="imageUrl"
              register={register}
              watch={watch}
            />

            <p className="text-disabled">Add an image</p>
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <div>
              <TextInput
                error={errors.name}
                label="name"
                placeholder="Organization's name..."
                register={register}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.name} />
            </div>

            <div>
              <TextAreaInput
                error={errors.description}
                label="description"
                placeholder="Organization's description..."
                register={register}
                rows={4}
              />
              <InputErrorMessage error={errors.description} />
            </div>
          </div>
        </div>
      </CreateOrgFormWrapper>
    </>
  )
}

export default CreateOrgPage
