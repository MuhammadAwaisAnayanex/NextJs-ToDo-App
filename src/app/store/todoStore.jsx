import { create } from 'zustand';

export const useTodoStore = create((set) => ({
  todos: [],
  filter: 'all',

  addTodo: (title, description) => set((state) => ({
    todos: [
      ...state.todos,
      { id: Date.now(), title, description, completed: false },
    ],
  })),

  toggleComplete: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id),
  })),

  editTodo: (id, newTitle, newDescription) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo
    ),
  })),

  setFilter: (filter) => set(() => ({ filter })),
}));
