import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'


const initialTasks = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build Task Manager', completed: false }
]

const STORAGE_KEY = 'task-manager-tasks'
const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed'
}

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (err) {
      console.error('Failed to load tasks from storage', err)
    }
    return initialTasks
  })
  const [newTaskText, setNewTaskText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.error('Failed to save tasks to storage', err)
    }
  }, [tasks])

  const handleAddTask = (event) => {
    event.preventDefault()
    const trimmed = newTaskText.trim()
    if (!trimmed) return

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false
    }

    setTasks((prev) => [...prev, newTask])
    setNewTaskText('')
  }

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleEditTask = (id, newText) => {
    const trimmed = newText.trim()
    if (!trimmed) return
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: trimmed } : task))
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          className="task-input"
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="filter-bar">
        {Object.entries(FILTERS).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`filter-button ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
          >
            {label}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
      />
    </div>
  )
}

export default App
