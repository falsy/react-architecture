import IComment from "domains/entities/interfaces/IComment"
import IUserInfoVO from "domains/vos/interfaces/IUserInfoVO"

export default interface IPost {
  readonly id: string
  title: string
  content: string
  readonly author: IUserInfoVO
  readonly comments: IComment[]
  readonly createdAt: Date
  readonly updatedAt: Date
  updatePost(title: string, content: string): void
}

export interface IPostParams {
  readonly id: string
  readonly title: string
  readonly content: string
  readonly author: IUserInfoVO
  readonly comments: IComment[]
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface IRequestPostParams {
  readonly title: string
  readonly content: string
}
