---
title: React Syntax
description: React Syntax - 2
layout: ../../layouts/MainLayout.astro
---

## *Writing JSX*

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

JSX: Putting markup into JavaScript 
The Web has been built on HTML, CSS, and JavaScript. For many years, web developers kept content in HTML, design in CSS, and logic in JavaScript—often in separate files! Content was marked up inside HTML while the page’s logic lived separately in JavaScript:

```html 
<!-- index.html -->
<div>
    <h1>My non-React App</h1>
    <form></form>
<div>

``` 
```js
// index.js
isLoggedIn() {...}
onClick() {...}
onSubmit() {...}
```

But as the Web became more interactive, logic increasingly determined content. JavaScript was in charge of the HTML! This is why in React, rendering logic and markup live together in the same place—components.

```jsx
// Form.js React component
Form() {
    onClick() {...}
    onSubmit() {...}

    <form onSubmit>
    <input onClick/>
    <input onClick/>
    </form>
}
```
Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information. The best way to understand this is to convert some HTML markup to JSX markup.

**_~JSX and React are the same thing~_**

JSX and React are _**two separate things**_. They’re often used together, but you can use them independently of each other. _**JSX is a syntax extension**_, while _**React is a JavaScript library**_.

## _JSX Rules_

***There are three absolute rules to know when writing JSX***

1. Return a single root element
2. Close all the tags
3. camelCase ~all~ most of the things!

**Finished Result**

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
```

Dont worry if you dont get it yet! Most of the times, React’s on-screen error messages will help you find where the problem is. Give them a read if you get stuck!
