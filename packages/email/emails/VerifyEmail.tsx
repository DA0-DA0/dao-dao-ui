import { Button, Column, Row, Section, Text } from '@react-email/components'

import { EmailRenderer, EmailWrapper, styles } from '../common'

const name = 'inbox-verify'
const subject = 'DAO DAO Email Verification'
const Template = () => (
  <EmailWrapper>
    <Text
      style={{
        ...styles.text,
        marginTop: 0,
      }}
    >
      To begin receiving notifications, verify within the next{' '}
      {`{{expirationTime}}`}.
    </Text>

    <Section>
      <Row>
        <Column align="center">
          <Button href="{{url}}" {...styles.buttonProps}>
            Verify Email
          </Button>
        </Column>
      </Row>
    </Section>

    <Text
      style={{
        ...styles.text,
        color: styles.textColors.secondary,
        marginBottom: 0,
      }}
    >
      If you did not request this verification, you can safely ignore this
      email.
    </Text>
  </EmailWrapper>
)

export const VerifyEmail: EmailRenderer = {
  name,
  subject,
  Template,
}