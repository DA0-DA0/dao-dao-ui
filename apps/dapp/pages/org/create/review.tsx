import { FC } from 'react'

import { InputLabel } from '@dao-dao/ui'

import { CreateOrgHeader } from '@/components/org/create/CreateOrgHeader'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgReviewPage: FC = () => {
  const { formOnSubmit, watch, Navigation } = useCreateOrgForm(2)

  const values = watch()

  return (
    <>
      <SmallScreenNav />
      <CreateOrgHeader />

      <form className="p-6 pt-2 mx-auto max-w-[800px]" onSubmit={formOnSubmit}>
        <div className="flex flex-col gap-6 items-stretch py-6 bg-disabled rounded-lg md:gap-10 md:py-10">
          <div className="grid grid-cols-[1fr_2fr] gap-16 justify-center items-center mx-auto w-5/6">
            <div className="flex flex-col gap-2 items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Org Logo"
                className="w-24 h-24 rounded-full"
                src={values.imageUrl}
              />
              <p className="text-xl">{values.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm" mono name="Description" />
              <p className="text-lg">{values.description}</p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-card"></div>
        </div>

        {Navigation}
      </form>
    </>
  )
}

export default CreateOrgReviewPage
