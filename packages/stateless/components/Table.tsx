import clsx from 'clsx'
import { ReactNode } from 'react'

export type TableItem =
  | ReactNode
  | {
      value: ReactNode
      className?: string
    }

export type TableProps = {
  // The table headers.
  headers: TableItem[]
  // The table rows. Each row is an array of items.
  rows: TableItem[][]
  // This makes the first column take up all the remaining space, and the rest
  // of the columns will be sized to fit their content. Often the first column
  // is a sort of descriptor for the row, and the rest of the columns are
  // relevant data. Default is true.
  expandFirstColumn?: boolean
  // Padding around each cell. Default is 'medium'.
  padding?: 'none' | 'small' | 'medium' | 'large'
  // If true, the headers will be bolded. Default is true.
  boldHeaders?: boolean
  // Optional class name to apply to the table container.
  className?: string
}

export const Table = ({
  headers,
  rows,
  expandFirstColumn = true,
  padding = 'medium',
  boldHeaders = true,
  className,
}: TableProps) => {
  const numColumns = Math.max(headers.length, ...rows.map((row) => row.length))

  const paddingClass = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  }[padding]

  return (
    <div
      className={clsx(
        'grid-rows-auto grid items-stretch justify-items-stretch',
        className
      )}
      style={{
        gridTemplateColumns: [
          expandFirstColumn ? '1fr' : 'auto',
          ...[...Array(numColumns - 1)].map(() => 'auto'),
        ].join(' '),
      }}
    >
      {headers.map((header, index) => (
        <div
          key={index}
          className={clsx(
            'bg-background-primary',
            paddingClass,
            boldHeaders && 'font-bold',
            index === 0 ? 'rounded-tl-md' : 'border-l border-border-secondary',
            index === headers.length - 1 && 'rounded-tr-md',
            typeof header === 'object' &&
              header &&
              'className' in header &&
              header.className
          )}
        >
          {header}
        </div>
      ))}

      {rows.flatMap((row, rowIndex) =>
        row.map((item, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={clsx(
              paddingClass,
              // Every other row, alternating background.
              rowIndex % 2 !== 0 && 'bg-background-tertiary',
              rowIndex === rows.length - 1 && colIndex === 0 && 'rounded-bl-md',
              rowIndex === rows.length - 1 &&
                colIndex === row.length - 1 &&
                'rounded-br-md',
              colIndex > 0 && 'border-l border-border-secondary',
              typeof item === 'object' &&
                item &&
                'className' in item &&
                item.className
            )}
          >
            {item}
          </div>
        ))
      )}
    </div>
  )
}
