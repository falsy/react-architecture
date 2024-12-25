import "styled-system/styles.css"
import QueryClientProvider from "providers/QueryClientProvider"
import DependencyProvider from "providers/DependencyProvider"
import { Routes } from "./Routes"

export default function App() {
  return (
    <>
      <QueryClientProvider>
        <DependencyProvider>
          <Routes />
        </DependencyProvider>
      </QueryClientProvider>
    </>
  )
}
