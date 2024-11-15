import './App.css';
import { useState, useEffect } from 'react';
import Task from './components/Task';
import Confetti from 'react-confetti';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("High");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todoList')) || [];
    console.log("Loaded tasks:", savedTasks);
    setTodoList(savedTasks);
  }, []);
  
  useEffect(() => {
    console.log("Saving tasks:", todoList);
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);
  
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  const addTask = () => {
    if (!newTask.trim()){
      setErrorMessage("Please enter a task.");
      return;
    }
  
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
      priority: priority
    };
  
    setTodoList([...todoList, task]);
    setNewTask(""); 
    setErrorMessage(""); 
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );

    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  const editTask = (id, newTaskName) => {
    setTodoList(todoList.map((task) => {
      if (task.id === id) {
        return { ...task, taskName: newTaskName };
      }
      return task;
    }));
  };

  const sortTasks = () => {
    const sortedTasks = [...todoList].sort((a, b) => {
      const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setTodoList(sortedTasks);
  };

  const filteredTasks = todoList.filter(task =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="addTask">
        <input onChange={handleChange} placeholder="Enter a new task" />
        <select onChange={handlePriorityChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask} style={{ backgroundColor: '007bff' }}>Add Task</button>
        <button onClick={sortTasks} className="priority-button">Sort by Priority</button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="search">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="list">
        {filteredTasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              completeTask={completeTask}
              editTask={editTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
