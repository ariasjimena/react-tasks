import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { TaskCreator } from './components/taskCreator';
import { TaskTable } from './components/TaskTable';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import { VisibilityControl } from './components/VisibilityControl';

function App() {

  const [tasksItems, setTasksItems] = useState([])

  const [showCompleted, setShowCompleted] = useState(false)

  function createNewTask(taskName) {
    if (!tasksItems.find(task => task.name === taskName)){
        setTasksItems([...tasksItems, {name: taskName, done: false}])
    }
  }
  
  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data){
       setTasksItems(JSON.parse(data)) 
    }
}, [ ])

const cleanTasks = () => {
   setTasksItems(tasksItems.filter(task => !task.done))
   setShowCompleted(false)
}

useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksItems))
}, [tasksItems])

  const toggleTask = task => {
    setTasksItems(
      tasksItems.map(t => (t.name === task.name) ? {...t, done: !t.done}: t)
    )
  }

  return(
    <main className="bg-dark vh-100 text-white">
      <div className='container p-4 col-md-4 offset-md-4'>
      <TaskCreator createNewTask={createNewTask} />
      <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
      <VisibilityControl 
      isChecked={showCompleted}
      setShowCompleted={(checked) => setShowCompleted(checked)} cleanTasks={cleanTasks} />
      {
        showCompleted === true && (
          <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={showCompleted} />
        ) 
      }
      </div>
      </main>
      )
  }

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <App />
)

