import { GET_ALL_POSTS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import MutationProvider from "providers/MutationProvider"
import ErrorBoundary from "components/commons/ErrorBoundary"
import Button from "components/commons/Button"
import { css } from "styled-system/css"

export default function DeletePostBox({ postId }: { postId: string }) {
  const { presenters } = useDependencies()

  return (
    <div
      className={css({
        margin: "10px 0"
      })}
    >
      <ErrorBoundary>
        <MutationProvider
          mutationFn={() => {
            return presenters.post.deletePost(postId)
          }}
          invalidateQueryKeys={[[GET_ALL_POSTS]]}
          loadingComponent={<div>Loading...</div>}
        >
          <Button text="Delete" />
        </MutationProvider>
      </ErrorBoundary>
    </div>
  )
}
