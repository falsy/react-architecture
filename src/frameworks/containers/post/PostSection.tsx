import { GET_ALL_POSTS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import PostList from "components/post/PostList"
import ErrorBoundary from "../../components/commons/ErrorBoundary"
import QueryProvider from "../../providers/QueryProvider"
import CreatePostSection from "./CreatePostSection"
import Divide from "components/commons/Divide"
import Title from "components/commons/Title"

export default function PostSection() {
  const { presenters } = useDependencies()

  return (
    <>
      <section>
        <Title text="Posts" />
        <ErrorBoundary>
          <QueryProvider
            queryKey={GET_ALL_POSTS}
            queryFn={() => presenters.post.getSummaryPosts()}
            loadingComponent={<div>Loading...</div>}
            errorComponent={<div>Error...</div>}
          >
            <PostList />
          </QueryProvider>
        </ErrorBoundary>
      </section>
      <Divide />
      <CreatePostSection />
    </>
  )
}
