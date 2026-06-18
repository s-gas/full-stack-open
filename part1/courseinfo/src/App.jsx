const Header = ({course}) => {
  return <h1>{course}</h1>;
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>;
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => <Part key={part.name} part={part} />)}
    </>
  );
}

const Total = ({parts}) => {
  const total = parts.reduce((tot, part) => tot + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  const parts = [part1, part2, part3];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App
