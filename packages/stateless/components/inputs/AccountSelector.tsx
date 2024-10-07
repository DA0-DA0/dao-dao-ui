import { ArrowDropDown, Check, CopyAllOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Account } from '@dao-dao/types'
import {
  abbreviateAddress,
  getDisplayNameForChainId,
  getImageUrlForChainId,
} from '@dao-dao/utils'

import { ChainLogo } from '../chain'
import {
  FilterableItemPopup,
  FilterableItemPopupProps,
} from '../popup/FilterableItemPopup'

export type AccountSelectorProps = {
  /**
   * The list of accounts.
   */
  accounts: readonly Account[]
  /**
   * Account selection callback function.
   */
  onSelect: (account: Account) => void
  /**
   * Optionally show the current account in the trigger button. Otherwise shows
   * a generic selection prompt.
   */
  selectedAccount?: Account
  /**
   * Optionally hide the account chain image when selected account is showing.
   */
  hideChainImage?: boolean
  /**
   * The default number of characters to slice from the beginning and end of the
   * selected account address when abbreviating it in the trigger button. Set to
   * -1 to show the whole address.
   *
   * Defaults to 8.
   */
  addressAbbreviationLength?: number
} & (
  | {
      /**
       * Optionally override the trigger.
       */
      trigger: FilterableItemPopupProps['trigger']
      /**
       * Optionally show a loader and disallow selection, if the trigger is not
       * being overridden.
       */
      loading?: never
      /**
       * Optionally disable selection, if the trigger is not being overridden.
       */
      disabled?: never
      /**
       * Optionally apply a class name to the container button, if the trigger
       * is not being overridden.
       */
      className?: never
    }
  | {
      /**
       * Optionally override the trigger.
       */
      trigger?: never
      /**
       * Optionally show a loader and disallow selection, if the trigger is not
       * being overridden.
       */
      loading?: boolean
      /**
       * Optionally disable selection, if the trigger is not being overridden.
       */
      disabled?: boolean
      /**
       * Optionally apply a class name to the container button, if the trigger
       * is not being overridden.
       */
      className?: string
    }
)

/**
 * A generic account selector popup input.
 */
export const AccountSelector = ({
  accounts,
  onSelect,
  selectedAccount,
  hideChainImage,
  addressAbbreviationLength = 8,
  className,
  loading,
  disabled,
  trigger,
}: AccountSelectorProps) => {
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  const CopyIcon = copied ? Check : CopyAllOutlined

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={accounts.map((account) => ({
        account,
        key: account.chainId + account.address,
        label: getDisplayNameForChainId(account.chainId),
        iconUrl: getImageUrlForChainId(account.chainId),
        description: abbreviateAddress(account.address),
        rightNode: (
          <p className="caption-text self-end md:self-center">
            {t(`accountTypeLabel.${account.type}`)}
          </p>
        ),
        iconClassName: '!h-8 !w-8',
        contentContainerClassName: '!gap-4',
      }))}
      onSelect={({ account }) => onSelect(account)}
      searchPlaceholder={t('info.searchForAccount')}
      trigger={
        trigger || {
          type: 'button',
          tooltip:
            disabled && selectedAccount ? t('button.copyAddress') : undefined,
          props: {
            className: clsx('min-w-[10rem] w-min', className),
            contentContainerClassName:
              'justify-between text-icon-primary !gap-4',
            loading,
            size: 'lg',
            variant: 'ghost_outline',
            // Disable click entirely if not turning into copy button below.
            disabled: disabled && !selectedAccount,
            // Override trigger and make it copy on click when disabled.
            ...(disabled &&
              selectedAccount && {
                onClick: () => {
                  navigator.clipboard.writeText(selectedAccount.address)
                  setCopied(true)
                  toast.success(t('info.copiedToClipboard'))
                },
              }),
            children: (
              <>
                {selectedAccount ? (
                  <div className="flex flex-row gap-2 items-center min-w-0">
                    {!hideChainImage && (
                      <ChainLogo chainId={selectedAccount.chainId} size={24} />
                    )}

                    <p className="text-text-body truncate">
                      {addressAbbreviationLength === -1
                        ? selectedAccount.address
                        : abbreviateAddress(
                            selectedAccount.address,
                            addressAbbreviationLength
                          )}
                    </p>
                  </div>
                ) : (
                  <p className="text-text-secondary">
                    {disabled
                      ? t('info.noAccountSelected')
                      : t('button.selectAccount')}
                  </p>
                )}

                {disabled ? (
                  selectedAccount && (
                    <CopyIcon className="!w-4 !h-4 !text-icon-tertiary shrink-0" />
                  )
                ) : (
                  <ArrowDropDown className="!h-6 !w-6 !text-icon-secondary shrink-0" />
                )}
              </>
            ),
          },
        }
      }
    />
  )
}

const FILTERABLE_KEYS = ['label', 'chainId', 'address']
