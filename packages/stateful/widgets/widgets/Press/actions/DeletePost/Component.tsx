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
}

export const DeletePostComponent: ActionComponent<DeletePostOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { postsLoading },
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<DeletePostData>()

  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()

  const id = watch((fieldNamePrefix + 'id') as 'id')
  const post = postsLoading.loading
    ? undefined
    : postsLoading.data.find((p) => p.id === id)

  return postsLoading.loading ? (
    <Loader />
  ) : isCreating ? (
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
  ) : post ? (
    <div className="flex flex-row items-center gap-2">
      {post.title}

      <IconButtonLink
        Icon={ArrowOutwardRounded}
        href={getDaoPath(coreAddress, undefined, `press/${post.id}`)}
        iconClassName="text-icon-tertiary"
        openInNewTab
        size="xs"
        variant="ghost"
      />
    </div>
  ) : (
    <p>{id}</p>
  )
}
