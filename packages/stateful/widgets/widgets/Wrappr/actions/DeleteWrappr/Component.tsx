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
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionComponent, LoadingData } from '@dao-dao/types'
import { validateRequired } from '@dao-dao/utils'

import { Wrappr } from '../../types'

export type DeleteWrapprData = {
  id: string
}

type DeleteWrapprOptions = {
  warpprsLoading: LoadingData<Wrappr[]>
  wrapprLoading: LoadingData<Wrappr | undefined>
}

export const DeleteWrapprComponent: ActionComponent<DeleteWrapprOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { wrapprsLoading, wrapprLoading },
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<DeleteWrapprData>()
  const id = watch((fieldNamePrefix + 'id') as 'id')

  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()

  return isCreating ? (
    wrapprsLoading.loading ? (
      <Loader />
    ) : (
      <div className="flex flex-col gap-2">
        <InputLabel name={t('form.wrapprToDelete')} />
        <SelectInput
          error={errors?.id}
          fieldName={(fieldNamePrefix + 'id') as 'id'}
          register={register}
          validation={[validateRequired]}
        >
          {wrapprsLoading.data.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </SelectInput>
        <InputErrorMessage error={errors?.id} />
      </div>
    )
  ) : wrapprLoading.loading ? (
    <Loader />
  ) : !wrapprLoading.data ? (
    <p>{id}</p>
  ) : (
    <div className="flex flex-row items-center gap-2">
      {wrapprLoading.data.title}

      {/* If wrappr still exists in current list, link to it. */}
      {!warpprsLoading.loading &&
        warpprsLoading.data.some((wrappr) => wrappr.id === id) && (
          <IconButtonLink
            Icon={ArrowOutwardRounded}
            href={getDaoPath(coreAddress, `wrappr/${wrapprLoading.data.id}`)}
            iconClassName="text-icon-tertiary"
            openInNewTab
            size="xs"
            variant="ghost"
          />
        )}
    </div>
  )
}
