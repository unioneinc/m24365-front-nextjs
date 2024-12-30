# Zustand: Overview and Usage Guide

## 1. Zustand Overview

Zustand is a lightweight state management library for React. It provides a simple API for managing state without the boilerplate of other libraries like Redux. Zustand is ideal for projects that require minimal yet effective state management.

---

## 2. Installation

To install Zustand in your project:

```bash
npm install zustand
```

---

## 3. Basic Usage

### Creating a Store

```javascript
import { create } from 'zustand'

// Define a store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))
```

### Using the Store in Components

```javascript
import React from 'react'
import { useStore } from './store'

function Counter() {
  const { count, increment, decrement } = useStore()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

export default Counter
```

---

## 4. API Calls with Zustand

### Handling API Calls

You can manage API calls with Zustand by defining asynchronous actions in your store.

```javascript
const useStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const result = await response.json()
      set({ data: result, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  }
}))
```

### Using the API in Components

```javascript
import React, { useEffect } from 'react'
import useStore from './store'

function App() {
  const { data, isLoading, error, fetchData } = useStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Posts</h1>
      <ul>{data && data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
    </div>
  )
}

export default App
```

---

## 5. Persistent State

### Using the `persist` Middleware

The `persist` middleware allows you to save state to `localStorage` or `sessionStorage`.

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
      name: 'counter-storage' // Key in localStorage
    }
  )
)
```

### Custom Storage Options

```javascript
const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
      name: 'counter-storage',
      storage: {
        getItem: (name) => sessionStorage.getItem(name),
        setItem: (name, value) => sessionStorage.setItem(name, value),
        removeItem: (name) => sessionStorage.removeItem(name)
      }
    }
  )
)
```

---

## 6. Zustand Features and Best Practices

### State Initialization and Reset

```javascript
const useStore = create((set) => ({
  count: 0,
  reset: () => set({ count: 0 })
}))

useStore.persist.clearStorage() // Clear storage and reset state
```

### Selective State Subscription

```javascript
const data = useStore((state) => state.data)
```

### Middleware for Advanced Features

- Persist state to `localStorage` or `sessionStorage`.
- Rehydrate state automatically on app reload.

---

## 7. Summary

Zustand is a simple, flexible state management library that works well for small to medium-sized React projects. Its lightweight design and intuitive API make it a strong alternative to more complex libraries like Redux.

### Key Benefits:

- Minimal boilerplate.
- Easy to manage asynchronous actions.
- Persistent state with `persist`.
- Excellent for modular and scalable applications.
