import { useAnecdotes, useAnecdotesActions } from './store'
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  const { add } = useAnecdotesActions();

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        add(e.target.anecdote.value)
        e.target.anecdote.value = "";
      }}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
