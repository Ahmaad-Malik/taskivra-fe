// value is the filled percentage, for example 80 means 80%
// color is the tailwind class used for the filled part
const ProgressBar = ({ value, color = "bg-teal", className = "" }) => {
  return (
    <div className={"flex h-2 w-full rounded-full bg-graysoft " + className}>
      <div className={"h-2 rounded-full " + color} style={{ width: value + "%" }} />
    </div>
  )
}

export default ProgressBar
