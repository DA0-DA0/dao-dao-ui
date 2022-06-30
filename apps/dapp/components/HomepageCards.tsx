import { EmojiHappyIcon, HandIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { FC } from 'react'
import toast from 'react-hot-toast'

import { useTranslation } from '@dao-dao/i18n'
import { Discord, Github, Twitter } from '@dao-dao/icons'
import { Vote } from '@dao-dao/ui'

export const HomepageCards: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="mx-2 flex max-w-[1044px] flex-col gap-6">
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col gap-8 rounded bg-card p-6 md:py-14 md:px-12">
          <div className="flex h-fit w-fit items-center justify-center rounded bg-primary p-2">
            <HandIcon className="w-3" />
          </div>
          <h3 className="header-text">{t('splash.proposeAndVote')}</h3>
          <div className="xl:-ml-24">
            <Vote
              blur={true}
              loading={false}
              onVote={() =>
                toast.success(
                  'Think this is neat? You should try the real thing! :)'
                )
              }
              voterWeightPercent={7}
            />
          </div>
        </div>
        <div
          className="relative flex grow flex-col gap-8 rounded bg-card py-14 px-12"
          style={{
            backgroundImage:
              'linear-gradient(270.19deg, #8F74FA -29.85%, #413B6B 16.35%, #333051 34.43%, #262738 56.36%, #191D20 99.87%)',
          }}
        >
          <div className="flex h-fit w-fit items-center justify-center rounded bg-primary p-2">
            <EmojiHappyIcon className="w-3" />
          </div>
          <div className="absolute top-0 right-0 bottom-0 my-6 hidden w-full md:block">
            <Image
              alt=""
              layout="fill"
              objectFit="contain"
              objectPosition="right center"
              src="/proposal-list-homepage.png"
              style={{
                opacity: '0.75',
              }}
            />
          </div>

          <h3 className="header-text">{t('splash.easyToUse')}</h3>
          <div className="flex max-w-xs flex-col gap-3">
            <p className="body-text max-w-sm">
              {t('splash.anyoneCanParticipate')}
            </p>
            <p className="body-text max-w-sm">
              {t('splash.easyToUseExplanation')}
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative rounded bg-card p-6 md:py-14 md:px-12"
        style={{
          backgroundImage:
            'linear-gradient(270deg, #8F74FA -18.38%, #413B6B 9.63%, #333051 20.61%, #262738 33.92%, #191D20 60.34%)',
        }}
      >
        <div className="flex items-center gap-1">
          <a
            className="z-10 rounded bg-primary p-1 transition hover:text-primary"
            href="https://github.com/DA0-DA0"
            rel="noreferrer"
            target="_blank"
          >
            <Github fill="currentColor" height="20px" width="20px" />
          </a>
          <a
            className="z-10 rounded bg-primary p-1 transition hover:text-primary"
            href="https://twitter.com/da0_da0"
            rel="noreferrer"
            target="_blank"
          >
            <Twitter fill="currentColor" height="20px" width="20px" />
          </a>
          <a
            className="z-10 rounded bg-primary p-1 transition hover:text-primary"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            <Discord fill="currentColor" height="20px" width="20px" />
          </a>
        </div>
        <h3 className="header-text mt-8">{t('splash.joinTheCommunity')}</h3>
        <div className="absolute top-0 right-0 bottom-0 w-full">
          <Image
            alt=""
            layout="fill"
            objectFit="contain"
            objectPosition="right center"
            src="/socials-card-background.png"
            style={{
              opacity: '0.5',
            }}
          />
        </div>
      </div>
    </div>
  )
}
