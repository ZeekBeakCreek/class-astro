---
title: Event Handling
description: Event Handling - 6
layout: ../../layouts/MainLayout.astro
---

React lets you add _event handlers_ to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on. React lets you add event handlers to JSX elements using the camelCase naming convention for events, like `onClick` or `onMouseOver`.

## Adding event handlers

To add an event handler to an element, you pass a function as the value of the event handler attribute. For example, to add a click handler to a button, you would pass a function to the `onClick` attribute:

```jsx
<button onClick={handleClick}>Click me</button>
```

You can make it show a message when a user clicks by following these three steps:

- Declare a function called `handleClick` inside your `Button` component.
- Implement the logic inside that function (use `alert` to show the message).
- Add `onClick={handleClick}` to the `<button>` JSX.

```jsx
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
- Are usually defined inside your components.
Have names that start with handle, followed by the name of the event.
- The function passed to the event handler attribute will be called whenever the event is triggered. For example, when the user clicks the button, the `handleClick` function will be called.

Alternatively, you can define an event handler inline in the JSX:

```jsx
<button onClick={() => alert('You clicked me!')}>Click me</button>
```

## Reading props in event handlers

Event handlers can access the props of the component they are defined in. For example, you can pass a `name` prop to the `Button` component and use it in the event handler:

```jsx
export default function Button(props) {
  function handleClick() {
    alert('You clicked ' + props.name);
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

## Passing event handlers as props

Event handlers can be passed as props to child components. For example, you can pass the `handleClick` function to the `Button` component:

```jsx
export default function Button(props) {
  return (
    <button onClick={props.onClick}>
      Click me
    </button>
  );
}
```

```jsx
export default function App() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <Button onClick={handleClick} />
  );
}
```


