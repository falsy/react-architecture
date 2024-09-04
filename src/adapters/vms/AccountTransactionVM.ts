import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"
import IAccountTransactionVM from "./interfaces/IAccountTransactionVM"

export default class AccountTransactionVM implements IAccountTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly account: IAccountInfoVO
  readonly longTime: number
  readonly date: string

  constructor(params: IAccountTransaction) {
    const date = new Date(params.createdAt)

    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.account = params.account
    this.longTime = date.getTime()
    this.date = this.getParseDate(date)
  }

  private getParseDate(date: Date): string {
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  }
}
