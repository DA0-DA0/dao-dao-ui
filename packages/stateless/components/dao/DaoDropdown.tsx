import clsx from 'clsx'
import { useRouter } from 'next/router'

import { DaoDropdownProps } from '@dao-dao/types/components/DaoDropdown'
import { toAccessibleImageUrl } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { Collapsible } from '../Collapsible'
import { Tooltip } from '../tooltip/Tooltip'

export const DaoDropdown = ({
  dao: { coreAddress, imageUrl, name, subDaos },
  children,
  showSubDaos = true,
  indent = 0,
  compact = false,
  LinkWrapper,
  ...props
}: DaoDropdownProps) => {
  const { asPath } = useRouter()

  const { getDaoPath } = useDaoNavHelpers()
  const href = getDaoPath(coreAddress)

  // Ensure no more alphanumeric characters follow DAO address in URL. This
  // regex should look something like `^/dao/cosmos\b.*`, to ensure that DAOs
  // whose addresses are prefixes of other DAO addresses do not match. This
  // ensures that a chain x/gov DAO does not show as selected when a DAO on that
  // chain is selected, since a DAO's address prefix may start with the name of
  // the chain x/gov DAO itself.
  const selected = new RegExp(`^${href}\\b.*`).test(asPath)

  // If compact, just show image.
  return compact ? (
    <LinkWrapper
      className={clsx(
        'box-content flex h-8 w-8 flex-row items-center justify-center py-1.5 px-6 transition-opacity hover:opacity-70 active:opacity-60',
        selected && 'bg-background-interactive-selected'
      )}
      href={href}
    >
      <Tooltip title={name}>
        <div
          className="h-7 w-7 overflow-hidden rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})` }}
        />
      </Tooltip>
    </LinkWrapper>
  ) : (
    <Collapsible
      {...props}
      containerClassName="!gap-0"
      dropdownContainerClassName="!gap-1"
      dropdownIconSize="xs"
      headerClassName={clsx(
        'rounded-md',
        selected && 'bg-background-interactive-selected'
      )}
      imageUrl={imageUrl}
      indentDropdownSize={indent}
      label={name}
      link={{
        href,
        LinkWrapper,
      }}
      noContentIndent
      noPlaceholderDot
    >
      {!!((showSubDaos && subDaos?.length) || children) && (
        <>
          {children}

          {showSubDaos &&
            subDaos?.map((dao, index) => (
              <DaoDropdown
                key={index}
                {...props}
                LinkWrapper={LinkWrapper}
                compact={compact}
                dao={dao}
                indent={indent + 1}
              />
            ))}
        </>
      )}
    </Collapsible>
  )
}
