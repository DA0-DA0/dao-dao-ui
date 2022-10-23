import { DecoratorFn } from '@storybook/react'

import { CreateDaoForm } from '@dao-dao/stateful'
import { NewDao } from '@dao-dao/types'

export const makeCreateDaoFormDecorator: (
  pageIndex: number,
  defaults?: Partial<NewDao>
) => DecoratorFn = (pageIndex, defaults) =>
  function CreateDaoFormDecorator() {
    return <CreateDaoForm defaults={defaults} initialPageIndex={pageIndex} />
  }
