import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import {
  PageHeaderProps,
  SdaLayoutProps,
  SdaNavigationProps,
} from '@dao-dao/types'

import { PageHeader } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'
import { SdaLayout } from './SdaLayout'
import { Default as SdaNavigationStory } from './SdaNavigation.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / SdaLayout',
  component: SdaLayout,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof SdaLayout>

export const DefaultArgs: SdaLayoutProps = {
  navigationProps: SdaNavigationStory.args as SdaNavigationProps,
  children: (
    <div className="flex h-full flex-col px-6">
      <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />

      <div className="flex grow items-center justify-center">
        <p>App content</p>
      </div>
    </div>
  ),
}

const Template: ComponentStory<typeof SdaLayout> = (args) => {
  const [compact, setCompact] = useState(false)

  return (
    <SdaLayout
      {...args}
      navigationProps={{
        ...args.navigationProps,
        compact,
        setCompact,
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = DefaultArgs
