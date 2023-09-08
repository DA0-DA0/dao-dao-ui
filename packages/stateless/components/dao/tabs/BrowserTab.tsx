import { RefCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../buttons'
import { TextInput } from '../../inputs'

export type BrowserTabProps = {
  iframeRef: RefCallback<HTMLIFrameElement | null>
}

export const BrowserTab = ({ iframeRef }: BrowserTabProps) => {
  const { t } = useTranslation()
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null)

  const [url, setUrl] = useState('')

  const go = () => {
    if (iframe) {
      iframe.src = url
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between gap-2">
        <TextInput
          autoComplete="off"
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              go()
            }
          }}
          placeholder={t('form.url')}
          value={url}
        />

        <Button onClick={go} size="lg" variant="primary">
          {t('button.go')}
        </Button>
      </div>

      <iframe
        className="h-[75vh] rounded-md"
        ref={(ref) => {
          setIframe(ref)
          iframeRef(ref)
        }}
      ></iframe>
    </div>
  )
}
