import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";

/*
 * Breadcrumb style navivation bar. Expects arguments in the form [[link, name], ...].
 */
export function Breadcrumbs({ crumbs }: { crumbs: Array<[string, string]> }) {
  return (
    <div className="text-md font-medium text-secondary-focus">
      <ArrowNarrowLeftIcon className="inline w-5 h-5 mb-1" />
      {crumbs.map(([link, name], idx) =>
        <>
          <Link href={link}>
            <a className="mx-2">{name}</a>
          </Link>
          {idx != crumbs.length - 1 && "/"}
        </>
      )}
    </div>
  )
}
