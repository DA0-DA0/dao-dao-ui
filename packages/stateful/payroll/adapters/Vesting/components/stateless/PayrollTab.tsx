import { Add } from '@mui/icons-material'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DropdownIconButton, Loader, Modal, Tooltip } from '@dao-dao/stateless'
import {
  ButtonLinkProps,
  LoadingData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'

import { VestingInfo } from '../../types'
import { VestingPaymentLine } from './VestingPaymentLine'

export interface PayrollTabProps {
  vestingPaymentsLoading: LoadingData<VestingInfo[]>
  isMember: boolean
  createVestingPaymentHref: string
  ButtonLink: ComponentType<ButtonLinkProps>
  VestingPaymentCard: ComponentType<VestingInfo>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const PayrollTab = ({
  vestingPaymentsLoading,
  isMember,
  createVestingPaymentHref,
  ButtonLink,
  VestingPaymentCard,
  EntityDisplay,
}: PayrollTabProps) => {
  const { t } = useTranslation()

  // Vesting payments that have not yet been funded or fully claimed.
  const activeVestingPayments = vestingPaymentsLoading.loading
    ? []
    : vestingPaymentsLoading.data.filter(({ completed }) => !completed)
  // Vesting payments that have been funded and fully claimed.
  const completedVestingPayments = vestingPaymentsLoading.loading
    ? []
    : vestingPaymentsLoading.data.filter(({ completed }) => completed)

  const [showingCompleted, setShowingCompleted] = useState(false)

  const [vestingPaymentModalOpen, setVestingPaymentModalOpen] = useState(false)
  const [openVestingPayment, setOpenVestingPayment] = useState<
    VestingInfo | undefined
  >()
  // Wait for modal to close before clearing the open vesting payment to prevent
  // UI flicker.
  useEffect(() => {
    if (!vestingPaymentModalOpen) {
      const timeout = setTimeout(() => setOpenVestingPayment(undefined), 200)
      return () => clearTimeout(timeout)
    }
  }, [vestingPaymentModalOpen])

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
              <div className="space-y-1">
                <div className="secondary-text mb-4 mt-2 grid grid-cols-2 items-center gap-4 px-4 md:grid-cols-[2fr_3fr_3fr_4fr]">
                  <p>{t('title.recipient')}</p>
                  <p className="hidden md:block">{t('title.start')}</p>
                  <p className="hidden md:block">{t('title.end')}</p>
                  <p className="text-right">
                    {t('title.vestedOfTotalPayment')}
                  </p>
                </div>

                {activeVestingPayments.map((props, index) => (
                  <VestingPaymentLine
                    key={index}
                    EntityDisplay={EntityDisplay}
                    onClick={() => {
                      setVestingPaymentModalOpen(true)
                      setOpenVestingPayment(props)
                    }}
                    transparentBackground={index % 2 !== 0}
                    {...props}
                  />
                ))}
              </div>
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
                    {t('title.completed')}
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    {' • '}
                    {t('info.numPayments', {
                      count: completedVestingPayments.length,
                    })}
                  </p>
                </div>

                {showingCompleted && (
                  <div className="space-y-1">
                    <div className="secondary-text mb-4 !mt-6 grid grid-cols-2 items-center gap-4 px-4 md:grid-cols-[2fr_3fr_3fr_4fr]">
                      <p>{t('title.recipient')}</p>
                      <p className="hidden md:block">{t('title.finished')}</p>
                      <p className="hidden md:block">{t('title.available')}</p>
                      <p className="text-right">{t('title.totalVested')}</p>
                    </div>

                    {completedVestingPayments.map((props, index) => (
                      <VestingPaymentLine
                        key={index}
                        EntityDisplay={EntityDisplay}
                        onClick={() => {
                          setVestingPaymentModalOpen(true)
                          setOpenVestingPayment(props)
                        }}
                        transparentBackground={index % 2 !== 0}
                        {...props}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}
      </div>

      <Modal
        containerClassName="border-border-primary w-full"
        contentContainerClassName="!p-0"
        hideCloseButton
        onClose={() => setVestingPaymentModalOpen(false)}
        visible={vestingPaymentModalOpen}
      >
        {openVestingPayment ? (
          <VestingPaymentCard {...openVestingPayment} />
        ) : (
          <Loader />
        )}
      </Modal>
    </div>
  )
}
