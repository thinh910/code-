import './App.css';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

function App() {
  let task = useRef()
  let [active, setActive] = useState([])
  let [completed, setCompleted] = useState([])
  let [status, setStatus] = useState('all')
  let allBar = useRef()
  let activeBar = useRef()
  let completedBar = useRef()

  function createTask() {
    active.unshift(task.current.value)
    localStorage.setItem('active', JSON.stringify(active))
    task.current.value = ''
    getData()
  }

  function getData() {
    setActive(JSON.parse(localStorage.getItem('active')) || [])
    setCompleted(JSON.parse(localStorage.getItem('completed')) || [])
  }

  function removeTask(e) {
    if (e.target.checked) {
      let filter = active.filter(task => task !== e.target.parentElement.textContent)
      completed.unshift(e.target.parentElement.textContent)
      localStorage.setItem('active', JSON.stringify(filter))
      localStorage.setItem('completed', JSON.stringify(completed))
      setTimeout(() => {
        getData()
      }, 100)
    } else {
      let filter = completed.filter(task => task !== e.target.parentElement.textContent)
      active.unshift(e.target.parentElement.textContent)
      localStorage.setItem('completed', JSON.stringify(filter))
      localStorage.setItem('active', JSON.stringify(active))
      setTimeout(() => {
        getData()
      }, 100)
    }
  }

  function changeStatus(e) {
    setStatus(e.target.id)
    switch (e.target.id) {
      case 'all':
        activeBar.current.className = ''
        completedBar.current.className = ''
        allBar.current.className = 'active-page'
        break;
      case 'active':
        allBar.current.className = ''
        completedBar.current.className = ''
        activeBar.current.className = 'active-page'
        break;
      case 'completed':
        allBar.current.className = ''
        activeBar.current.className = ''
        completedBar.current.className = 'active-page'
        break;
    }
  }

  function removeOneTask(e) {
    let filter1 = active.filter(task => task !== e.target.id)
    let filter2 = completed.filter(task => task !== e.target.id)
    localStorage.setItem('active', JSON.stringify(filter1))
    localStorage.setItem('completed', JSON.stringify(filter2))
    getData()
  }

  function removeAll() {
    switch (status) {
      case 'all':
        localStorage.removeItem('active')
        localStorage.removeItem('completed')
        getData()
        break;
      case 'active':
        localStorage.removeItem('active')
        getData()
        break;
      case 'completed':
        localStorage.removeItem('completed')
        getData()
        break;
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main>
      <h1>#todo</h1>
      <nav>
        <div className='status'>
          <div onClick={changeStatus} id='all'>
            <h3 id='all'>All</h3>
            <div className='active-page' ref={allBar} id='all'></div>
          </div>
          <div onClick={changeStatus} id='active'>
            <h3 id='active'>Active</h3>
            <div ref={activeBar} id='active'></div>
          </div>
          <div onClick={changeStatus} id='completed'>
            <h3 id='completed'>Completed</h3>
            <div ref={completedBar} id='completed'></div>
          </div>
        </div>
        <div className='status-bar'></div>
      </nav>
      <div className='add-container'>
        <input type='text' name='todo' placeholder='add details' ref={task} />
        <button type='button' className='add-btn' onClick={createTask}>Add</button>
      </div>
      <div className='todo-container'>
        {
          status === 'all' && <>
            {
              active.length ? active.map((task, i) => {
                let card = <div key={i} className='oneTask'>
                  <label><input type='checkbox' onChange={removeTask} name='task' checked={false} />{task}</label>
                  <i className="fa-solid fa-trash" id={task} onClick={removeOneTask}></i>
                </div>
                return card
              }) : <></>
            }
            {
              completed.length ? completed.map((task, i) => {
                let card = <div key={i} className='oneTask'>
                  <label className='completed'><input type='checkbox' onChange={removeTask} name='task' checked={true} />{task}</label>
                  <i className="fa-solid fa-trash" id={task} onClick={removeOneTask}></i>
                </div>
                return card
              }) : <></>
            }
          </>
        }
        {
          status === 'active' && active.length ? active.map((task, i) => {
            let card = <div key={i} className='oneTask'>
              <label><input type='checkbox' onChange={removeTask} name='task' checked={false} />{task}</label>
              <i className="fa-solid fa-trash" id={task} onClick={removeOneTask}></i>
            </div>
            return card
          }) : <></>
        }
        {
          status === 'completed' && completed.length ? completed.map((task, i) => {
            let card = <div key={i} className='oneTask'>
              <label className='completed'><input type='checkbox' onChange={removeTask} name='task' checked={true} />{task}</label>
              <i className="fa-solid fa-trash" id={task} onClick={removeOneTask}></i>
            </div>
            return card
          }) : <></>
        }
      </div>
      {
        status === 'all' && (active.length || completed.length) ? <div className='del-container'>
          <button type='button' onClick={removeAll}>Delete All</button>
        </div> : <></>
      }
      {
        status === 'active' && active.length ? <div className='del-container'>
          <button type='button' onClick={removeAll}>Delete All</button>
        </div> : <></>
      }
      {
        status === 'completed' && completed.length ? <div className='del-container'>
          <button type='button' onClick={removeAll}>Delete All</button>
        </div> : <></>
      }
    </main>
  );
}

export default App;
