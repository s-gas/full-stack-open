import { useAnecdotes, useAnecdotesActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdotesActions();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log(e.target.anecdote.value)
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
