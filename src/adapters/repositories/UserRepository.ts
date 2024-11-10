import IUserDTO from "domains/dtos/interfaces/IUserDTO"
import IUserRepository from "domains/repositories/interfaces/IUserRepository"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import UserDTO from "adapters/dtos/UserDTO"

export default class UserRepository implements IUserRepository {
  private client: IClientHTTP

  constructor(client: IClientHTTP) {
    this.client = client
  }

  async getUser(): Promise<IUserDTO> {
    const { data } = await this.client.get<IUserDTO>("/api/users")

    return new UserDTO(data)
  }
}
