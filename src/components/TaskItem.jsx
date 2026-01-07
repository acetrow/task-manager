import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const handleSubmitEdit = () => {
    const trimmed = draft.trim()
    if (!trimmed || trimmed === task.text) {
      setIsEditing(false)
      setDraft(task.text)
      return
    }
    onEdit(trimmed)
    setIsEditing(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmitEdit()
    } else if (event.key === 'Escape') {
      setDraft(task.text)
      setIsEditing(false)
    }
  }

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

      {isEditing ? (
        <input
          className="task-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSubmitEdit}
          autoFocus
        />
      ) : (
        <span className="task-text" onClick={onToggle}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        <button
          type="button"
          className="task-edit-button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          type="button"
          className="task-delete-button"
          onClick={onDelete}
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default TaskItem

