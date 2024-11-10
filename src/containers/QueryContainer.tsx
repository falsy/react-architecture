import { cloneElement } from "react"
import { useQuery } from "@tanstack/react-query"

export default function QueryContainer<TData, TVariables>({
  children,
  queryKey,
  queryFn,
  variables,
  loadingComponent = <></>,
  errorComponent = <></>
}: {
  children: JSX.Element
  queryKey: string
  queryFn: (variables?: TVariables) => Promise<TData>
  variables?: TVariables
  loadingComponent?: JSX.Element
  errorComponent?: JSX.Element
}) {
  const query = useQuery({
    queryKey: [queryKey, variables],
    retry: 1,
    queryFn: () => {
      return queryFn(variables)
    }
  })

  const response = query.data || undefined

  if (query.status === "error") {
    console.error(query.error)
  }

  return (
    <>
      {cloneElement(children, { response })}
      {query.status === "pending" && loadingComponent}
      {query.status === "error" && errorComponent}
    </>
  )
}
