// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useTranslation } from 'react-i18next'

import { Inbox, PinOutline } from '@dao-dao/icons'

import { Logo } from '../Logo'
import { PinnedDao } from './PinnedDao'
import { Row } from './Row'

export interface NavigationProps {
  setCommandModalVisible: () => void
  isMac: boolean
  inboxCount: number
}

export const Navigation = ({
  setCommandModalVisible,
  isMac,
  inboxCount,
}: NavigationProps) => {
  const { t } = useTranslation()

  return (
    <nav className="flex sticky top-0 flex-col justify-between p-6 w-full max-w-xs h-screen text-lg">
      <div>
        {/* <Link href="/home"> */}
        <a className="flex flex-row gap-2 items-center py-4 mb-2 border-b border-border-secondary">
          <Logo size={26} />
          <p className="header-text">{t('meta.title')}</p>
        </a>
        {/* </Link> */}

        {/* <Row
          Icon={SearchIcon}
          label={t('title.search')}
          onClick={setCommandModalVisible}
          rightNode={<p className="text-secondary">{isMac ? '⌘' : '⌃'}K</p>}
        /> */}

        <Row
          Icon={Inbox}
          label={
            inboxCount
              ? t('title.inboxWithCount', { count: inboxCount })
              : t('title.inbox')
          }
          showBadge={inboxCount > 0}
        >
          <p className="p-5 text-sm">Inbox content</p>
        </Row>

        <Row Icon={PinOutline} defaultExpanded label={t('info.pinned')}>
          <PinnedDao
            dao={{
              name: 'Core 1',
              imageUrl: '/placeholders/1.svg',
            }}
            defaultExpanded
          />
          <PinnedDao
            dao={{
              name: 'Raw',
              imageUrl: '/placeholders/2.svg',
              subdaos: [
                {
                  name: 'Payroll',
                  imageUrl: '/placeholders/3.svg',
                },
                {
                  name: 'Pool distribution',
                  imageUrl: '/placeholders/4.svg',
                  subdaos: [
                    {
                      name: 'Native tokens',
                      imageUrl: '/placeholders/1.svg',
                    },
                  ],
                },
              ],
            }}
            defaultExpanded
          />
          <PinnedDao
            dao={{
              name: 'Animals',
              imageUrl: '/placeholders/5.svg',
            }}
            defaultExpanded
          />
        </Row>
      </div>
    </nav>
  )
}
