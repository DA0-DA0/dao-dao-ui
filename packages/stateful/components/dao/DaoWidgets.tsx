import { useWidgets } from '../../widgets'

export const DaoWidgets = () => {
  const loadingWidgets = useWidgets()

  return !loadingWidgets.loading && loadingWidgets.data.length > 0 ? (
    <div className="flex flex-col gap-2">
      {loadingWidgets.data.map((Widget, index) => (
        <div key={index}>
          <Widget />
        </div>
      ))}
    </div>
  ) : null
}
