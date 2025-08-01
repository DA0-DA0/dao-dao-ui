import { ArrowOutward, Close, Link, MenuOpen } from '@mui/icons-material'
import clsx from 'clsx'
import {
  ComponentType,
  Dispatch,
  ReactNode,
  RefCallback,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { AddressInputProps } from '@dao-dao/types'
import { APPS, processError, toAccessibleImageUrl } from '@dao-dao/utils'

import { useChain } from '../../contexts'
import { useQuerySyncedState } from '../../hooks'
import { Button, ButtonLink } from '../buttons'
import { ErrorPage } from '../error'
import { IconButton } from '../icon_buttons'
import {
  InputErrorMessage,
  InputLabel,
  SegmentedControls,
  TextInput,
} from '../inputs'
import { PageLoader } from '../logo'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { Modal } from '../modals'
import { StatusCard } from '../StatusCard'
import { Tooltip } from '../tooltip'

export type AppsRendererExecutionType = 'default' | 'authzExec' | 'daoAdminExec'

export type AppsRendererProps = {
  /**
   * The reference to set the iframe for the apps passthrough functionality.
   */
  iframeRef: RefCallback<HTMLIFrameElement | null>
  /**
   * Whether the apps renderer is in full screen mode.
   */
  fullScreen: boolean
  /**
   * Set the full screen mode.
   */
  setFullScreen: Dispatch<SetStateAction<boolean>>
  /**
   * The type of execution.
   */
  executionType: AppsRendererExecutionType
  /**
   * Set the execution type.
   */
  setExecutionType: Dispatch<SetStateAction<AppsRendererExecutionType>>
  /**
   * The other (non-default execution type) address.
   */
  otherAddress: string
  /**
   * Set the other (non-default execution type) address.
   */
  setOtherAddress: Dispatch<SetStateAction<string>>
  /**
   * Stateful AddressInput component.
   */
  AddressInput: ComponentType<AddressInputProps>
  /**
   * The chain picker node.
   */
  chainPicker: ReactNode
  /**
   * Whether or not to show a loading state which prevents opening apps.
   */
  loading?: boolean
  /**
   * Whether or not the entity is updating.
   */
  updating?: boolean
  /**
   * Error to display.
   */
  error?: string
}

// Only allow URLs starting with `http(s)://`, to prevent XSS via `javascript:`
// URLs.
const ALLOWED_URL_REGEX = /^https?:\/\/.+[^\.]$/

const isUrlValid = (url: string): true | string => {
  try {
    if (!!url && !!new URL(url).href && ALLOWED_URL_REGEX.test(url)) {
      return true
    } else {
      return 'Invalid URL.'
    }
  } catch (err) {
    return processError(err, {
      forceCapture: false,
    })
  }
}

export const AppsRenderer = ({
  iframeRef,
  fullScreen,
  setFullScreen,
  executionType,
  setExecutionType,
  otherAddress,
  setOtherAddress,
  AddressInput,
  chainPicker,
  loading,
  updating,
  error: _error,
}: AppsRendererProps) => {
  const { t } = useTranslation()
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null)

  // Show app opener when app is already open.
  const [appOpenerVisible, setAppOpenerVisible] = useState(false)

  const [url, setUrl, wasInitializedFromQuery] = useQuerySyncedState({
    param: 'url',
    defaultValue: '',
  })

  const [error, setError] = useState<string>()
  const openApp = (url: string) => {
    const validity = isUrlValid(url)
    if (validity === true) {
      setError(undefined)
      setUrl(url)
      // Change existing iframe if it exists. Otherwise it will be created
      // when the full screen modal opens and automatically use the URL set.
      if (iframe) {
        iframe.src = url
      }
      setFullScreen(true)
      setAppOpenerVisible(false)
    } else {
      setError(validity)
    }
  }

  // If URL is set on mount, open automatically.
  useEffect(() => {
    if (wasInitializedFromQuery && isUrlValid(url) === true) {
      openApp(url)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasInitializedFromQuery])

  // Add event handler to inform iframe that it's wrapped in DAO DAO if it asks.
  useEffect(() => {
    if (!iframe?.contentWindow) {
      return
    }

    const listener = ({ data }: MessageEvent) => {
      if (data === 'isDaoDao') {
        iframe.contentWindow?.postMessage('amDaoDao')
      }
    }

    iframe.contentWindow.addEventListener('message', listener)

    return () => {
      iframe.contentWindow?.removeEventListener('message', listener)
    }
  }, [iframe])

  const currentError = _error || error

  return fullScreen ? (
    <>
      {createPortal(
        <div className="hd-screen wd-screen fixed top-0 left-0 z-[38] bg-background-base p-safe pt-safe-or-4">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-row justify-between items-center gap-8 px-safe-offset-4 pb-4 border-b border-border-base">
              <div className="flex flex-row gap-2 justify-start items-center grow">
                <Link className="!h-5 !w-5 !text-icon-secondary -rotate-45" />
                <p className="primary-text !text-text-secondary break-all max-w-prose grow">
                  {url}
                </p>
              </div>

              <div className="flex flex-row gap-2 justify-end items-center shrink-0">
                <Tooltip title={t('button.openAnotherApp')}>
                  <IconButton
                    Icon={MenuOpen}
                    onClick={() => setAppOpenerVisible(true)}
                    variant="ghost"
                  />
                </Tooltip>

                <Tooltip title={t('button.closeApp')}>
                  <IconButton
                    Icon={Close}
                    onClick={() => setFullScreen((f) => !f)}
                    variant="ghost"
                  />
                </Tooltip>
              </div>
            </div>

            {loading ? (
              <PageLoader />
            ) : currentError ? (
              <ErrorPage error={error} />
            ) : (
              <iframe
                allow="clipboard-write"
                className={clsx(
                  'grow',
                  !fullScreen && 'min-h-[75dvh] rounded-md'
                )}
                ref={(ref) => {
                  setIframe(ref)
                  iframeRef(ref)
                }}
                src={url}
              ></iframe>
            )}
          </div>
        </div>,
        document.body
      )}

      <Modal
        containerClassName="w-full !max-w-3xl"
        header={{
          title: t('title.apps'),
        }}
        onClose={() => setAppOpenerVisible(false)}
        visible={appOpenerVisible}
      >
        <AppOpener
          AddressInput={AddressInput}
          chainPicker={chainPicker}
          error={currentError}
          executionType={executionType}
          loading={loading || updating}
          openApp={openApp}
          otherAddress={otherAddress}
          setError={setError}
          setExecutionType={setExecutionType}
          setOtherAddress={setOtherAddress}
          url={url}
        />
      </Modal>
    </>
  ) : (
    <AppOpener
      AddressInput={AddressInput}
      chainPicker={chainPicker}
      error={currentError}
      executionType={executionType}
      loading={loading || updating}
      openApp={openApp}
      otherAddress={otherAddress}
      setError={setError}
      setExecutionType={setExecutionType}
      setOtherAddress={setOtherAddress}
      url={url}
    />
  )
}

type AppOpenerProps = Omit<
  AppsRendererProps,
  'fullScreen' | 'setFullScreen' | 'iframeRef'
> & {
  url: string
  openApp: (url: string) => void
  error: string | undefined
  setError: Dispatch<SetStateAction<string | undefined>>
  loading?: boolean
}

const AppOpener = ({
  executionType,
  setExecutionType,
  otherAddress,
  setOtherAddress,
  AddressInput,
  chainPicker,
  url,
  openApp,
  error,
  setError,
  loading,
}: AppOpenerProps) => {
  const { t } = useTranslation()

  const { chainId } = useChain()
  const appsForChain = APPS.filter(
    ({ chainIdFilter }) =>
      (!chainIdFilter?.include || chainIdFilter.include.includes(chainId)) &&
      (!chainIdFilter?.exclude || !chainIdFilter.exclude.includes(chainId))
  )

  const [inputUrl, setInputUrl] = useState<string>(url)
  // Update the input field to match the URL if it changes in the parent
  // component. This should handle the URL being updated from the query params.
  useEffect(() => {
    if (url !== inputUrl) {
      setInputUrl(url)
    }

    // Only change the input URL when the URL changes (i.e. ignore input
    // change).
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInputUrl, url])

  // If no app URL matching, choose the last one (custom) with empty URL.
  const selectedAppIndex = appsForChain.findIndex(
    ({ url: appUrl }) => appUrl === inputUrl || !appUrl
  )

  const customSelected =
    !!inputUrl && selectedAppIndex === appsForChain.length - 1

  return (
    <div className="flex flex-col gap-4">
      <div className="styled-scrollbar flex shrink-0 flex-row items-stretch gap-2 overflow-x-scroll pb-2">
        {appsForChain.map(
          ({ platform, name, imageUrl, url: appUrl }, index) => {
            const isCustom = !appUrl
            const selected = index === selectedAppIndex

            return (
              <Button
                key={appUrl}
                className={clsx(
                  'shrink-0 overflow-hidden border-2 !p-0 transition',
                  isCustom && 'border-dashed border-border-primary',
                  selected
                    ? '!border-border-interactive-active'
                    : !isCustom && 'border-transparent'
                )}
                onClick={() => {
                  setInputUrl(appUrl)
                  setError(undefined)
                }}
                variant="none"
              >
                {/* Background. */}
                {!isCustom && (
                  <div
                    className={clsx(
                      'absolute top-0 left-0 bottom-0 right-0 z-0 bg-cover bg-center',
                      !!name && 'brightness-50'
                    )}
                    style={{
                      backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
                    }}
                  ></div>
                )}

                <div className="relative z-10 flex w-32 flex-col items-center justify-center gap-1 p-4">
                  {platform && (
                    <p className="caption-text text-color-light-transparent">
                      {platform}
                    </p>
                  )}

                  {(isCustom || name) && (
                    <p className="primary-text break-words text-color-light">
                      {isCustom ? t('title.custom') : name}
                    </p>
                  )}
                </div>
              </Button>
            )
          }
        )}
      </div>

      {customSelected && (
        <StatusCard
          className="-mt-3 mb-3 max-w-lg"
          content={t('info.customAppWarning')}
          style="warning"
        >
          <ButtonLink
            className="italic !text-text-secondary"
            contentContainerClassName="!gap-1.5"
            href="https://github.com/DA0-DA0/dao-dao-ui/wiki/How-to-support-DAO-DAO's-Apps-interface"
            variant="none"
          >
            {t('button.openIntegrationGuide')}
            <ArrowOutward className="!h-4 !w-4 !text-icon-secondary" />
          </ButtonLink>
        </StatusCard>
      )}

      <TextInput
        autoComplete="off"
        className="grow -mt-3"
        onChange={(event) => {
          setInputUrl(event.target.value)
          setError(undefined)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            openApp(inputUrl)
          }
        }}
        placeholder={t('form.url')}
        type="url"
        value={inputUrl}
      />

      <div className="flex flex-col gap-1 items-start">
        <InputLabel
          name={t('form.executionType')}
          tooltip={
            <MarkdownRenderer
              className="p-2"
              markdown={t('info.appExecutionTypeTooltip')}
            />
          }
        />

        <SegmentedControls<AppsRendererExecutionType>
          onSelect={(value) => setExecutionType(value)}
          selected={executionType}
          tabs={[
            { label: t('title.dao'), value: 'default' },
            { label: t('title.authzExec'), value: 'authzExec' },
            { label: t('title.daoAdminExec'), value: 'daoAdminExec' },
          ]}
        />

        {executionType !== 'default' && (
          <div className="flex flex-row gap-2 items-stretch mt-2 self-stretch">
            {chainPicker}

            <AddressInput
              containerClassName="grow"
              setValue={(_, value) => setOtherAddress(value)}
              type={executionType === 'daoAdminExec' ? 'contract' : undefined}
              value={otherAddress}
            />
          </div>
        )}
      </div>

      <Button
        center
        disabled={!!error}
        loading={loading}
        onClick={() => openApp(inputUrl)}
        size="lg"
        variant="brand"
      >
        {t('button.openApp')}
      </Button>

      <InputErrorMessage className="!-mt-2" error={error} />
    </div>
  )
}
