import { Add, WarningRounded } from '@mui/icons-material'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DropdownIconButton,
  Loader,
  Modal,
  NoContent,
  Tooltip,
} from '@dao-dao/stateless'
import {
  ButtonLinkProps,
  LoadingData,
  StatefulEntityDisplayProps,
  TransProps,
} from '@dao-dao/types'

import { VestingPaymentLine } from '../../components/VestingPaymentLine'
import { VestingInfo } from '../../types'

export interface TabRendererProps {
  vestingPaymentsLoading: LoadingData<VestingInfo[]>
  isMember: boolean
  createVestingPaymentHref: string | undefined
  registerSlashesHref: string | undefined
  ButtonLink: ComponentType<ButtonLinkProps>
  VestingPaymentCard: ComponentType<VestingInfo>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  Trans: ComponentType<TransProps>
}

export const TabRenderer = ({
  vestingPaymentsLoading,
  isMember,
  createVestingPaymentHref,
  registerSlashesHref,
  ButtonLink,
  VestingPaymentCard,
  EntityDisplay,
  Trans,
}: TabRendererProps) => {
  const { t } = useTranslation()

  // Vesting payments that need a slash registered.
  const vestingPaymentsNeedingSlashRegistration = vestingPaymentsLoading.loading
    ? []
    : vestingPaymentsLoading.data.filter(
        ({ hasUnregisteredSlashes }) => hasUnregisteredSlashes
      )

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
  const [openVestingContract, setOpenVestingContract] = useState<
    string | undefined
  >()
  const openVestingPayment = vestingPaymentsLoading.loading
    ? undefined
    : vestingPaymentsLoading.data.find(
        ({ vestingContractAddress }) =>
          vestingContractAddress === openVestingContract
      )
  // Wait for modal to close before clearing the open vesting payment to prevent
  // UI flicker.
  useEffect(() => {
    if (!vestingPaymentModalOpen) {
      const timeout = setTimeout(() => setOpenVestingContract(undefined), 200)
      return () => clearTimeout(timeout)
    }
  }, [vestingPaymentModalOpen])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.vestingPayments')}
          </p>

          <p className="secondary-text">
            {t('info.vestingPaymentsRefreshSeconds', { seconds: 30 })}
          </p>
        </div>

        {createVestingPaymentHref && (
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
              variant={
                // If slashes need to be registered, the button should be
                // secondary so it stands out less than the warning.
                vestingPaymentsNeedingSlashRegistration.length > 0
                  ? 'secondary'
                  : 'primary'
              }
            >
              <Add className="!h-4 !w-4" />
              {t('button.newVestingPayment')}
            </ButtonLink>
          </Tooltip>
        )}
      </div>

      <div className="mb-9">
        {vestingPaymentsLoading.loading || !vestingPaymentsLoading.data ? (
          <Loader fill={false} />
        ) : vestingPaymentsLoading.data.length ? (
          <div className="space-y-6 border-t border-border-secondary pt-6">
            {vestingPaymentsNeedingSlashRegistration.length > 0 && (
              <div className="mb-12 space-y-4 rounded-md border border-border-primary bg-background-secondary p-4">
                <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <div className="flex flex-row items-center gap-2">
                    <WarningRounded className="!h-6 !w-6 text-icon-primary" />
                    <p className="title-text text-text-body">
                      {t('info.vestingPaymentsNeedSlashRegistration')}
                    </p>
                  </div>

                  {registerSlashesHref && (
                    <ButtonLink
                      className="shrink-0"
                      disabled={!isMember}
                      href={registerSlashesHref}
                      variant="primary"
                    >
                      {t('button.registerSlashes')}
                    </ButtonLink>
                  )}
                </div>

                <div className="body-text mb-4 max-w-prose">
                  <Trans i18nKey="info.registerSlashVestingExplanation">
                    <p className="inline">
                      When a slash occurs against a validator with whom a
                      vesting contract is currently staking or unstaking tokens,
                      the slash needs to be registered with the vesting
                      contract. For more information, see the Slashing section
                      of the vesting contract&apos;s
                    </p>
                    <ButtonLink
                      className="!body-text"
                      containerClassName="inline-block"
                      href="https://github.com/DA0-DA0/dao-contracts/blob/main/contracts/external/cw-vesting/SECURITY.md#slashing"
                      variant="underline"
                    >
                      security documentation
                    </ButtonLink>
                    <p className="inline">.</p>
                  </Trans>
                </div>

                <div className="space-y-1">
                  {vestingPaymentsNeedingSlashRegistration.map(
                    (props, index) => (
                      <VestingPaymentLine
                        key={index}
                        EntityDisplay={EntityDisplay}
                        onClick={() => {
                          setVestingPaymentModalOpen(true)
                          setOpenVestingContract(props.vestingContractAddress)
                        }}
                        transparentBackground={index % 2 !== 0}
                        {...props}
                      />
                    )
                  )}
                </div>
              </div>
            )}

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
                      setOpenVestingContract(props.vestingContractAddress)
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
                          setOpenVestingContract(props.vestingContractAddress)
                        }}
                        transparentBackground={index % 2 !== 0}
                        {...props}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <NoContent
            Icon={WarningRounded}
            actionNudge={t('info.createFirstOneQuestion')}
            body={t('info.noVestingPaymentsFound')}
            buttonLabel={t('button.create')}
            href={createVestingPaymentHref}
          />
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
