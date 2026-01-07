import './TaskItem.css'

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        type="button"
        className="task-toggle-button"
        onClick={onToggle}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? '✓' : ''}
      </button>
      <span className="task-text" onClick={onToggle}>
        {task.text}
      </span>
      <button
        type="button"
        className="task-delete-button"
        onClick={onDelete}
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  )
}

export default TaskItem

