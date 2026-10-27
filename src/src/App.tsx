import { useEffect, useState } from 'react';
import { HabitForm } from './components/HabitForm';
import { HabitList } from './components/HabitList';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Трекер привычек</h1>
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
      </header>
      <main>
        <HabitForm />
        <HabitList />
      </main>
    </div>
  );
}

export default App;
