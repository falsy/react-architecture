# React with Clean Architecture

This is a small idea project based on the principles of `Domain-Driven Design(DDD)` and `Clean Architecture` for a React architecture. To maintain the core principle of `framework independence` in Clean Architecture, the primary domain logic and business rules are written independently of any framework, with only the UI layer being designed to rely on React.

To avoid redundancy with a previous project, [clean-architecture-with-typescript](https://github.com/falsy/clean-architecture-with-typescript), the focus is on a commonly used React tech stack rather than an discussion of DDD or Clean Architecture.

This project utilizes Vite's `mock-server` to implement a very simple functionality for displaying, adding, or deleting a list of posts. It serves as a lightweight way to review the overall project structure and functionality while also being designed as a boilerplate codebase for new projects.

#### Note.

> \+ My English is not perfect, so please bear with me.

## Languages

- [English](https://github.com/falsy/react-width-clean-architecture)
- [한글](https://github.com/falsy/react-width-clean-architecture/blob/main/README-ko.md)

## Use Stack

TypeScript, Vite, React, TanStack Query, Panda CSS, Axios, ESLint, Jest, RTL, Cypress

## Directory Structure

```
/src
├─ constants
├─ di
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
└─ frameworks
   ├─ hooks
   ├─ pages
   ├─ providers
   ├─ containers
   └─ components
```

The directory structure of the project is designed to be simple and clear, following the layers of Clean Architecture. The structure is divided into three main parts: `domains`, `adapters`, and `frameworks`, representing higher levels of abstraction in that order. The `frameworks` layer is further categorized into `pages`, `providers`, `containers`, and `components`.

- `providers`: Contains components focused on providing specific data, such as `Context`.
- `containers`: Contains components that maintain and use internal state.
- `components`: Includes components that focus on rendering views using props.

When the number of components within a directory grows and becomes complex, they are further organized into domain-specific directories. Components that are shared across multiple domains are placed in a `commons` directory. In the sample project, components are organized within the `components` directory, which contains a `commons` directory and domain-specific directories such as `post`.

> In the sample project, which is small and simple, the directory structure is divided into a first level with `pages`, `providers`, `containers`, and `components`, and a second level under these, with `commons` and domain-specific directories (e.g., `post`, `comment`, etc.). However, in larger, more general projects, components can be further subdivided within the second level into a third level, such as `sections`, `boxes`, `items`, for even more granular organization.

> This `frameworks` layer directory structure is just a simple example. The structure of the frameworks directory in a general project can be freely adjusted depending on the project’s requirements or the preferences of the development team.

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

> The component structure for network communication is not closely related to the Clean Architecture. It is merely a small idea for organizing a component-centric project.

Using `TanStack Query` and Higher-Order Component(HOC), we have reduced dependence on UI components and TanStack Query and made it possible for components to effectively implement functions in a simple configuration.

```ts
...

export default function PostSection() {
  const { presenters } = useDependencies()

  return (
    <>
      <section>
        <Title text="Posts" />
        <ErrorBoundary>
          <QueryProvider
            queryKey={GET_ALL_POSTS}
            queryFn={() => presenters.post.getSummaryPosts()}
            loadingComponent={<div>Loading...</div>}
            errorComponent={<div>Error...</div>}
          >
            <PostList />
          </QueryProvider>
        </ErrorBoundary>
      </section>
      <Divide />
      <CreatePostSection />
    </>
  )
}
```

```ts
...

export default function PostList({ response }: { response?: IPost[] }) {
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

### Install Panda CSS

```
yarn panda
```

### Run

```
yarn start
```

## Test

### Unit Test

```
yarn test
```

### E2E Test

```
yarn cypress
```

## Thank You!

I'm grateful for all the support and interest 🙇‍♂️
