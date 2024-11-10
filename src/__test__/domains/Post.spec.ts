import { IPostParams } from "domains/aggregates/interfaces/IPost"
import Post from "domains/aggregates/Post"
import Comment from "domains/entities/Comment"
import IComment from "domains/entities/interfaces/IComment"
import UserInfoVO from "domains/vos/UserInfoVO"
import IUserInfoVO from "domains/vos/UserInfoVO"

describe("Post Entity", () => {
  const mockAuthor: IUserInfoVO = new UserInfoVO({
    id: "user1",
    name: "John Doe"
  })

  const mockComment: IComment = new Comment({
    id: "comment1",
    postId: "post1",
    content: "content",
    author: mockAuthor,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-02")
  })

  const postParams: IPostParams = {
    id: "post1",
    title: "Sample Title",
    content: "Sample content",
    author: mockAuthor,
    comments: [mockComment],
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-02")
  }

  it("should correctly assign parameters to properties", () => {
    const post = new Post(postParams)

    expect(post.id).toBe(postParams.id)
    expect(post.title).toBe(postParams.title)
    expect(post.content).toBe(postParams.content)
    expect(post.author).toBe(postParams.author)
    expect(post.comments).toEqual(postParams.comments)
    expect(post.createdAt).toEqual(postParams.createdAt)
    expect(post.updatedAt).toEqual(postParams.updatedAt)
  })
})
