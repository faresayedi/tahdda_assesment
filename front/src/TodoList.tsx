import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from './types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const userId = 1;

  useEffect(() => {
    const fetchTodos = async () => {
      try {        
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const filteredTodos = response.data.filter((todo: Todo) => todo.userId === userId);
        setTodos(filteredTodos);
      } catch (error) {
        console.error('error: ', error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li>
            {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
