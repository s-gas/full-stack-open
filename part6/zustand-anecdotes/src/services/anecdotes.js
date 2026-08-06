const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

const createNew = async (anecdote) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  }
  const res = await fetch(baseUrl, options);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

const update = async (anecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  }
  const res = await fetch(`${baseUrl}/${anecdote.id}`, options);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

export default { getAll, createNew, update }
