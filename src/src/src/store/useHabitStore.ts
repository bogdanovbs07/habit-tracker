import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Habit = {
  id: string;
  name: string;
  icon: string;
  completedDates: string[];
};

type HabitStore = {
  habits: Habit[];
  addHabit: (name: string, icon: string) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (id: string, date: string) => void;
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      addHabit: (name, icon) =>
        set((state) => ({
          habits: [
            ...state.habits,
            { id: crypto.randomUUID(), name, icon, completedDates: [] },
          ],
        })),
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
      toggleCompletion: (id, date) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === id) {
              const isCompleted = habit.completedDates.includes(date);
              return {
                ...habit,
                completedDates: isCompleted
                  ? habit.completedDates.filter((d) => d !== date)
                  : [...habit.completedDates, date],
              };
            }
            return habit;
          }),
        })),
    }),
    { name: 'habit-tracker-storage' }
  )
);
