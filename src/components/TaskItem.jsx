import './TaskItem.css'

function TaskItem({ task }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-text">{task.text}</span>
      {task.completed && <span className="task-status">✓</span>}
    </li>
  )
}

export default TaskItem

