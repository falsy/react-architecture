import IComment from "domains/entities/interfaces/IComment"
import IUserInfoVO from "domains/vos/UserInfoVO"
import IPost, { IPostParams } from "./interfaces/IPost"

export default class Post implements IPost {
  readonly id: string
  title: string
  content: string
  readonly author: IUserInfoVO
  readonly comments: IComment[]
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(params: IPostParams) {
    this.id = params.id
    this.title = params.title
    this.content = params.content
    this.author = params.author
    this.comments = params.comments
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  updatePost(title: string, content: string) {
    this.title = title
    this.content = content
  }
}
