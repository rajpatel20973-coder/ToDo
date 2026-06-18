import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse todos from localStorage:", e);
    }
    return [];
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  // Persist todos
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage:", e);
    }
  }, [todos]);

  // Apply theme
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch (e) {
      console.error("Failed to save theme to localStorage:", e);
    }
  }, [darkMode]);

  const addTodo = (text) => {
    setTodos((prev) => [
      { id: Date.now(), text, completed: false },
      ...prev,
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  // Filter + Search
  const visible = todos.filter((t) => {
    const matchSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "active" && !t.completed) ||
      (filter === "completed" && t.completed);
    return matchSearch && matchFilter;
  });

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">
          Do<span>.</span>
        </h1>
        <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode((d) => !d)} />
      </header>

      {/* Add Todo */}
      <div className="card">
        <TodoForm onAdd={addTodo} />
      </div>

      {/* Search */}
      <div className="card">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filter */}
      <div className="card">
        <FilterBar current={filter} onChange={setFilter} />
      </div>

      {/* List */}
      <TodoList
        todos={visible}
        total={todos.length}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}