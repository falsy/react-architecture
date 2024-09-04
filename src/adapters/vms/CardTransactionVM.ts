import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ICardTransactionVM from "./interfaces/ICardTransactionVM"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"
import IFranchise from "adapters/domains/aggregates/entities/interfaces/IFranchise"

export default class CardTransactionVM implements ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise?: IFranchise
  readonly createdAt: string
  readonly card: ICardInfoVO
  readonly longTime: number
  readonly date: string

  constructor(params: ICardTransaction) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    if (params.franchise) this.franchise = params.franchise
    this.card = params.card
    this.longTime = new Date(params.createdAt).getTime()
    this.date = this.getParseDate(new Date(params.createdAt))
  }

  private getParseDate(date: Date): string {
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  }
}
