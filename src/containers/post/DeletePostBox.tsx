import { GET_ALL_POSTS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import ErrorContainer from "containers/ErrorContainer"
import MutationContainer from "containers/MutationContainer"
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
      <ErrorContainer>
        <MutationContainer
          mutationFn={() => {
            return presenters.post.deletePost(postId)
          }}
          invalidateQueryKeys={[[GET_ALL_POSTS]]}
          loadingComponent={<div>Loading...</div>}
        >
          <Button text="Delete" />
        </MutationContainer>
      </ErrorContainer>
    </div>
  )
}
