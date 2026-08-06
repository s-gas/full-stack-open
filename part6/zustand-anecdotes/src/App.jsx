import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import { useAnecdotesActions } from './store';
import { useEffect } from 'react';

const App = () => {
  const { init } = useAnecdotesActions();

  useEffect(() => {
    init();
  }, [init])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
