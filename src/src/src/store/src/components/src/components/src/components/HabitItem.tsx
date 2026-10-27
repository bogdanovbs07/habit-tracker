import { Trash2 } from 'lucide-react';
import { Habit, useHabitStore } from '../store/useHabitStore';

type Props = { habit: Habit };

const getWeekDates = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][d.getDay()];
};

export function HabitItem({ habit }: Props) {
  const toggleCompletion = useHabitStore((state) => state.toggleCompletion);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const weekDates = getWeekDates();
  const todayStr = new Date().toISOString().split('T')[0];

  const weeklyProgress = weekDates.filter((date) => habit.completedDates.includes(date)).length;
  const progressPercent = (weeklyProgress / 7) * 100;

  let streak = 0;
  const checkDate = new Date();
  if (!habit.completedDates.includes(todayStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  while (true) {
    const dateString = checkDate.toISOString().split('T')[0];
    if (habit.completedDates.includes(dateString)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else break;
  }

  return (
    <div className="habit-item">
      <div className="habit-header">
        <div className="habit-title">
          <span className="habit-icon">{habit.icon}</span>
          <span>{habit.name}</span>
        </div>
        <button onClick={() => deleteHabit(habit.id)} className="delete-btn">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="week-view">
        {weekDates.map((date) => {
          const isCompleted = habit.completedDates.includes(date);
          return (
            <button
              key={date}
              onClick={() => toggleCompletion(habit.id, date)}
              className={`day-btn ${isCompleted ? 'completed' : ''} ${date === todayStr ? 'today' : ''}`}
            >
              <span className="day-name">{formatDate(date)}</span>
              <span className="day-status">{isCompleted ? '✓' : ''}</span>
            </button>
          );
        })}
      </div>

      <div className="stats">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <span className="progress-text">{weeklyProgress} из 7</span>
        <span className="streak">🔥 {streak} дн.</span>
      </div>
    </div>
  );
}
