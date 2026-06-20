import { useState } from 'react'

const Button = ({text, handler}) => {
  return <button onClick={handler}>{text}</button>
}

const Feedback = ({feedbacks}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={feedbacks[0].name} handler={() => feedbacks[0].setter(feedbacks[0].count + 1)} />
      <Button text={feedbacks[1].name} handler={() => feedbacks[1].setter(feedbacks[1].count + 1)} />
      <Button text={feedbacks[2].name} handler={() => feedbacks[2].setter(feedbacks[2].count + 1)} />
    </div>
  )
}

const Statistics = ({feedbacks}) => {
  const total = feedbacks.reduce((tot, cur) => tot + cur.count, 0);
  const average = feedbacks.reduce((tot, cur) => tot + (cur.count * cur.value), 0) / total;
  const positive = feedbacks.reduce((tot, cur) => cur.value > 0 ? tot + cur.count : tot, 0) / total * 100;
  return (
    <div>
      <h1>statistics</h1>
      <div>{feedbacks[0].name} {feedbacks[0].count}</div>
      <div>{feedbacks[1].name} {feedbacks[1].count}</div>
      <div>{feedbacks[2].name} {feedbacks[2].count}</div>
      <div>total {total}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbacks = [
    {
      name: "good",
      count: good,
      setter: setGood,
      value: 1,
    },
    {
      name: "neutral",
      count: neutral,
      setter: setNeutral,
      value: 0,
    },
    {
      name: "bad",
      count: bad,
      setter: setBad,
      value: -1,
    },
  ];

  return (
    <div>
      <Feedback feedbacks={feedbacks} />
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

export default App
