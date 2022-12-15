---
title: React Components
description: React Components - 3
layout: ../../layouts/MainLayout.astro
---
_Components_ are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!

## Components: UI Building Blocks

Components: UI building blocks 
On the Web, HTML lets us create rich structured documents with its built-in set of tags like `<h1>` and
 `<li>` :

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

This markup represents this article `<article>`, its heading `<h1>`, and an (abbreviated) table of contents as an ordered list `<ol>`. Markup like this, combined with CSS for style, and JavaScript for interactivity, lies behind every sidebar, avatar, modal, dropdown—every piece of UI you see on the Web.

React lets you combine your markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app. The table of contents code you saw above could be turned into a `<TableOfContents />` component you could render on every page. Under the hood, it still uses the same HTML tags like `<article>`, `<h1>`, etc.

Just like with HTML tags, you can compose, order and nest components to design whole pages. For example, the documentation page you’re reading is made out of React components:

```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```


## Defining a Component

Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: **a React component is a JavaScript function that you can sprinkle with markup**. Here’s what that looks like (you can edit the example below):

```jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

**Capital letters in the beggining help React differentiate between _JSX_ and _HTML_**. However, When it comes to using the component, you can use it in a JSX expression: `<Profile />`. This is a self-closing tag, which means that it doesn’t have any children. You can also use it in a JavaScript expression: `const element = <Profile />;`.

## Steps for Creaing a Component

### Step 1: Export the component 

The `export default` prefix is a _standard JavaScript syntax_ (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in _Importing and Exporting Components!_)

### Step 2: Define the function

With `function Profile() { }` you define a JavaScript function with the name Profile.

### Step 3: Add markup 

The component returns an `<img />` tag with `src` and `alt` attributes. `<img />` is written like HTML, but it is actually JavaScript under the hood! This syntax is called _**JSX**_, and it lets you embed markup inside JavaScript.

Return statements can be written all on one line, as in this component:

```jsx 
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

But if your markup isn’t all on the same line as the return keyword, you must wrap it in a pair of parentheses like this:

```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```
