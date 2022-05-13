import Document, { Html, Head, Main, NextScript } from 'next/document'

import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from '@dao-dao/utils'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/site.webmanifest" rel="manifest" />
          <meta content="#da532c" name="msapplication-TileColor" />
          <meta content="#111213" name="theme-color" />
          <meta key="title" content={SITE_TITLE} name="title" />
          <meta
            key="description"
            content={SITE_DESCRIPTION}
            name="description"
          />
          <meta
            key="twitter:title"
            content={SITE_TITLE}
            property="twitter:title"
          />
          <meta
            key="twitter:card"
            content="summary_large_image"
            property="twitter:card"
          />
          <meta
            key="twitter:description"
            content={SITE_DESCRIPTION}
            property="twitter:description"
          />
          <meta
            key="twitter:image"
            content={SITE_IMAGE}
            property="twitter:image"
          />
          <meta key="twitter:url" content={SITE_URL} property="twitter:url" />
          <meta
            key="og:description"
            content={SITE_DESCRIPTION}
            property="og:description"
          />
          <meta key="og:image" content={SITE_IMAGE} property="og:image" />
          <meta key="og:title" content={SITE_TITLE} property="og:title" />
          <meta key="og:type" content="website" property="og:type" />
          <meta key="og:url" content={SITE_URL} property="og:url" />
        </Head>
        <body className="antialiased bg-white body-text">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
