import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions();

  const handleSubmit = (e) => {
    e.preventDefault();
    add(e.target.anecdote.value)
    e.target.anecdote.value = "";
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
