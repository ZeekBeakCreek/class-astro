---
title: React Hooks
description: React Hooks - 9
layout: ../../layouts/MainLayout.astro
---

React Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks are backwards-compatible and don't contain any breaking changes. This page provides an overview of Hooks for experienced React users.

This page is a fast-paced overview. If you get confused, look for a box like this:

> Detailed Explanation _(Example Box)_

This guide is designed for people who are comfortable with React concepts and terminology. If you're new to React, you might find this guide more confusing than the [main concepts guide](https://blog.bitsrc.io/common-react-hooks-mistakes-every-developer-should-avoid-defd47d09d8c). Read this guide with other articles on this section.

## State Hook

Let's start learning about Hooks by comparing them to classes.

In classes, we use `this.state` to store the current value of the count, and `this.setState()` to update it:

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

In Hooks, we use `useState` to store the current value of the count, and `setCount` to update it:

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

### What does calling `useState` do?

It declares a "state variable". Our variable is called `count` but we could call it anything else, like `banana`. This is a way to "preserve" some values between the function calls — `useState` is a new way to use the exact same capabilities that `this.state` provides in a class. Normally, variables "disappear" when the function exits but state variables are preserved by React.

### What do we pass to `useState` as an argument?

The only argument to the `useState()` Hook is the initial state. Unlike with classes, the state doesn't have to be an object. We can keep a number or a string if that's all we need. In our example, we just want a number for how many times the user clicked, so pass `0` as initial state for our variable. (If we wanted to store two different values in state, we would call `useState()` twice.)

### What does `useState` return?

It returns a pair of values: the current state and a function that updates it. This is why we write `const [count, setCount] = useState()`. This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair. If you're not familiar with the syntax we used, we'll come back to it [at the bottom of this page](#tip-what-do-square-brackets-mean).

Now that we know what the `useState` Hook does, our example should make more sense:

```jsx
import { useState } from "react";

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

> There are a few reasons we're using `useState()` instead of `this.state` in a class:

> - You might be familiar with state variables from other frameworks, but in React, we use the `useState()` Hook instead.
> - `useState()` is a new way to use the exact same capabilities that `this.state` provides in a class. Normally, variables "disappear" when the function exits but state variables are preserved by React.
> - `useState()` is a Hook (we'll talk about what this means in a moment). We'll learn other Hooks later.

> When you declare a state variable with `useState()`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets you update it. You can call this function from an event handler or somewhere else. It's similar to `this.setState` in a class, except it doesn't merge the old and new state together. (We'll show an example comparing `useState()` to `this.state` in [Using the State Hook](#using-the-state-hook).)

> If you're not familiar with the syntax we used for declaring a state variable with `useState()`, we'll come back to it [at the bottom of this page](#tip-what-do-square-brackets-mean).

### Tip: What do Square Brackets Mean?

You might have noticed the square brackets when we declare a state variable:

```jsx
const [count, setCount] = useState(0);
```

The names on the left aren't a part of the `useState()` Hook. You can name your own state variables:

```jsx
const [fruit, setFruit] = useState("banana");
```

This JavaScript syntax is called ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). It means that we're making two new variables `fruit` and `setFruit`, where `fruit` is set to the first value returned by `useState`, and `setFruit` is the second. It is equivalent to this code:

```jsx
const fruitStateVariable = useState("banana"); // Returns a pair
const fruit = fruitStateVariable[0]; // First item in a pair
const setFruit = fruitStateVariable[1]; // Second item in a pair
```

> We don't recommend using it in most cases. It is mostly useful for the rare cases where you might want to name the state variables, like passing `useState()` to a custom Hook.

## Using the State Hook

In the examples above, we only called `useState()` to add some local state to a function component. However, `useState()` is also handy for adding **mutable** values to React components — just like we can use `this.state` in classes.

Let's take this `FriendStatus` component as an example:

```jsx
import { useState, useEffect } from "react";

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

> This example renders a different status depending on whether a friend is online or not. We will explain why `useState` and `useEffect` let us track the `friend.isOnline` value over time below.

### Declaring multiple state variables

You can use the State Hook more than once in a single component:

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
}
```

> The [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) syntax lets us give different names to the state variables we declared by calling `useState`. These names aren't a part of the `useState` Hook itself. Instead, React assumes that if you call `useState` many times, you do it in the same order during every render.

### But what is a Hook?

In the [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html) page, we've learned that Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

We also learned that Hooks are **composable**. Hooks are a way to reuse stateful logic, not state itself. In other words, you can **create your own Hooks** to reuse stateful behavior between different components. We'll look at this topic in detail in the [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html) page.

### Tip: Using Multiple State Variables

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give _different_ names to different state variables if we want to use more than one:

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

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSurnameChange(e) {
    setSurname(e.target.value);
  }

  return (
    <>
      <input value={name} onChange={handleNameChange} />
      <input value={surname} onChange={handleSurnameChange} />
      <p>
        Hello, {name} {surname}
      </p>
      <p>Window width: {width}</p>
    </>
  );
}
```

## Extracting a Custom Hook

> To learn more on custom Hooks, check out the **_React Docs_** [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html) page.

### Example 1: Using a Custom Hook

Let's see how we can use the `useFriendStatus` Hook we defined in the previous section in a different component:

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

### Example 2: Using a Custom Hook

```jsx
// useDarkMode.jsx
import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem
        ? JSON.parse(item)
        : initialValue;
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.log(err);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme");
  const isEnabled = typeof enabledState === "undefined" && enabled;

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
```

```jsx
// App.jsx
const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun side="24" className="top-navigation-icon" />
      ) : (
        <FaMoon side="24" className="top-navigation-icon" />
      )}
    </span>
  );
};
```

### Tip: Pass Information Between Hooks

We've learned that Hooks let us split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data). This is useful for readability, and to help us think about each piece in isolation.

However, it's also useful to be able to share stateful logic between them. For example, `FriendStatus` and `FriendListItem` components might both need to know whether a friend is online. We could extract a `useFriendStatus` Hook from `FriendStatus`, but we don't want to duplicate the stateful logic between the two. Hooks let us _share_ Hooks logic between components:

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}
```

## `useContext`

Sometimes we want to pass data through the component tree without having to pass the props down manually at every level. Examples include a locale preference, or UI theme. In these cases, we recommend creating a context (with `React.createContext`) whose `value` is the current data we want to share.

We'll create a theme context containing a `theme` property. We'll pass a `theme` to the context provider to determine its color in the component tree below:

```jsx
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
```

The ThemedButton component receives the theme context from its parent (Toolbar) and uses it to style its button:

```jsx
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <Button theme={theme} />;
}
```

## `useRef`

> To learn more on `useRef`, check out the **_React Docs_** [useRef](https://reactjs.org/docs/hooks-reference.html#useref) page.

### Example: Using useRef

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## `useEffect`

> The `useEffect` Hook lets you perform side effects in function components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.

> `useEffect` runs after every render, including the first render.

> To learn more on `useEffect`, check out the **_React Docs_** [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) page.

### Example: Using useEffect

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <>
      <h1>{props.friend.name}</h1>
      <h2>{isOnline ? "Online" : "Offline"}</h2>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
}
```

## `useReducer`

> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` also lets you optimize performance for components that trigger deep updates because you can pass `dispatch` down instead of callbacks.

> To learn more on `useReducer`, check out the **_React Docs_** [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) page.

### Example: Using useReducer

```jsx
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return init(action.payload);
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: "reset", payload: initialCount })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```
