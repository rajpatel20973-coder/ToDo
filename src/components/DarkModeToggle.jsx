export default function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button className="dark-toggle" onClick={onToggle} title="Toggle theme">
      {darkMode ? "☀️" : "🌙"}
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}