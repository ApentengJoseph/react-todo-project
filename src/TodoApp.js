import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState('');

  const addTask = () => {
    if (task.trim()) {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((t, index) => (index === editIndex ? { text: task, completed: t.completed } : t));
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask('');
    }
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t));
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="todo-container">
      <h1>TODO Task List</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>{editIndex !== null ? 'Update' : 'Add Task'}</button>
      </div>
      <div className="task-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
        />
      </div>
      <ul className="task-list">
        {filteredTasks.map((t, index) => (
          <li key={index} className={t.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)}>{t.text}</span>
            <div className="task-buttons">
              <button className="edit" onClick={() => editTask(index)}>Edit</button>
              <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
