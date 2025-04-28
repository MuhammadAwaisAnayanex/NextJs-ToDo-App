'use client';
import { useTodoStore } from '../app/store/todoStore';
import { useState } from 'react';
import classNames from 'classnames';

export default function Home() {
  const {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
  } = useTodoStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAddTodo = () => {
    if (!title.trim()) return;
    addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSaveEdit = (id) => {
    editTodo(id, editTitle, editDescription);
    setEditingId(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>

        {/* Add Todo Form */}
        <div className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Optional description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6 justify-center">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={classNames(
                "px-4 py-2 rounded",
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-300'
              )}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="flex flex-col gap-4">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div className="flex-1">
                {editingId === todo.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className="border p-1 rounded"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="border p-1 rounded"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button
                      className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2
                      className={classNames(
                        "text-lg font-semibold",
                        todo.completed && 'line-through text-gray-400'
                      )}
                    >
                      {todo.title}
                    </h2>
                    {todo.description && (
                      <p className="text-gray-600">{todo.description}</p>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  className="text-sm text-green-600 hover:underline"
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-500">No todos found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
