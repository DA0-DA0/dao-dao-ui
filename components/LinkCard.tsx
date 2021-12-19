import Link from 'next/link'

export default function LinkCard({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
      <Link href={href} passHref>
        <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
          {children}
        </a>
      </Link>
    </div>
  )
}
