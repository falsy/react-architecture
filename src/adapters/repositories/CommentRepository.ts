import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import CommentDTO from "adapters/dtos/CommentDTO"
import ICommentDTO from "domains/dtos/interfaces/ICommentDTO"
import ICommentRepository from "domains/repositories/interfaces/ICommentRepository"

export default class CommentRepository implements ICommentRepository {
  private client: IClientHTTP

  constructor(client: IClientHTTP) {
    this.client = client
  }

  async getComments(postId: string): Promise<ICommentDTO[]> {
    const { data } = await this.client.get<ICommentDTO[]>(
      `/api/posts/${postId}/comments`
    )

    return data.map((comment) => {
      return new CommentDTO(comment)
    })
  }

  async createComment(postId: string, content: string): Promise<boolean> {
    const { data } = await this.client.post<boolean>(
      `/api/posts/${postId}/comments`,
      {
        content
      }
    )

    return data
  }

  async editComment(commentId: string, content: string): Promise<boolean> {
    const { data } = await this.client.put<boolean>(
      `/api/comments/${commentId}`,
      {
        content
      }
    )

    return data
  }

  async deleteComment(commentId: string): Promise<boolean> {
    const { data } = await this.client.delete<boolean>(
      `/api/comments/${commentId}`
    )

    return data
  }
}
