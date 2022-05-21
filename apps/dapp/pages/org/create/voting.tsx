import { FC } from 'react'
import { useFieldArray } from 'react-hook-form'

import { Button } from '@dao-dao/ui'

import { CreateOrgGroup } from '@/components/org/create/Group'
import { CreateOrgHeader } from '@/components/org/create/Header'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgVotingPage: FC = () => {
  const {
    control,
    register,
    formOnSubmit,
    watch,
    errors,
    setValue,
    Navigation,
  } = useCreateOrgForm(1)

  const {
    fields: groups,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control,
    name: 'groups',
  })

  return (
    <>
      <SmallScreenNav />
      <CreateOrgHeader />

      <form className="p-6 pt-2 mx-auto max-w-[800px]" onSubmit={formOnSubmit}>
        <div className="flex flex-col gap-4 items-stretch">
          {groups.map(({ id }, idx) => (
            <CreateOrgGroup
              key={id}
              control={control}
              errors={errors}
              groupIndex={idx}
              register={register}
              remove={() => removeGroup(idx)}
              setValue={setValue}
              watch={watch}
            />
          ))}

          <Button
            className="self-start"
            onClick={() => appendGroup({})}
            variant="secondary"
          >
            Add group
          </Button>
        </div>

        {Navigation}
      </form>
    </>
  )
}

export default CreateOrgVotingPage
