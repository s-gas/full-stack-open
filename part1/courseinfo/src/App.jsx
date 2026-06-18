const Header = (props) => {
  return <h1>{props.course}</h1>;
}

const Part = (props) => {
  return <p>{props.part} {props.exercise}</p>;
}

const Content = (props) => {
  const parts = [];
  for (let i = 0; i < props.parts.length; i++) {
    parts.push({
      part: props.parts[i],
      exercise: props.exercises[i],
    });
  }
  return (
    <>
      {parts.map((part) => <Part part={part.part} exercise={part.exercise} />)}
    </>
  );
}

const Total = (props) => {
  const total = props.exercises.reduce((acc, cur) => acc + cur, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const exercises = [exercises1, exercises2, exercises3];
  const parts = [part1, part2, part3];
  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} parts={parts} />
      <Total exercises={exercises} />
    </div>
  );
}

export default App
