import { Ballot } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ErrorPage,
  LineLoader,
  NoContent,
  useDao,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { LoadingDataWithError, WidgetId } from '@dao-dao/types'
import { IconButtonLinkProps } from '@dao-dao/types/components/IconButtonLink'

import {
  PagePath,
  StatefulSurveyRowProps,
  SurveyWithMetadata,
} from '../../../types'
import { SurveyList } from '../SurveyList'

export type HomeProps = {
  loadingSurveys: LoadingDataWithError<SurveyWithMetadata[]>
  isMember: boolean
  IconButtonLink: ComponentType<IconButtonLinkProps>
  SurveyRow: ComponentType<StatefulSurveyRowProps>
}

export const Home = ({ loadingSurveys, isMember, SurveyRow }: HomeProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDao()
  const { getDaoPath } = useDaoNavHelpers()

  return (
    <div className="flex flex-col gap-6">
      {loadingSurveys.loading ? (
        <LineLoader type="retroactive" />
      ) : loadingSurveys.errored ? (
        <ErrorPage error={loadingSurveys.error} />
      ) : loadingSurveys.data.length > 0 ? (
        <SurveyList SurveyRow={SurveyRow} surveys={loadingSurveys.data} />
      ) : (
        <NoContent
          Icon={Ballot}
          actionNudge={t('info.createFirstOneQuestion')}
          body={t('info.noCompletedCyclesYet')}
          buttonLabel={t('button.newCompensationCycle')}
          href={
            isMember
              ? getDaoPath(
                  coreAddress,
                  WidgetId.RetroactiveCompensation + '/' + PagePath.Create
                )
              : undefined
          }
          shallow
        />
      )}
    </div>
  )
}
