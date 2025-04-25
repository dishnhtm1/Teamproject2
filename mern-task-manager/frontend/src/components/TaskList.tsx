import React from 'react';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  onUpdate: () => void;
}

const TaskList: React.FC<Props> = ({ tasks, onUpdate }) => {
  const toggleComplete = async (id: string) => {
    await axios.put(`http://localhost:5000/tasks/${id}`);
    onUpdate();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    onUpdate();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <strong>{task.title}</strong>: {task.description}
          </span>
          <button onClick={() => toggleComplete(task._id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
