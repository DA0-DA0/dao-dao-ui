import Link from 'next/link'

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
    <div className="btn-group">
      {Array.from(Array(total), (_, i) => (
        <Link key={i + 1} href={`?page=${i + 1}&limit=${limit}`}>
          <button className={`btn ${page === i + 1 ? 'btn-active' : ''}`}>
            {i + 1}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Paginator
