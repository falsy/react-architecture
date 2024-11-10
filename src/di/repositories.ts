import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import PostRepository from "adapters/repositories/PostRepository"
import CommentRepository from "adapters/repositories/CommentRepository"
import UserRepository from "adapters/repositories/UserRepository"
import IRepositories from "./interfaces/IRepositories"

export default ({ clientHTTP }: { clientHTTP: IClientHTTP }): IRepositories => {
  return {
    post: new PostRepository(clientHTTP),
    comment: new CommentRepository(clientHTTP),
    user: new UserRepository(clientHTTP)
  }
}
