import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Row,
  Section,
} from '@react-email/components'
import { ReactNode } from 'react'

import * as styles from './styles'

export type EmailWrapperProps = {
  children: ReactNode
}

export const EmailWrapper = ({ children }: EmailWrapperProps) => (
  <Html lang="en">
    <Head>
      <Font
        fallbackFontFamily="Helvetica"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight={400}
        webFont={{
          url: 'https://fonts.googleapis.com/css?family=Inter',
          format: 'woff2',
        }}
      />
    </Head>
    <Body style={styles.body}>
      <Container style={styles.container}>{children}</Container>

      <Section
        style={{
          marginTop: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <Row>
          <Column align="center">
            <Link
              href="https://daodao.zone"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Img
                alt="logo"
                height={32}
                src="https://daodao.zone/daodao.png"
                width={32}
              />
            </Link>
          </Column>
        </Row>
        <Row style={{ marginTop: '0.5rem' }}>
          <Column align="center">
            <Link
              href="{{manageNotificationsUrl}}"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: styles.textColors.tertiary,
                fontStyle: 'italic',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Click here to unsubscribe or manage notifications.
            </Link>
          </Column>
        </Row>
      </Section>
    </Body>
  </Html>
)
