import Link from 'next/link'
import { Button } from 'ui'

function Paginator({
  page,
  limit,
  count,
}: {
  page: number
  limit: number
  count: number
}) {
  const total = Math.ceil(count / limit)

  return (
    <div className="flex items-center gap-2">
      {Array.from(Array(total), (_, i) => (
        <Link key={i + 1} href={`?page=${i + 1}&limit=${limit}`} passHref>
          <Button size="sm" className={`${page - 1 === i ? 'ring' : ''}`}>
            {i + 1}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default Paginator
