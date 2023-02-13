import { Add } from '@mui/icons-material'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  DropdownIconButton,
  GridCardContainer,
  Loader,
  Tooltip,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'

import { VestingInfo } from '../types'

export interface PayrollTabProps {
  vestingPaymentsLoading: LoadingData<VestingInfo[]>
  isMember: boolean
  createVestingPaymentHref: string
  ButtonLink: ComponentType<ButtonLinkProps>
  VestingPaymentCard: ComponentType<VestingInfo>
}

export const PayrollTab = ({
  vestingPaymentsLoading,
  isMember,
  createVestingPaymentHref,
  ButtonLink,
  VestingPaymentCard,
}: PayrollTabProps) => {
  const { t } = useTranslation()

  // Vesting payments that are still vesting or have yet to be funded.
  const activeVestingPayments = vestingPaymentsLoading.loading
    ? []
    : vestingPaymentsLoading.data.filter(
        ({ vestingPayment }) =>
          vestingPayment.status === 'active' ||
          vestingPayment.status === 'unfunded'
      )
  // Vesting payments that have finished vesting.
  const completedVestingPayments = vestingPaymentsLoading.loading
    ? []
    : vestingPaymentsLoading.data.filter(
        ({ vestingPayment }) =>
          vestingPayment.status !== 'active' &&
          vestingPayment.status !== 'unfunded'
      )

  const [showingCompleted, setShowingCompleted] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8 border-b border-border-secondary pb-6">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.vestingPayments')}
          </p>

          <p className="secondary-text">
            {t('info.vestingPaymentsRefreshSeconds', { seconds: 30 })}
          </p>
        </div>

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

      <div className="mb-9 space-y-6">
        {vestingPaymentsLoading.loading || !vestingPaymentsLoading.data ? (
          <Loader fill={false} />
        ) : vestingPaymentsLoading.data.length ? (
          <>
            {activeVestingPayments.length > 0 && (
              <GridCardContainer cardType="wide">
                {activeVestingPayments.map((props, index) => (
                  <VestingPaymentCard key={index} {...props} />
                ))}
              </GridCardContainer>
            )}

            {completedVestingPayments.length > 0 && (
              <div className="space-y-4">
                <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
                  <DropdownIconButton
                    className="text-icon-primary"
                    open={showingCompleted}
                    toggle={() => setShowingCompleted((s) => !s)}
                  />

                  <p
                    className="cursor-pointer"
                    onClick={() => setShowingCompleted((s) => !s)}
                  >
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    {t('title.completed')} •{' '}
                    {t('info.numPayments', {
                      count: completedVestingPayments.length,
                    })}
                  </p>
                </div>

                {showingCompleted && (
                  <GridCardContainer cardType="wide">
                    {completedVestingPayments.map((props, index) => (
                      <VestingPaymentCard key={index} {...props} />
                    ))}
                  </GridCardContainer>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}
      </div>
    </div>
  )
}
