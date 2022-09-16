// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  // Initialize with dark theme active (determined by class on html).
  <Html className="dark">
    <Head />
    <body className="antialiased bg-background-base body-text">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
