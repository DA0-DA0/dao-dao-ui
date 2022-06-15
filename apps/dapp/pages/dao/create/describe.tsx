import { FC } from 'react'

import {
  ImageSelector,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '@dao-dao/ui'
import { validateRequired } from '@dao-dao/utils'

import { CreateDAOFormWrapper, SmallScreenNav } from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOPage: FC = () => {
  const { register, watch, errors, formWrapperProps } = useCreateDAOForm(1)

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="flex relative flex-row gap-8 items-stretch p-8 bg-disabled rounded-lg">
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
                placeholder="DAO's name..."
                register={register}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.name} />
            </div>

            <div>
              <TextAreaInput
                error={errors.description}
                label="description"
                placeholder="DAO's description..."
                register={register}
                rows={4}
              />
              <InputErrorMessage error={errors.description} />
            </div>
          </div>
        </div>
      </CreateDAOFormWrapper>
    </>
  )
}

export default CreateDAOPage
