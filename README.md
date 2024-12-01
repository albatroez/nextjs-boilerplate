# Demo
https://nextjs-boilerplate-jzielinski.vercel.app/

# About
In [Home](app/page.tsx) you can find the menu items defined as local state. Functions are passed to [MenuItemForm](components/MenuItemForm.tsx) view to create items.
Then these are displayed by [ItemList](components/ItemList.tsx) or more importantly the [Item](components/item/Item.tsx) component instances.
Each [Item](components/item/Item.tsx) component defines its own state to control descendant items and renders them again using [ItemList](components/ItemList.tsx) which allows for recursive creation of items.
Drag and drop is implemented by using seperate DnDContexts

# Run Locally

## Prerequisites
node >= 20.x

[pnpm](https://pnpm.io/installation) >= 9.x

Install dependencies:

```bash
pnpm install
```
Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
