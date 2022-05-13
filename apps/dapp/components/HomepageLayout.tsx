import Head from 'next/head'
import { FC } from 'react'

import { SITE_TITLE } from '@dao-dao/utils'

export const HomepageLayout: FC = ({ children }) => (
  <>
    <Head>
      <title>{SITE_TITLE}</title>
      <link href="/daodao-dark.svg" rel="icon" type="image/svg+xml" />
      <link href="/yin_yang.png" rel="icon" />
    </Head>

    {children}
  </>
)
