# React with Clean Architecture

`도메인 주도 디자인(DDD: Domain-driven Design)`의 원칙과 `클린 아키텍처`를 기반으로 하는 React 아키텍처에 대한 작은 아이디어 프로젝트입니다. 클린 아키텍처의 핵심 원칙인 `프레임워크 독립성`을 최대한 유지하기 위하여 주요 도메인 로직과 비즈니스 규칙은 프레임워크와 무관하게 작성하고 UI 레이어에 한해서만 React에 의존하도록 설계하였습니다.

이전의 프로젝트[clean-architecture-with-typescript](https://github.com/falsy/clean-architecture-with-typescript)와의 중복을 피하기 위해서 DDD나 클린 아키텍처에 대한 설명보다는 간단한 샘플 프로젝트를 기반의 React 아키텍처를 중점으로 이야기합니다.

## Languages

- [English](https://github.com/falsy/react-width-clean-architecture)
- [한글](https://github.com/falsy/react-width-clean-architecture/blob/main/README-ko.md)

## Use Stack

TypeScript, Webpack, React, Zustand, TanStack Query, PandaCSS, class-validator, Axios, Jest, React Testing Library

## Directory Structure

```
/src
├─ domains
│  ├─ entities
│  ├─ useCases
│  ├─ dtos
│  └─ vos
├─ adapters
│  ├─ presenters
│  ├─ repositories
│  ├─ infrastructures
│  ├─ dtos
│  └─ vms
├─ providers
│  ├─ commons
│  │  └─ networks
│  └─ ...
├─ containers
│  ├─ commons
│  └─ ...
├─ components
│  ├─ commons
│  └─ ...
├─ constants
├─ di
├─ hooks
└─ pages
   └─ ...
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
