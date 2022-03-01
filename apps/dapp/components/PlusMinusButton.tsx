export const PlusMinusButton = ({
  onPlus,
  onMinus,
  disableMinus,
}: {
  onPlus: () => void
  onMinus: () => void
  disableMinus: boolean
}) => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-outline btn-sm text-md normal-case"
        onClick={(e) => {
          e.preventDefault()
          onPlus()
        }}
      >
        +
      </button>
      <button
        className={`btn btn-outline btn-primary btn-sm text-md ${
          disableMinus ? 'btn-disabled btn-secondary' : ''
        }`}
        onClick={(e) => {
          e.preventDefault()
          onMinus()
        }}
      >
        -
      </button>
    </div>
  )
}
