// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { EmojiHappyIcon, HandIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { Discord, Github, Twitter } from '@dao-dao/icons'

import { HomepageCardVote } from './HomepageCardVote'

export const HomepageCards = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6 mx-2 max-w-[1044px]">
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="flex flex-col gap-8 p-6 bg-card rounded md:py-14 md:px-12">
          <div className="flex justify-center items-center p-2 w-fit h-fit bg-primary rounded">
            <HandIcon className="w-3" />
          </div>
          <h3 className="header-text">{t('splash.proposeAndVote')}</h3>
          <div className="xl:-ml-24">
            <HomepageCardVote />
          </div>
        </div>
        <div
          className="relative grow bg-card rounded"
          style={{
            backgroundImage:
              'linear-gradient(270.19deg, #8F74FA -29.85%, #413B6B 16.35%, #333051 34.43%, #262738 56.36%, #191D20 99.87%)',
          }}
        >
          <div className="hidden absolute top-0 right-0 bottom-0 my-6 w-full md:block">
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

          <div className="flex flex-col gap-8 py-14 px-12 max-w-sm backdrop-blur-[1.4px] xl:max-w-full">
            <div className="flex justify-center items-center p-2 w-fit h-fit bg-primary rounded">
              <EmojiHappyIcon className="w-3" />
            </div>

            <h3 className="header-text">{t('splash.easyToUse')}</h3>
            <div className="flex flex-col gap-3 max-w-xs body-text">
              <p>{t('splash.anyoneCanParticipate')}</p>
              <p>{t('splash.easyToUseExplanation')}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative p-6 bg-card rounded md:py-14 md:px-12"
        style={{
          backgroundImage:
            'linear-gradient(270deg, #8F74FA -18.38%, #413B6B 9.63%, #333051 20.61%, #262738 33.92%, #191D20 60.34%)',
        }}
      >
        <div className="flex gap-1 items-center">
          <a
            className="z-10 p-1 hover:text-primary bg-primary rounded transition"
            href="https://github.com/DA0-DA0"
            rel="noreferrer"
            target="_blank"
          >
            <Github fill="currentColor" height="20px" width="20px" />
          </a>
          <a
            className="z-10 p-1 hover:text-primary bg-primary rounded transition"
            href="https://twitter.com/da0_da0"
            rel="noreferrer"
            target="_blank"
          >
            <Twitter fill="currentColor" height="20px" width="20px" />
          </a>
          <a
            className="z-10 p-1 hover:text-primary bg-primary rounded transition"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            <Discord fill="currentColor" height="20px" width="20px" />
          </a>
        </div>
        <h3 className="mt-8 header-text">{t('splash.joinTheCommunity')}</h3>
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
