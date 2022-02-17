import SvgDiscord from '@components/icons/Discord'
import SvgGithub from '@components/icons/Github'
import SvgTwitter from '@components/icons/Twitter'
import Link from 'next/link'

export function CommunitySection() {
  // Getting the sizing correct here is a nightmare..
  return (
    <div className="px-3 md:px-7 w-full flex justify-center">
      <div className="md:max-w-[962px] md:w-full rounded-lg p-6 md:h-[476px] bg-base-200 mt-4">
        <div className="flex flex-row gap-2 my-6">
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-300 rounded-lg p-2 w-fit">
                <SvgDiscord fill="currentColor" width="20px" height="20px" />
              </div>
            </a>
          </Link>
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-300 rounded-lg p-2 w-fit">
                <SvgTwitter fill="currentColor" width="20px" height="20px" />
              </div>
            </a>
          </Link>
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-300 rounded-lg p-2 w-fit">
                <SvgGithub fill="currentColor" width="20px" height="20px" />
              </div>
            </a>
          </Link>
        </div>
        <h2 className="text-xl font-medium">Join the growing community</h2>
        <div className="max-w-lg my-6">
          <p>
            Over a thousand DAOs have been created on DAO DAO. Gather your
            community and join up.
          </p>
        </div>
      </div>
    </div>
  )
}
