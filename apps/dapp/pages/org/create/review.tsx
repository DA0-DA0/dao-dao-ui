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
        <div className="flex flex-col gap-8 items-stretch bg-disabled rounded-lg">
          <div className="flex flex-row gap-16 py-2 px-4 md:py-8 md:px-16">
            <div className="flex flex-col gap-2 items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Org Logo"
                className="w-32 h-32 rounded-full"
                src={values.imageUrl}
              />
              <p className="text-lg font-bold">{values.name}</p>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <InputLabel mono name="Description" />
              <p className="text-lg font-bold">{values.description}</p>
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
