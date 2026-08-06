const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

export default { getAll }
