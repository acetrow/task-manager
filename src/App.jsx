import './App.css'
import TaskList from './components/TaskList'

// Fake/hardcoded data for Phase 1
const fakeTasks = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build Task Manager', completed: false }
]

function App() {
  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskList tasks={fakeTasks} />
    </div>
  )
}

export default App
