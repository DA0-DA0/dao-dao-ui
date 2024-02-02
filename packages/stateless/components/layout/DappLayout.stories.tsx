import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DappLayoutProps, PageHeaderProps } from '@dao-dao/types'

import { DappLayout } from './DappLayout'
import { DappNavigationProps } from './DappNavigation'
import { Default as DappNavigatonStory } from './DappNavigation.stories'
import { PageHeader } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'
import { DefaultArgs as RightSidebarStoryArgs } from './RightSidebar.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / DappLayout',
  component: DappLayout,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof DappLayout>

export const DefaultArgs: DappLayoutProps = {
  navigationProps: DappNavigatonStory.args as DappNavigationProps,
  children: (
    <div className="flex h-full flex-col px-6">
      <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />

      <div className="flex grow items-center justify-center">
        <p>App content</p>
      </div>
    </div>
  ),
  rightSidebarProps: RightSidebarStoryArgs,
}

const Template: ComponentStory<typeof DappLayout> = (args) => {
  const [compact, setCompact] = useState(false)

  return (
    <DappLayout
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
