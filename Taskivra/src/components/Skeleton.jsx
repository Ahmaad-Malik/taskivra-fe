// grey placeholder block shown while the data is loading
const Skeleton = () => {
  return (
    <div className="flex h-[72px] w-full flex-col gap-2 rounded-lg bg-graysoft p-4">
      <div className="h-3 w-[96%] rounded bg-line" />
      <div className="h-3 w-[86%] rounded bg-line" />
    </div>
  )
}

export default Skeleton
