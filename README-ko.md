# React with Clean Architecture

`도메인 주도 디자인(DDD: Domain-driven Design)`의 원칙과 `클린 아키텍처`를 기반으로 하는 React 아키텍처에 대한 작은 아이디어 프로젝트입니다. 클린 아키텍처의 핵심 원칙인 `프레임워크 독립성`을 최대한 유지하기 위하여 주요 도메인 로직과 비즈니스 규칙은 프레임워크와 무관하게 작성하고 UI 레이어에 한해서만 React에 의존하도록 설계하였습니다.

이전의 프로젝트[clean-architecture-with-typescript](https://github.com/falsy/clean-architecture-with-typescript)와의 중복을 피하기 위해서 DDD나 클린 아키텍처에 대한 이야기보다는 보편적으로 많이 사용되는 React 기술 스택 기반의 설계를 중심으로 이야기합니다.

이 프로젝트에서는 Webpack의 `devServer`를 활용하여 글 목록을 출력하거나 추가 또는 삭제하는 아주 간단한 기능만 가지고 있습니다. 이는 가볍게 전체적인 프로젝트의 구성을 확인할 수 있으며 그리고 신규 프로젝트의 보일러플레이트 코드로 사용을 생각하고 개발하였습니다.

## Languages

- [English](https://github.com/falsy/react-width-clean-architecture)
- [한글](https://github.com/falsy/react-width-clean-architecture/blob/main/README-ko.md)

## Use Stack

TypeScript, Webpack, React, TanStack Query, Panda CSS, Axios, ESLint, Jest, React Testing Library

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

기본적인 디렉토리의 구조는 클린 아키텍처의 레이어와 동일하게 구성하여 단순하고 명확하게 구성하였습니다. UI 레이어의 컴포넌트는 크게 `Route`로 나누어지는 `pages`와 `providers`, `containers`, `components`로 나누어저 있습니다. 이름 그대로 `Context`를 사용하는 Provider 컴포넌트를 위치하는 `providers`와 내부에 상태값을 가지고 사용하는 컴포넌트들은 `containers`, 그리고 단순히 Props 값을 통해 UI를 출력하는 컴포넌트는 `components`에 위치합니다.

각 디렉토리 안에서 컴포넌트가 많아지고 복잡해지는 경우 내부에서는 도메인 별로 디렉토리를 나누고 다양한 도메인에서 함께 사용되는 컴포넌트는 `commons` 디렉토리를 사용하여 구성합니다.

예를 들어, 샘플 프로젝트의 `components` 디렉토리 안에는 `commons` 디렉토리와 `post` 디렉토리를 사용하여 컴포넌트 나누워 위치시켰습니다.

## Dependency Injection

React의 `Context`와 `Provider`, `Hook`을 활용하여 DI를 구성하였습니다.

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

`TanStack Query(React Query)`와 고차 컴포넌트(HOC: Higher-Order Component)를 활용하여 UI의 구성 요소들과 TanStack Query와의 의존성을 낮추고 컴포넌트에서는 단순한 구성으로 효과적으로 기능을 구현할 수 있도록 하였습니다.

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

### 설치

```
yarn
```

### 실행

```
yarn start
```

## Thank You!

많은 관심에 감사드립니다. 🙇‍♂️
