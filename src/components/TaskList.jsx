import './TaskList.css'
import TaskItem from './TaskItem'

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <div className="task-list-container">
      <h2 className="task-list-title">My Tasks</h2>
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Add some tasks to get started!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => onDeleteTask(task.id)}
              onToggle={() => onToggleTask(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList

