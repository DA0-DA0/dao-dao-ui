import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useRecoilState } from 'recoil'

import { SubmitButton } from '@dao-dao/ui'

import { NewOrg, newOrgAtom } from '@/atoms/org'

export const createOrgFormPages = [
  {
    href: '/org/create',
    label: '1. Describe your org',
  },
  {
    href: '/org/create/voting',
    label: '2. Configure voting',
  },
  {
    href: '/org/create/review',
    label: '3. Review and submit',
  },
]

export const useCreateOrgForm = (pageIndex: number) => {
  const router = useRouter()
  const [newOrg, setNewOrg] = useRecoilState(newOrgAtom)

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    watch,
    control,
    setValue,
  } = useForm({ defaultValues: newOrg })

  // // Ensure all previous fields are valid.
  // useEffect(() => {
  //   const firstInvalidRequiredField = newCampaignFieldEntries.find(
  //     ([field, { required }]) => {
  //       if (!required) return false

  //       const value = newOrg[field as keyof NewCampaign]
  //       return (
  //         (typeof value === 'string' && !value.trim()) ||
  //         (typeof value === 'number' && value < 0) ||
  //         value === undefined
  //       )
  //     }
  //   )?.[1]

  //   // Show review button if there are no invalid required fields OR we're on the last page.
  //   setShowReview(!firstInvalidRequiredField || id === numPagesBeforeReview)

  //   // If no invalid required fields OR the first invalid required field is on the current page or after, no need to redirect.
  //   if (!firstInvalidRequiredField || firstInvalidRequiredField.pageId >= id)
  //     return

  //   // Route to the first page with an invalid required field.
  //   router.push(
  //     `/create/${
  //       firstInvalidRequiredField.pageId === 1
  //         ? ''
  //         : firstInvalidRequiredField.pageId
  //     }`
  //   )
  // }, [router, newOrg])

  const onSubmit: SubmitHandler<Partial<NewOrg>> = useCallback(
    (values, event) => {
      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      setNewOrg((prevNewOrg) => ({
        ...prevNewOrg,
        ...values,
      }))

      router.push(
        createOrgFormPages[
          submitterValue === 'Back'
            ? Math.max(0, pageIndex - 1)
            : submitterValue === 'Review'
            ? createOrgFormPages.length - 1
            : Math.min(createOrgFormPages.length - 1, pageIndex + 1)
        ].href
      )
    },
    [pageIndex, router, setNewOrg]
  )

  const onError: SubmitErrorHandler<FieldValues> = useCallback(
    (_, event) => {
      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      // Allow Back press without required fields.
      if (submitterValue === 'Back') return onSubmit(getValues(), event)
    },
    [getValues, onSubmit]
  )

  const showBack = useMemo(() => pageIndex > 0, [pageIndex])
  const showNext = useMemo(
    () => pageIndex < createOrgFormPages.length - 1,
    [pageIndex]
  )
  const Navigation = (
    <div
      className="flex flex-row items-center mt-8"
      // justify-end doesn't work in tailwind for some reason
      style={{ justifyContent: showBack ? 'space-between' : 'flex-end' }}
    >
      {showBack && <SubmitButton label="Back" variant="secondary" />}
      {showNext && <SubmitButton label="Continue" />}
    </div>
  )

  const formOnSubmit = useMemo(
    () => handleSubmit(onSubmit, onError),
    [handleSubmit, onSubmit, onError]
  )

  return {
    formOnSubmit,
    errors,
    register,
    getValues,
    watch,
    control,
    setValue,
    Navigation,
  }
}
