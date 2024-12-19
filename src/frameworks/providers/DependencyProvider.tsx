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
