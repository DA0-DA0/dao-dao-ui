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

const Template = () => (
  <EmailWrapper>
    <Text
      style={{
        ...styles.text,
        marginTop: 0,
        marginBottom: '1.5rem',
      }}
    >
      {"You've"} been added to {`{{name}}`}. Follow it to receive updates.
    </Text>

    <Section>
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
  </EmailWrapper>
)

export const JoinedDao: EmailRenderer = {
  name: 'inbox-joined_dao',
  subject: 'You joined {{name}}',
  Template,
}
