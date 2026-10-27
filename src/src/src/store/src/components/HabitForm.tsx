import { useState } from 'react';
import { useHabitStore } from '../store/useHabitStore';

const ICONS = ['💧', '🏃', '📚', '🧘', '🥗', '💤'];

export function HabitForm() {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit(name.trim(), icon);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        placeholder="Название привычки..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="habit-input"
      />
      <div className="icon-picker">
        {ICONS.map((i) => (
          <button
            key={i}
            type="button"
            className={`icon-btn ${icon === i ? 'active' : ''}`}
            onClick={() => setIcon(i)}
          >
            {i}
          </button>
        ))}
      </div>
      <button type="submit" className="add-btn">Добавить</button>
    </form>
  );
}
