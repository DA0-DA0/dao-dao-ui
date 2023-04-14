import { ArrowOutwardRounded } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  IconButtonLink,
  InputErrorMessage,
  InputLabel,
  Loader,
  SelectInput,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ActionComponent, LoadingData } from '@dao-dao/types'
import { validateRequired } from '@dao-dao/utils'

import { Post } from '../../types'

export type DeletePostData = {
  id: string
}

type DeletePostOptions = {
  postsLoading: LoadingData<Post[]>
  postLoading: LoadingData<Post | undefined>
}

export const DeletePostComponent: ActionComponent<DeletePostOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { postsLoading, postLoading },
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<DeletePostData>()
  const id = watch((fieldNamePrefix + 'id') as 'id')

  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()

  return isCreating ? (
    postsLoading.loading ? (
      <Loader />
    ) : (
      <div className="flex flex-col gap-2">
        <InputLabel name={t('form.postToDelete')} />
        <SelectInput
          error={errors?.id}
          fieldName={(fieldNamePrefix + 'id') as 'id'}
          register={register}
          validation={[validateRequired]}
        >
          {postsLoading.data.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </SelectInput>
        <InputErrorMessage error={errors?.id} />
      </div>
    )
  ) : postLoading.loading ? (
    <Loader />
  ) : !postLoading.data ? (
    <p>{id}</p>
  ) : (
    <div className="flex flex-row items-center gap-2">
      {postLoading.data.title}

      {/* If post still exists in current list, link to it. */}
      {!postsLoading.loading &&
        postsLoading.data.some((post) => post.id === id) && (
          <IconButtonLink
            Icon={ArrowOutwardRounded}
            href={getDaoPath(
              coreAddress,
              undefined,
              `press/${postLoading.data.id}`
            )}
            iconClassName="text-icon-tertiary"
            openInNewTab
            size="xs"
            variant="ghost"
          />
        )}
    </div>
  )
}
