import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

const KEY = "todoApp.todos";

export function App(){
    const [todos, setTodos] = useState([
        { id: 1, task: "Tarea ", completed: false },
    ]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos)
            setTodos(storedTodos);
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const todoTaskRef = useRef();

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id );
        todo.completed = !todo.completed;

        setTodos(newTodos);
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, completed: false }];
        });

        todoTaskRef.current.value = null;
    }

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder="nueva tarea"/>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleClearAll}>🗑</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </Fragment>
    );
}