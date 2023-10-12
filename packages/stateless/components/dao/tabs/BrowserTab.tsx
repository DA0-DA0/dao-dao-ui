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

  const go = () => {
    // Store URL in query parameter.
    router.query.url = url
    router.push(router, undefined, { shallow: true })

    if (iframe) {
      iframe.src = url
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

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
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
            value={url}
          />

          <Button className="shrink-0" onClick={go} size="lg" variant="primary">
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
        className="min-h-[75vh] grow rounded-md"
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
