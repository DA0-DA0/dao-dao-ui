import { CloseFullscreen, OpenInFull } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import {
  Dispatch,
  RefCallback,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { MAINNET, toAccessibleImageUrl } from '@dao-dao/utils'

import { Button } from '../../buttons'
import { IconButton } from '../../icon_buttons'
import { TextInput } from '../../inputs'
import { Tooltip } from '../../tooltip'

export type BrowserTabProps = {
  iframeRef: RefCallback<HTMLIFrameElement | null>
  fullScreen: boolean
  setFullScreen: Dispatch<SetStateAction<boolean>>
}

type InnerBrowserTabProps = BrowserTabProps & {
  url: string
  setUrl: Dispatch<SetStateAction<string>>
  className?: string
}

const InnerBrowserTab = ({
  iframeRef,
  fullScreen,
  setFullScreen,
  url,
  setUrl,
  className,
}: InnerBrowserTabProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null)

  const go = (destUrl = url) => {
    setUrl(destUrl)

    // Store URL in query parameter.
    router.query.url = destUrl
    router.push(router, undefined, { shallow: true })

    if (iframe) {
      iframe.src = destUrl
    }
  }

  // On first iframe mount, go to url if valid already.
  useEffect(() => {
    try {
      if (iframe && url && new URL(url).href) {
        iframe.src = url
      }
    } catch {
      // Ignore.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframe])

  // If no preset URL matching, choose the last one (custom) with empty URL.
  const selectedPresetIndex = presets.findIndex(
    ({ url: presetUrl }) => presetUrl === url || !presetUrl
  )

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div
        className={clsx(
          'styled-scrollbar flex shrink-0 flex-row items-stretch gap-2 overflow-x-scroll pb-2',
          fullScreen && 'px-safe-offset-4'
        )}
      >
        {presets.map(({ name, imageUrl, url: presetUrl }, index) => {
          const isCustom = !presetUrl
          const selected = index === selectedPresetIndex

          return (
            <Button
              key={presetUrl}
              className={clsx(
                'shrink-0 overflow-hidden border-2 !p-0 transition',
                isCustom && 'border-dashed border-border-primary',
                selected
                  ? 'border-border-interactive-active'
                  : !isCustom && 'border-transparent'
              )}
              onClick={() => go(presetUrl)}
              variant="none"
            >
              {/* Background. */}
              {!isCustom && (
                <div
                  className="absolute top-0 left-0 bottom-0 right-0 z-0 bg-cover bg-center brightness-50"
                  style={{
                    backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
                  }}
                ></div>
              )}

              <div className="relative z-10 flex h-24 w-36 items-center justify-center p-4">
                <p className="primary-text break-words text-text-body">
                  {isCustom ? t('title.custom') : name}
                </p>
              </div>
            </Button>
          )
        })}
      </div>

      <div
        className={clsx(
          'flex shrink-0 flex-row items-stretch gap-2',
          fullScreen && 'px-safe-offset-4'
        )}
      >
        <div className="flex grow flex-row items-stretch gap-1">
          <TextInput
            autoComplete="off"
            className="grow"
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                go()
              }
            }}
            placeholder={t('form.url')}
            type="url"
            value={url}
          />

          <Button
            className="shrink-0"
            onClick={() => go()}
            size="lg"
            variant="primary"
          >
            {t('button.go')}
          </Button>
        </div>

        <Tooltip title={t('button.toggleFullScreen')}>
          <IconButton
            Icon={fullScreen ? CloseFullscreen : OpenInFull}
            className="!h-auto shrink-0"
            onClick={() => setFullScreen((f) => !f)}
            size="sm"
            variant="ghost"
          />
        </Tooltip>
      </div>

      <iframe
        allow="clipboard-write"
        className={clsx('mt-2 min-h-[75vh] grow', !fullScreen && 'rounded-md')}
        ref={(ref) => {
          setIframe(ref)
          iframeRef(ref)
        }}
      ></iframe>
    </div>
  )
}

export const BrowserTab = (props: BrowserTabProps) => {
  const router = useRouter()
  // Load URL from query parameter.
  const [url, setUrl] = useState(
    (typeof router.query.url === 'string' && router.query.url) || ''
  )

  return props.fullScreen ? (
    createPortal(
      <div className="fixed top-0 left-0 z-[39] h-screen w-screen bg-background-base p-safe pt-safe-or-4">
        <InnerBrowserTab
          className="h-full w-full"
          setUrl={setUrl}
          url={url}
          {...props}
        />
      </div>,
      document.body
    )
  ) : (
    <InnerBrowserTab setUrl={setUrl} url={url} {...props} />
  )
}

type BrowserTabPreset = {
  name: string
  imageUrl: string
  url: string
}

const presets: BrowserTabPreset[] = [
  {
    name: 'Osmosis',
    imageUrl: 'https://app.osmosis.zone/images/preview.jpg',
    url: 'https://app.osmosis.zone',
  },
  {
    name: 'Stargaze Studio',
    imageUrl: 'https://studio.stargaze.zone/assets/android-chrome-256x256.png',
    url: MAINNET
      ? 'https://studio.stargaze.zone'
      : 'https://studio.publicawesome.dev',
  },

  // Must be last for index matching. Enables custom URL input.
  {
    name: '',
    imageUrl: '',
    url: '',
  },
]
