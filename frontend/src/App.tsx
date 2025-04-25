import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onUpdate={fetchTasks} />
    </div>
  );
};

export default App;
