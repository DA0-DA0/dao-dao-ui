import { ArrowRightIcon } from '@heroicons/react/outline'

export function AnnouncementCard({
  title,
  body,
  href,
}: {
  title: string
  body: string
  href: string
}) {
  return (
    <div className="bg-base-300 rounded-lg mt-2 px-8 py-6 flex justify-between items-center flex-wrap mx-0 sm:mx-3">
      <div className="max-w-prose">
        <h2 className="font-medium">{title}</h2>
        <p className="text-base text-secondary mt-1">{body}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm flex items-center gap-2 mt-2"
      >
        Read more
        <ArrowRightIcon className="w-4 inline" />
      </a>
    </div>
  )
}
