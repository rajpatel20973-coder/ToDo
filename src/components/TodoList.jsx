import TodoItem from "./TodoItem";

export default function TodoList({ todos, total, onToggle, onDelete, onEdit }) {
  return (
    <div>
      {total > 0 && (
        <p className="todo-count">
          {todos.length} of {total} task{total !== 1 ? "s" : ""}
        </p>
      )}

      {todos.length === 0 ? (
        <div className="empty-state">
          {total === 0
            ? "✨ Nothing here yet — add your first task!"
            : "🔍 No tasks match your search or filter."}
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}