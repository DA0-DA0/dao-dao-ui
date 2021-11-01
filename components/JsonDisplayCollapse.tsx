export default function JsonDisplayCollapse({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return (
    <div className="collapse border rounded-box border-base-300 collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        <pre>{content}</pre>
      </div>
    </div>
  )
}
