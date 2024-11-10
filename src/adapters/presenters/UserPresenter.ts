import IUserUseCase from "domains/useCases/interfaces/IUserUseCase"
import IUserPresenter from "./interfaces/IUserPresenter"

export default class UserPresenter implements IUserPresenter {
  private userUseCase: IUserUseCase

  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase
  }

  getUser() {
    return this.userUseCase.getUser()
  }
}
