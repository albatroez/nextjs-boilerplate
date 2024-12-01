# Demo
https://nextjs-boilerplate-jzielinski.vercel.app/

# About
In [Home](app/page.tsx) you can find the menu items defined as local state. Functions are passed to MenuItemForm view to create items.
Then these are displayed by ItemList or more importantly the Item component instances.
Each Item component defines its own state to control descendant items and renders them again using ItemList which allows for recursive creation of items.

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
