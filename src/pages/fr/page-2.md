---
title: React Syntaxe
description: React Syntaxe - 2
layout: ../../layouts/MainLayout.astro
---

<!-- traduire la page en français -->

## *Écrire JSX*

JSX est une extension de syntaxe pour JavaScript qui vous permet d'écrire un balisage de type HTML dans un fichier JavaScript. Bien qu'il existe d'autres façons d'écrire des composants, la plupart des développeurs React préfèrent la concision de JSX, et la plupart des bases de code l'utilisent.

JSX : mettre du balisage dans JavaScript
Le Web a été construit sur HTML, CSS et JavaScript. Pendant de nombreuses années, les développeurs Web ont conservé le contenu en HTML, la conception en CSS et la logique en JavaScript, souvent dans des fichiers séparés ! Le contenu était balisé dans HTML tandis que la logique de la page vivait séparément dans JavaScript :
```html 
<!-- index.html -->
<div>
    <h1>Mon App sans React</h1>
    <form></form>
<div>

``` 
```js
// index.js
isLoggedIn() {...}
onClick() {...}
onSubmit() {...}
```

Mais à mesure que le Web devenait plus interactif, la logique déterminait de plus en plus le contenu. JavaScript était en charge du HTML ! C'est pourquoi dans React, rendre la logique et le balisage cohabitent au même endroit : les composants.

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
Chaque composant React est une fonction JavaScript qui peut contenir du balisage que React affiche dans le navigateur. Les composants React utilisent une extension de syntaxe appelée JSX pour représenter ce balisage. JSX ressemble beaucoup à HTML, mais il est un peu plus strict et peut afficher des informations dynamiques. La meilleure façon de comprendre cela est de convertir certains balisages HTML en balisages JSX.

**_~JSX et React sont la même chose~_**

JSX et React sont _**deux choses distinctes**_. Ils sont souvent utilisés ensemble, mais vous pouvez les utiliser indépendamment les uns des autres. _**JSX est une extension de syntaxe**_, tandis que _**React est une bibliothèque JavaScript**_.

## _Règles JSX_

***Il y a trois règles absolues à connaître lors de l'écriture de JSX***

1. Renvoie un seul élément racine
2. Fermez toutes les balises
3. camelCase ~toutes~ la plupart des choses!

**Résultat Fini**

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Todos d'Hedy Lamarr</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Inventer de nouveaux feux de circulation</li>
        <li>Répéter une scène de film</li>
        <li>Améliorer la technologie du spectre</li>
      </ul>
    </>
  );
```
Ne vous inquiétez pas si vous ne l'obtenez pas encore ! La plupart du temps, les messages d'erreur à l'écran de React vous aideront à trouver où se situe le problème. Lisez-les si vous êtes coincé!

