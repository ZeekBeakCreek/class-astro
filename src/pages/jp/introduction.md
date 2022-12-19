---
# translate section to japanese
title: introduction
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

## *Reactとは*

ReactはJavaScriptのUIを作成するためのライブラリです。

Reactはシングルページアプリケーションを作成するために使用されます。

Reactを使用すると、再利用可能なUIコンポーネントを作成できます。

## *はじめに*

Reactの環境をセットアップする

まず、Node.jsとnpmをインストールする必要があります。

Node.jsは、ブラウザの外でJavaScriptコードを実行できるJavaScriptの実行環境です。

npmはNode.jsのパッケージマネージャーです。

Node.jsとnpmをすでにインストールしている場合は、次のコマンドを実行してNode.jsとnpmのバージョンを確認できます。

```
node -v
npm -v
```

Node.jsとnpmがインストールされていない場合は、Node.jsの公式サイトからインストールできます。

Node.jsとnpmをインストールしたら、`create-react-app`を使用してReactアプリケーションを作成できます。

以前にcreate-react-appをグローバルにインストールしたことがある場合は、npxが常に最新の`create-react-app`を使用するようにするために、パッケージをアンインストールすることをお勧めします。

アンインストールするには、次のコマンドを実行します: `npm uninstall -g create-react-app`。

次のコマンドを実行して、my-react-appという名前のReactアプリケーションを作成します:

```
npx create-react-app my-react-app
```

create-react-appは、Reactアプリケーションを実行するために必要なすべてを設定します。

Reactアプリケーションを実行する

Reactアプリケーションを実行するには、次のコマンドを実行します:

```
cd my-react-app
npm start
```

これで、Reactアプリケーションが実行されます。

Reactアプリケーションをビルドする

Reactアプリケーションをビルドするには、次のコマンドを実行します:

```
npm run build
```
[卵](/jp/egg)