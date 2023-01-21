import { Add } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  GridCardContainer,
  Loader,
  Tooltip,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'

import { StatefulVestingPaymentCardProps } from '../types'

export interface PayrollTabProps {
  vestingPaymentsLoading: LoadingData<StatefulVestingPaymentCardProps[]>
  isMember: boolean
  createVestingPaymentHref: string
  ButtonLink: ComponentType<ButtonLinkProps>
  VestingPaymentCard: ComponentType<StatefulVestingPaymentCardProps>
}

export const PayrollTab = ({
  vestingPaymentsLoading,
  isMember,
  createVestingPaymentHref,
  ButtonLink,
  VestingPaymentCard,
}: PayrollTabProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8 border-b border-border-secondary pb-6">
        <p className="title-text text-text-body">
          {t('title.vestingPayments')}
        </p>

        <Tooltip
          title={
            !isMember
              ? t('error.mustBeMemberToCreateVestingPayment')
              : undefined
          }
        >
          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={createVestingPaymentHref}
          >
            <Add className="!h-4 !w-4" />
            {t('button.newVestingPayment')}
          </ButtonLink>
        </Tooltip>
      </div>

      <div className="mb-9">
        {vestingPaymentsLoading.loading || !vestingPaymentsLoading.data ? (
          <Loader fill={false} />
        ) : vestingPaymentsLoading.data.length ? (
          <GridCardContainer cardType="wide">
            {vestingPaymentsLoading.data.map((props, index) => (
              <VestingPaymentCard key={index} {...props} />
            ))}
          </GridCardContainer>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}
      </div>
    </div>
  )
}
