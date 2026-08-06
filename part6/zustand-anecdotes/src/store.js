import { create } from 'zustand'
import AnecdoteService from './services/anecdotes'

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
      const anecdotes = await AnecdoteService.getAll();
      set(() => ({ anecdotes: anecdotes }));
    },
    vote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find((anecdote) => anecdote.id === id)
      const updatedAnecdote = await AnecdoteService.update(anecdote);
      console.log(updatedAnecdote)
      set(state => {
        const updatedList = state.anecdotes
          .map((anecdote) => anecdote.id === id ? updatedAnecdote : anecdote)
          .sort((a, b) => b.votes - a.votes);
        return { anecdotes: updatedList }
      })
    },
    add: async (anecdoteText) => {
      const anecdote = await AnecdoteService.createNew(asObject(anecdoteText));
      set((state) => {
        const updated = state.anecdotes
          .concat(anecdote)
          .sort((a, b) => b.votes - a.votes);
        return { anecdotes: updated }
      })
    },
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
