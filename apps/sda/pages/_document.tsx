import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="subpixel-antialiased bg-white body-text">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
