import {
  Button,
  Column,
  Img,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components'

import { EmailRenderer, EmailWrapper, styles } from '../common'

const name = 'inbox-joined_dao'
const subject = 'You joined {{name}}'
const Template = () => (
  <EmailWrapper>
    <Section
      style={{
        marginBottom: '1.25rem',
      }}
    >
      <Row>
        <Column align="center">
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem',
              border: 2,
              borderStyle: 'solid',
              borderColor: styles.border.primary,
              borderRadius: '999px',
            }}
          >
            <Link
              href="{{url}}"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Img
                alt="logo"
                height={96}
                src="{{imageUrl}}"
                style={{
                  borderRadius: 96,
                  overflow: 'hidden',
                  objectFit: 'cover',
                }}
                width={96}
              />
            </Link>
          </div>
        </Column>
      </Row>

      <Row style={{ marginTop: '1rem' }}>
        <Column align="center">
          <Button href="{{url}}" {...styles.buttonProps}>
            Visit {`{{name}}`}
          </Button>
        </Column>
      </Row>
    </Section>

    <Text
      style={{
        ...styles.text,
        marginBottom: 0,
      }}
    >
      {"You've"} been added to {`{{name}}`}. Follow it to receive updates.
    </Text>
  </EmailWrapper>
)

export const JoinedDao: EmailRenderer = {
  name,
  subject,
  Template,
}
