import UserLayout from "../components/UserLayout"

// this page is built in a later sprint
const TaskDetails = () => {
  return (
    <UserLayout active="tasks" breadcrumb="Workspace / Task details">
      <h1 className="text-[28px] font-bold leading-9 text-ink">Task details</h1>
      <p className="text-[14px] leading-[22px] text-muted">This page is coming in a later sprint.</p>
    </UserLayout>
  )
}

export default TaskDetails
