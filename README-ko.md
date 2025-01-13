# React with Clean Architecture

`도메인 주도 디자인(DDD: Domain-driven Design)`의 원칙과 `클린 아키텍처`를 기반으로 하는 React 아키텍처에 대한 작은 아이디어 프로젝트입니다. 클린 아키텍처의 핵심 원칙인 `프레임워크 독립성`을 최대한 유지하기 위하여 주요 도메인 로직과 비즈니스 규칙은 프레임워크와 무관하게 작성하고 UI 레이어에 한해서만 React에 의존하도록 설계하였습니다.

이전의 프로젝트[clean-architecture-with-typescript](https://github.com/falsy/clean-architecture-with-typescript)와의 중복을 피하기 위해서 DDD나 클린 아키텍처에 대한 이야기보다는 보편적으로 많이 사용되는 React 기술 스택 기반의 설계를 중심으로 이야기합니다.

이 프로젝트에서는 Vite의 `mock-server`를 활용하여 글 목록을 출력하거나 추가 또는 삭제하는 아주 간단한 기능만 가지고 있습니다. 이는 가볍게 전체적인 프로젝트의 구성이나 동작을 확인할 수 있으며 동시에 신규 프로젝트의 보일러 플레이트 코드로 사용을 생각하며 만들어졌습니다.

## Languages

- [English](https://github.com/falsy/react-width-clean-architecture)
- [한글](https://github.com/falsy/react-width-clean-architecture/blob/main/README-ko.md)

## Use Stack

TypeScript, Vite, React, Jotai, Panda CSS, Axios, ESLint, Jest, RTL, Cypress, Github Actions

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

프로젝트의 디렉토리 구조는 Clean Architecture의 계층을 따라 간단하고 명확하게 설계되었습니다. 구조는 세 가지 주요 부분인 `domains`, `adapters`, `frameworks`로 나뉘며, 이 순서대로 더 높은 수준의 추상화를 나타냅니다. `frameworks` 계층은 `pages`, `providers`, `containers`, `components`로 더 세분화됩니다.

- `providers`: `Context`와 같이 특정 데이터를 제공하는 데 초점을 맞춘 구성 요소를 포함합니다.
- `containers`: 내부 상태를 유지하고 사용하는 구성 요소를 포함합니다.
- `components`: props를 사용하여 뷰를 렌더링하는 데 초점을 맞춘 구성 요소를 포함합니다.

디렉토리 내의 구성 요소 수가 늘어나고 복잡해지면 도메인별 디렉토리로 더 정리됩니다. 여러 도메인에서 공유되는 구성 요소는 `commons` 디렉토리에 배치됩니다. 샘플 프로젝트에서 구성 요소는 `commons` 디렉토리와 `post`와 같은 도메인별 디렉토리를 포함하는 `components` 디렉토리 내에 정리됩니다.

> 작고 간단한 샘플 프로젝트에서 디렉토리 구조는 `pages`, `providers`, `containers`, `components`가 있는 첫 번째 레벨과 `commons` 및 도메인별 디렉토리(예: `post`, `comment` 등)가 있는 두 번째 레벨로 나뉩니다. 그러나 더 크고 일반적인 프로젝트에서는 컴포넌트를 두 번째 레벨 내에서 `sections`, `boxes`, `items`와 같은 세 번째 레벨로 세분화하여 더욱 세부적으로 구성할 수 있습니다.

> 이 `frameworks` 레이어 디렉토리 구조는 단순한 예일 뿐입니다. 일반 프로젝트의 frameworks 디렉토리 구조는 프로젝트 요구 사항이나 개발 팀의 선호도에 따라 자유롭게 조정할 수 있습니다.

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

## Run Project

### 설치

```
yarn
```

### Panda CSS 설치

```
yarn panda
```

### 실행

```
yarn start
```

## 테스트

### 단위 테스트

```
yarn test
```

### E2E 테스트

```
yarn cypress
```

## Thank You!

많은 관심에 감사드립니다. 🙇‍♂️
