# React with Clean Architecture

This is a small idea project based on the principles of `Domain-Driven Design(DDD)` and `Clean Architecture` for a React architecture. To maintain the core principle of `framework independence` in Clean Architecture, the primary domain logic and business rules are written independently of any framework, with only the UI layer being designed to rely on React.

To avoid redundancy with a previous project, [clean-architecture-with-typescript](https://github.com/falsy/clean-architecture-with-typescript), the focus is on a commonly used React tech stack rather than an discussion of DDD or Clean Architecture.

In this project, Webpack’s `devServer` is used to implement very simple functionality for displaying, adding, and deleting posts. This allows for a lightweight overview of the project structure and has been developed with the idea of serving as boilerplate code for new projects.

#### Note.

> \+ My English is not perfect, so please bear with me.

## Languages

- [English](https://github.com/falsy/react-width-clean-architecture)
- [한글](https://github.com/falsy/react-width-clean-architecture/blob/main/README-ko.md)

## Use Stack

TypeScript, Vite, React, TanStack Query, Panda CSS, Axios, ESLint, Jest, RTL

## Directory Structure

```
/src
├─ domains
│  ├─ aggregates
│  ├─ entities
│  ├─ useCases
│  ├─ repositories
│  │  └─ interfaces
│  ├─ dtos
│  │  └─ interfaces
│  └─ vos
├─ adapters
│  ├─ presenters
│  ├─ repositories
│  ├─ infrastructures
│  ├─ dtos
│  └─ vms
├─ constants
├─ di
├─ hooks
├─ pages
├─ providers
├─ containers
└─ components
```

The basic directory structure is organized simply and clearly, mirroring the layers of Clean Architecture. The UI layer’s components are divided into `pages` based on `Routes`, as well as `providers`, `containers`, and `components`. As the names suggest, `providers` contains Provider components that use `Context`, `containers` are components that manage internal state, and `components` are for purely presentational components that render UI based on Props.

Within each directory, if the components become numerous or complex, directories are further subdivided by domain. Components shared across various domains are organized under a `commons` directory.

For example, in the sample project’s `components` directory, components are separated into a `commons` directory and a `post` directory for better organization.

## Dependency Injection

DI was constructed using React's `Context`, `Provider`, and `Hook`.

### DI

```ts
...

export default function di() {
  const clientHTTP = new ClientHTTP(API_URL)
  const repositories = repositoriesFn({ clientHTTP })
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  return presenters
}
```

### Provider

```ts
import { createContext, ReactNode } from "react"
import di from "di/index"

interface Dependencies {
  presenters: ReturnType<typeof di>
}

export const DependencyContext = createContext<Dependencies | null>(null)

export default function DependencyProvider({
  children
}: {
  children: ReactNode
}) {
  const dependencies = {
    presenters: di()
  }

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  )
}
```

### Hook

```ts
import { useContext } from "react"
import { DependencyContext } from "providers/DependencyProvider"

export default function useDependencies() {
  const dependencies = useContext(DependencyContext)
  if (!dependencies) {
    throw new Error("Dependencies not found in context")
  }
  return dependencies
}
```

## Networks

Using `TanStack Query` and Higher-Order Component(HOC), we have reduced dependence on UI components and TanStack Query and made it possible for components to effectively implement functions in a simple configuration.

```ts
...

export default function PostSection() {
  const { presenters } = useDependencies()

  return (
    <>
      <section>
        <Title text="Posts" />
        <ErrorContainer>
          <QueryContainer
            queryKey={GET_ALL_POSTS}
            queryFn={() => presenters.post.getSummaryPosts()}
            loadingComponent={<div>Loading...</div>}
            errorComponent={<div>Error...</div>}
          >
            <PostList />
          </QueryContainer>
        </ErrorContainer>
      </section>
      <Divide />
      <CreatePostSection />
    </>
  )
}
```

```ts
...

export default function PostList({ response }: { response?: Array<IPost> }) {
  const posts = response || []

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Run Project

### Install

```
yarn
```

### Panda CSS Install

```
yarn panda
```

### Run

```
yarn start
```

## Thank You!

I'm grateful for all the support and interest 🙇‍♂️
