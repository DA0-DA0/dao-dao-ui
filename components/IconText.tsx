function IconText({ className, color, icon, text }) {
  return (
    <div className={className} style={{ color }}>
      {icon}
      <span className="ml-1 font-medium capitalize align-middle">{text}</span>
    </div>
  )
}

export default IconText