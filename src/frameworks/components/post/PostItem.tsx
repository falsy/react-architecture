import IPost from "domains/aggregates/interfaces/IPost"
import DeletePostBox from "containers/post/DeletePostBox"

export default function PostItem({ post }: { post: IPost }) {
  return (
    <div>
      <p>title: {post.title}</p>
      <p>content: {post.content}</p>
      <DeletePostBox postId={post.id} />
    </div>
  )
}
