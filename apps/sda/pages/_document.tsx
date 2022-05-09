import clsx from 'clsx'
import { Head, Html, Main, NextScript } from 'next/document'

import { DEFAULT_THEME_NAME, Theme } from '@dao-dao/ui'

const Document = () => (
  <Html className={clsx({ dark: DEFAULT_THEME_NAME === Theme.Dark })}>
    <Head />
    <body className="subpixel-antialiased bg-white body-text">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
