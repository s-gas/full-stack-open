import { useAnecdotesActions } from "../store"

const Filter = () => {

  const { setFilter } = useAnecdotesActions();

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <label>
      filter
      <input onChange={handleChange} name="filter" />
    </label>
  )
}

export default Filter
