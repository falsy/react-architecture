import { useEffect } from "react"
import clsx from "clsx"
import usePosts from "hooks/usePosts"
import PostBox from "./PostBox"

const PostList = ({ className }: { className?: string }) => {
  const { isPending, posts, getPosts, updatePost, deletePost } = usePosts()

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const handleClickUpdatePost = (
    id: string,
    title: string,
    content: string
  ) => {
    updatePost(id, title, content)
  }

  const handleClickDeletePost = (id: string) => {
    deletePost(id)
  }

  return (
    <div className={clsx(["relative", className])}>
      <h2 className="text-lg pb-2">Post List</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 border border-gray/40 rounded-md text-sm"
          >
            <PostBox
              post={post}
              updatePost={handleClickUpdatePost}
              deletePost={handleClickDeletePost}
            />
          </li>
        ))}
      </ul>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default PostList
