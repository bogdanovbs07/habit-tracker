import { useHabitStore } from '../store/useHabitStore';
import { HabitItem } from './HabitItem';

export function HabitList() {
  const habits = useHabitStore((state) => state.habits);

  if (habits.length === 0) {
    return <p className="empty-message">У вас пока нет привычек. Добавьте первую!</p>;
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
