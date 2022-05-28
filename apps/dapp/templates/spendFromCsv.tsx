import { XIcon } from '@heroicons/react/outline'
import { useCSVReader } from 'react-papaparse'

import { Button } from '@dao-dao/ui'
import { Modal } from '@dao-dao/ui'

// Function to convert first line of the CSV as keys for the values of the next lines.
function objectJSONify(results: any, append: any) {
  let keys = results.data[0]
  keys = results.data[0].map((v: any) =>
    v
      .toLowerCase()
      .replace(/ /g, '_')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  )
  let values = results.data.slice(1)
  values.map((array: any) => {
    let object: any = {}
    keys.forEach((key: any, i: any) => {
      return (object[key] = array[i])
    })
    object.label = '💵 Spend'
    object.isFromCSV = true
    append({ ...object })
    return object
  })
}

export const SpendFromCsvComponent = ({ onClose, append }) => {
  const { CSVReader } = useCSVReader()
  return (
    <Modal onClose={onClose}>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
          type="button"
        >
          <XIcon className="w-4 h-4" />
        </button>
        <div className="flex justify-between items-center mb-6">
          <h1 className="header-text">Spend from CSV</h1>
        </div>
        <CSVReader
          className="flex mb-10"
          onUploadAccepted={(results: any) => {
            objectJSONify(results, append)
          }}
        >
          {({ getRootProps, acceptedFile, ProgressBar }: any) => (
            <>
              <div className="flex justify-between">
                <Button type="button" {...getRootProps()} variant="secondary">
                  ↑ Upload CSV for Import
                </Button>
                <a download href={process.env.NEXT_PUBLIC_SPEND_TEMPLATE_CSV}>
                  <Button className="ml-1" type="button" variant="secondary">
                    ↓ Download template CSV
                  </Button>
                </a>
              </div>
              <div className="flex flex-col justify-center items-center my-6">
                File: {acceptedFile ? acceptedFile.name : 'No file imported'}
                <ProgressBar className="w-1 bg-violet-400" />
              </div>
              <div className="flex justify-end">
                <Button onClick={onClose} type="button">
                  Done
                </Button>
              </div>
            </>
          )}
        </CSVReader>
      </div>
    </Modal>
  )
}
