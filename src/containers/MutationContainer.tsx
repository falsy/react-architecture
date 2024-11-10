import { cloneElement } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function MutationContainer<TData, TVariables>({
  children,
  mutationFn,
  loadingComponent = <></>,
  errorComponent = <></>,
  invalidateQueryKeys = []
}: {
  children: JSX.Element
  mutationFn: (variables: TVariables) => Promise<TData>
  loadingComponent?: JSX.Element
  errorComponent?: JSX.Element
  invalidateQueryKeys?: string[][]
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (params: TVariables) => mutationFn(params),
    onSuccess: () => {
      Promise.all(
        invalidateQueryKeys.map((key) =>
          queryClient.invalidateQueries({ queryKey: key })
        )
      )
    }
  })

  const action = (requestParams: TVariables) => {
    mutation.mutate(requestParams)
  }

  const response = mutation.data || undefined

  return (
    <>
      {cloneElement(children, { response: response, action })}
      {mutation.status === "pending" && loadingComponent}
      {mutation.status === "error" && errorComponent}
    </>
  )
}
