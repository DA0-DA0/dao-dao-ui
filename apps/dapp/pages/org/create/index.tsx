import { FC } from 'react'

import {
  ImageSelector,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '@dao-dao/ui'

import { CreateOrgHeader } from '@/components/org/create/CreateOrgHeader'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgPage: FC = () => {
  const { register, formOnSubmit, watch, errors, Navigation } =
    useCreateOrgForm(0)

  return (
    <>
      <SmallScreenNav />
      <CreateOrgHeader />

      <form className="p-6 pt-2 mx-auto max-w-[800px]" onSubmit={formOnSubmit}>
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
                required
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

        {Navigation}
      </form>
    </>
  )
}

export default CreateOrgPage
