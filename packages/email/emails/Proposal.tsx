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
  <EmailWrapper preview="{{preview}}">
    <Row>
      <Column align="center">
        <Text
          style={{
            ...styles.headerText,
            marginTop: 0,
          }}
        >
          {'{{title}}'}
        </Text>
      </Column>
    </Row>

    <Section>
      <Row>
        <Column align="center">
          <Link
            href="{{url}}"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'relative',
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
        </Column>
      </Row>

      <Row>
        <Column align="center">
          <Text style={styles.titleText}>{'{{proposalTitle}}'}</Text>
        </Column>
      </Row>

      <Row style={{ marginTop: '0.5rem' }}>
        <Column align="center">
          <Button href="{{url}}" {...styles.buttonProps}>
            View Proposal {'{{proposalId}}'}
          </Button>
        </Column>
      </Row>
    </Section>
  </EmailWrapper>
)

export const Proposal: EmailRenderer = {
  name: 'inbox-proposal',
  subject: '{{subject}}',
  Template,
}
