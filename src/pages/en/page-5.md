---
title: State and Lifecycle
description: State and Lifecycle - 5
layout: ../../layouts/MainLayout.astro
---

Effects have a different lifecycle from components. Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it. This cycle can happen multiple times if your Effect depends on props and state that change over time. React provides a linter rule to check that you’ve specified your Effect’s dependencies correctly. This keeps your Effect synchronized to the latest props and state.

## The lifecycle of an Effect 

Every React component goes through the same lifecycle:

- A component mounts when it’s added to the screen.
- A component updates when it receives new props or state. This usually happens in response to an interaction.
- A component unmounts when it’s removed from the screen.

It’s a good way to think about components, but not about Effects. Instead, try to think about each Effect independently from your component’s lifecycle. An Effect describes how to **synchronize an external system** to the current props and state. As your code changes, this synchronization will need to happen more or less often.

To illustrate this point, consider this Effect connecting your component to a chat server:

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```

Your Effect’s body specifies how to start synchronizing:

```jsx
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    //... 
```

The cleanup function returned by your Effect specifies how to stop synchronizing:

```jsx
     // ...
    return () => {
      connection.disconnect();
    };
    // ...
```


Intuitively, you might think that React would start synchronizing when your component mounts and stop synchronizing when your component unmounts. However, this is not the end of the story! Sometimes, it may also be necessary to start and stop synchronizing multiple times while the component remains mounted.

## Recap

- Components can mount, update, and unmount.
- Each Effect has a separate lifecycle from the surrounding component.
- Each Effect describes a separate synchronization process that can start and stop.
- When you write and read Effects, you should think from each individual Effect’s perspective (how to start and stop synchronization) rather than from the component’s perspective (how it mounts, updates, or unmounts).
- Values declared inside the component body are “reactive”.
- Reactive values should re-synchronize the Effect because they can change over time.
- The linter verifies that all reactive values used inside the Effect are specified as dependencies.
- All errors flagged by the linter are legitimate. There’s always a way to fix the code that doesn’t break the rules.