import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

import { SITE_TITLE } from '@dao-dao/utils'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION
    const image = process.env.NEXT_PUBLIC_SITE_IMAGE
    const url = process.env.NEXT_PUBLIC_SITE_URL

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
          <meta content="#ffffff" name="theme-color" />
          <meta key="title" content={SITE_TITLE} name="title" />
          <meta key="description" content={description} name="description" />
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
            content={description}
            property="twitter:description"
          />
          <meta key="twitter:image" content={image} property="twitter:image" />
          <meta key="twitter:url" content={url} property="twitter:url" />
          <meta
            key="og:description"
            content={description}
            property="og:description"
          />
          <meta key="og:image" content={image} property="og:image" />
          <meta key="og:title" content={SITE_TITLE} property="og:title" />
          <meta key="og:type" content="website" property="og:type" />
          <meta key="og:url" content={url} property="og:url" />
        </Head>
        <body className="bg-white body-text">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
