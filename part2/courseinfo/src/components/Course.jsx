const Part = ({ name, exercises }) =>
    <p>
        {name} {exercises}
    </p>

const Total = ({ parts }) =>
    <p>
        <b>
            total of {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} exercises
        </b>
    </p>

const Header = ({ course }) => {
    return <h1>{course}</h1>
}

const Content = ({ parts }) =>
    <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        <Total parts={parts} />
    </div>

const Course = ({ course }) =>
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </div>

export default Course
