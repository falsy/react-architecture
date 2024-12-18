import { css } from "styled-system/css"
import IPost from "domains/aggregates/interfaces/IPost"
import PostItem from "./PostItem"

export default function PostList({ response }: { response?: IPost[] }) {
  const posts = response || []

  return (
    <div
      className={css({
        background: "#f5f5f5"
      })}
    >
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className={css({
              borderTop: "1px solid #ddd",
              padding: "10px 10px 5px"
            })}
          >
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
