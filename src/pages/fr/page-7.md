---
title: Managing State in JSX
description: State Managment - 8
layout: ../../layouts/MainLayout.astro
---

React uses a declarative way to manipulate the UI. Instead of manipulating individual pieces of the UI directly, you describe the different states that your component can be in, and switch between them in response to the user input. This is similar to how designers think about the UI.

## State in JSX

In JSX, you can use the `useState` hook to declare a state variable. This is a variable that can be changed over time.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- The `useState` hook returns an array with two elements. The first element is the current value of the state variable, and the second element is a function that lets you update it.
- You can name your state variable anything you want, but we recommend using a naming convention like `count` or `setCount`.
- When you declare a state variable with `useState`, it's always an array with two elements. The first element is the current value, and the second element is a function that lets you update it. You can use array destructuring to give these values names, just like with `props`. These names aren't a part of the `useState` API. You can name your own state variables (or any other variables) however you want.

## Reading state in JSX

You can read the current value of a state variable by using the name of the variable. For example, in the `Counter` component above, we display the current value of the `count` state variable by using `{count}` in the `<p>` element.

## Updating state in JSX

To update the state variable, you call the function you got from the `useState` hook. It's similar to `this.setState` in a class, except it doesn't merge the old and new state together. (We'll show an example comparing `useState` to `this.state` in [Using the State Hook](https://reactjs.org/docs/hooks-state.html#using-the-state-hook).)

```jsx
<button onClick={() => setCount(count + 1)}>Click me</button>
```

- The only argument to the `setState` function is the new value. It replaces the previous value. Unlike `this.setState` in a class, updating a state variable always _replaces_ it instead of merging it.
- You can call `setState` as many times as you want. It will always replace the previous value with the new one.
- The only argument to the `setState` function is the new value. It replaces the previous value. Unlike `this.setState` in a class, updating a state variable always _replaces_ it instead of merging it.
- You can call `setState` as many times as you want. It will always replace the previous value with the new one.

## Using the State Hook

In a class, we initialize the `count` state to `0` by setting `this.state` to `{ count: 0 }` in the constructor:

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

In a function component, we have no `this`, so we can't assign or read `this.state`. Instead, we call the `useState` Hook directly inside our component:

```jsx
function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- We declare a state variable called `count`, and set it to `0`. React will remember its current value between re-renders, and provide the most recent one to our function. (If we wanted to initialize the count to a different value, we would call `useState(10)` instead.)
- The only argument to the `useState()` Hook is the initial state. In the example above, it is `0` because our counter starts from zero. Note that unlike `this.state`, the state here doesn't have to be an object — although it can be if you want. The initial state argument is only used during the first render.
- The `useState()` Hook returns a pair: the current state value and a function that lets you update it. You can call this function from an event handler or somewhere else. It's similar to `this.setState` in a class, except it doesn't merge the old and new state together.
- If you're familiar with React class lifecycle methods, you can think of `useState()` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

## Declaring multiple state variables

You can use the State Hook more than once in a single component:

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);

  return (
    <div>
      <p>You are {age} years old.</p>
      <p>You like {fruit}.</p>
      <p>You have {todos.length} todos.</p>
    </div>
  );
}
```

The [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) syntax lets us give different names to the state variables we declared by calling `useState`. These names aren't a part of the `useState` Hook itself. Instead, React assumes that if you call `useState` many times, you do it in the same order during every render.

### Tip: What Do Square Brackets Mean?

You might have noticed the square brackets when we declare a state variable:

```jsx
const [age, setAge] = useState(42);
```

The names on the left aren't a part of the `useState` Hook API. Instead, React assumes that if you call `useState()` many times, you do it in the same order during every render. We'll come back to why this works and when this is useful later.

### Tip: Using Multiple State Variables

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give *different* names to different state variables if we want to use more than one:

```jsx
function Form() {
  // Declare multiple state variables!
  const [name, setName] = useState("Mary");
  const [surname, setSurname] = useState("Poppins");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={surname} onChange={e => setSurname(e.target.value)} />
      <p>
        Hello, {name} {surname}
      </p>
      <p>Window width: {width}</p>
    </>
  );
}
```
