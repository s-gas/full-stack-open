import { create } from 'zustand'
import AnecdoteService from './services/anecdotes'
import anecdotes from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    init: async () => {
      const data = await AnecdoteService.getAll();
      set(() => ({ anecdotes: data }));
    },
    vote: (id) => set( state => {
      const updated = state.anecdotes
        .map((anecdote) => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
        .sort((a, b) => b.votes - a.votes);
      return { anecdotes: updated }
    }),
    add: (anecdote) => set(state => {
      const updated = state.anecdotes
        .concat(asObject(anecdote))
        .sort((a, b) => b.votes - a.votes);
      return { anecdotes: updated }
    }),
    setFilter: (value) => set({ filter: value}),
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter) {
    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }
  return anecdotes;
}

export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
