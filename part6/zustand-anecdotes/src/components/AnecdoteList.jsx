import { useAnecdotes, useAnecdotesActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdotesActions();

  return (
      <>
        {
          anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={ async () => await vote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))
        }
      </>
  )
}

export default AnecdoteList
