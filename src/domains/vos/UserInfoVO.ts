import IUserInfoVO, { IUserInfoVOParams } from "./interfaces/IUserInfoVO"

export default class UserInfoVO implements IUserInfoVO {
  readonly id: string
  readonly name: string

  constructor(params: IUserInfoVOParams) {
    this.id = params.id
    this.name = params.name
  }
}
