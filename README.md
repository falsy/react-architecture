# React with Clean Architecture

This is a small idea project that applies the principles of `Domain-driven Design (DDD)` and `Clean Architecture` to a React architecture. To adhere to the core principle of Clean Architecture, `framework independence`, all major domain logic and business rules are designed to be independent of any specific framework, while only the UI layer relies on React.

This project implements simple functionality for displaying, adding, and deleting posts using Vite's `mock-server`. It is designed to provide a quick way to understand the overall structure and operation of the project, and it can also be used as a boilerplate code for new projects.

#### ⚠️ Discontinued (2025-01-13)

> This project has been discontinued due to significant overlap with the "[clean-architecture-with-typescript](https://github.com/falsy/clean-architecture-with-typescript)" project. Future updates will only be provided through the "clean-architecture-with-typescript" repository.

#### Note.

> \+ My English is not perfect, so please bear with me.

## Languages

- [English](https://github.com/falsy/react-width-clean-architecture)
- [한글](https://github.com/falsy/react-width-clean-architecture/blob/main/README-ko.md)

## Use Stack

TypeScript, Vite, React, Jotai, Tailwind CSS, Axios, ESLint, Jest, RTL, Cypress, GitHub Actions

## Directory Structure

```
/src
├─ constants
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
│  ├─ repositories
│  ├─ infrastructures
│  ├─ dtos
│  └─ vms
├─ di
└─ frameworks
   ├─ contexts
   ├─ hooks
   └─ components
      ├─ pages
      ├─ templates
      ├─ organisms
      ├─ molecules
      └─ atoms
```

The directory structure is designed to be simple and clear, following the layers of Clean Architecture.  
The project is divided into three main layers: `domains`, `adapters`, and `frameworks`. The UI elements in the `frameworks` layer are further organized within the `components` directory based on the "[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)" methodology.

## Dependency Injection

The `di` function, defined in the `di` directory, injects dependencies for each layer and returns a `useCases` object with all dependencies properly injected.

```ts
import { API_URL } from "constants/networks"
import ClientHTTP from "adapters/infrastructures/ClientHTTP"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"

export default function di() {
  const clientHTTP = new ClientHTTP(API_URL)
  const repositories = repositoriesFn({ clientHTTP })
  const useCases = useCasesFn(repositories)

  return useCases
}
```

In the sample code, the fetch API for HTTP communication is encapsulated into a class (ClientHTTP) and directly injected into the repositories. However, if you need to connect to other external services besides the fetch API, you can define an infrastructures function (as shown in the example) and inject it into the repositories.

```ts
import infrastructuresFn from "./infrastructures"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"

export default function di() {
  const infrastructures = infrastructuresFn()
  const repositories = repositoriesFn(infrastructures)
  const useCases = useCasesFn(repositories)

  return useCases
}
```

In previous versions, the Presenters layer was also defined and injected with dependencies, resulting in a fully injected Presenters object. However, now the Presenters layer role is fulfilled by React Hooks, which use the useCases object injected via the di function.

## Presenters

The Presenters layer for each domain is implemented using React Hooks and the global state management library [Jotai](https://jotai.org/).

```ts
import { useCallback, useMemo, useTransition } from "react"
import { atom, useAtom } from "jotai"
import useCases from "di/index"
import IPost from "domains/aggregates/interfaces/IPost"

const PostsAtoms = atom<IPost[]>([])

export default function usePosts() {
  const di = useMemo(() => useCases(), [])

  const [posts, setPosts] = useAtom<IPost[]>(PostsAtoms)
  const [isPending, startTransition] = useTransition()

  const getPosts = useCallback(async () => {
    startTransition(async () => {
      const resPosts = await di.post.getPosts()
      setPosts(resPosts)
    })
  }, [di.post, setPosts])

  ...

  return {
    isPending,
    posts,
    getPosts,

    ...
  }
}
```

As shown in the sample code, usePosts is implemented as a Presenter for the Post domain. It uses the `Atom(PostsAtoms)` from Jotai for global state management and provides various methods for handling posts, using the useCases object injected by the di function.

```ts
import { useCallback, useMemo, useOptimistic, useTransition } from "react"
import { atom, useAtom } from "jotai"
import useCases from "di/index"
import IPost from "domains/aggregates/interfaces/IPost"

const PostsAtoms = atom<IPost[]>([])

export default function usePosts() {
  const di = useMemo(() => useCases(), [])

  const [posts, setPosts] = useAtom<IPost[]>(PostsAtoms)
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts)
  const [isPending, startTransition] = useTransition()

  ...

  const deletePost = useCallback(
    async (postId: string) => {
      startTransition(async () => {
        setOptimisticPosts((prevPosts) => {
          return prevPosts.filter((post) => post.id !== postId)
        })

        try {
          const isSucess = await di.post.deletePost(postId)
          if (isSucess) {
            const resPosts = await di.post.getPosts()
            setPosts(resPosts)
          }
        } catch (e) {
          console.error(e)
        }
      })
    },
    [di.post, setOptimisticPosts, setPosts]
  )

  return {
    isPending,
    posts: optimisticPosts,
    getPosts,
    deletePost,
    ...
  }
}
```

Additionally, you can use useOptimistic, introduced in React 19, for optimistic updates as shown in the above example.

## Run Project

### Install

```
yarn install
```

### Run

```
yarn start
```

## Tests

### Unit Tests

```
yarn test
```

### E2E Tests

```
yarn cypress
```

## Thank You!

I'm grateful for all the support and interest 🙇‍♂️
