import { useState } from 'react'

const Anecdote = ({title, anecdote, votes}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const firstIndex = Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(firstIndex)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));  
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const handleNext = () => {
    let index = selected;
    while (index === selected) {
      index = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(index);
  }

  const handleVote = () => {
    setVotes(votes.map((vote, i) => i === selected ? vote + 1 : vote));
    if (votes[selected] + 1 > votes[mostVotedIndex]) setMostVotedIndex(selected);
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <Anecdote title="Anecdote with most votes" anecdote={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]} />
    </div>
  )
}

export default App
