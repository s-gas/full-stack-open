import { create } from 'zustand'

const useStatisticsStore = create((set) => ({
  values: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    incrementGood: () => set((state) => ({ values: { ...state.values, good: state.values.good + 1 } })),
    incrementNeutral: () => set((state) => ({ values: { ...state.values, neutral: state.values.neutral + 1 } })),
    incrementBad: () => set((state) => ({ values: { ...state.values, bad: state.values.bad + 1 } })),
  }
}))

export const useStatistics = () => useStatisticsStore(state => state.values)
export const useSetStatistics = () => useStatisticsStore(state => state.actions)
