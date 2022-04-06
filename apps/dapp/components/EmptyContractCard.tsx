import { useRouter } from 'next/router'

export const EmptyContractCard = ({
  title,
  description,
  backgroundUrl,
  href,
}: {
  title: string
  description: string
  backgroundUrl: string
  href: string
}) => {
  const router = useRouter()
  return (
    <div
      className="border border-md rounded-md w-min cursor-pointer hover:shadow-accent hover:shadow-md hover:outline-accent"
      onClick={() => router.push(href)}
    >
      <div
        className="w-[480px] h-72 bg-cover bg-no-repeat rounded-t-md opacity-75"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="px-4 py-2">
        <div className="font-bold text-lg">{title}</div>
        <div>{description}</div>
      </div>
    </div>
  )
}
