import { IRequestPostParams } from "domains/aggregates/interfaces/IPost"
import IPostDTO from "domains/dtos/interfaces/IPostDTO"
import IPostRepository from "domains/repositories/interfaces/IPostRepository"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import UserInfoVO from "domains/vos/UserInfoVO"
import PostDTO from "adapters/dtos/PostDTO"

export default class PostRepository implements IPostRepository {
  private client: IClientHTTP

  constructor(client: IClientHTTP) {
    this.client = client
  }

  async getPosts(): Promise<IPostDTO[]> {
    const { data } = await this.client.get<IPostDTO[]>("/api/posts")
    return data.map((post) => {
      return new PostDTO({
        id: post.id,
        title: post.title,
        content: post.content,
        author: new UserInfoVO(post.author),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      })
    })
  }

  async getPost(postId: string): Promise<IPostDTO> {
    const { data } = await this.client.get<IPostDTO>(`/api/posts/${postId}`)

    return new PostDTO({
      id: data.id,
      title: data.title,
      content: data.content,
      author: new UserInfoVO(data.author),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

  async createPost(params: IRequestPostParams): Promise<boolean> {
    const { data } = await this.client.post<boolean>("/api/posts", params)

    return data
  }

  async editPost(postId: string, params: IRequestPostParams): Promise<boolean> {
    const { data } = await this.client.put<boolean>(
      `/api/posts/${postId}`,
      params
    )

    return data
  }

  async deletePost(postId: string): Promise<boolean> {
    const { data } = await this.client.delete<boolean>(`/api/posts/${postId}`)

    return data
  }
}
