import { Add } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'

import { NewSurvey } from '../../types'

export interface NewSurveyFormProps {
  onCreate: (newSurvey: NewSurvey) => Promise<void>
  loading: boolean
}

export const NewSurveyForm = ({ onCreate, loading }: NewSurveyFormProps) => {
  const { t } = useTranslation()
  const { watch, register, handleSubmit } = useForm<NewSurvey>()

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onCreate)}>
      <Button className="self-start" loading={loading} type="submit">
        <Add className="!h-4 !w-4" />
        <p>{t('button.create')}</p>
      </Button>
    </form>
  )
}
