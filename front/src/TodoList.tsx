import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from './types';

const TodoList: React.FC = () => {
  const userId = 1;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>(''); 
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {        
        if(localStorage.getItem('todos')){
          const localTodos = localStorage.getItem('todos')
          setTodos(JSON.parse(localTodos!));
        }else{
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
          const filteredTodos = response.data.filter((todo: Todo) => todo.userId === userId);
          setTodos(filteredTodos);
        }     
       
      } catch (error) {
        console.error('error: ', error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) {
      alert('title is required!');
      return;
    }
    const newTodoItem: Todo = {
      userId,
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };  

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id || todo.userId !== userId));
  };

  const toggleStatus = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id && todo.userId === userId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true; // 'all' filter
  });

  useEffect(() => {
    if(todos.length > 0){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
   
  }, [todos]);

  return (
    <div>
      <h1>Todo List</h1>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleStatus(todo.id)}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
