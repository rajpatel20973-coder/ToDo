import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) onEdit(todo.id, trimmed);
    else setDraft(todo.text); // revert if empty
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") { setDraft(todo.text); setEditing(false); }
  };

  return (
    <div className="todo-item">
      {/* Checkbox */}
      <div
        className={`todo-checkbox ${todo.completed ? "checked" : ""}`}
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
            onToggle(todo.id);
          }
        }}
      />

      {/* Text or Edit Input */}
      {editing ? (
        <input
          className="todo-edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={`todo-text ${todo.completed ? "done" : ""}`}
          onDoubleClick={() => !todo.completed && setEditing(true)}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="todo-actions">
        {!todo.completed && (
          <button
            className="btn-icon"
            onClick={() => setEditing((e) => !e)}
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="btn-icon"
          onClick={() => onDelete(todo.id)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}