const TaskCard = ({ task }) => {
  return (
    <div className="border p-5 rounded">
      <h3 className="font-bold">{task.name}</h3>
      <p>Category: {task.category}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Deadline: {task.deadline}</p>
    </div>
  )
}

export default TaskCard
