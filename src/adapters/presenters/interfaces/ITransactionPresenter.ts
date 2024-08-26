import TxnCategoryVO from "adapters/domains/vos/TxnCateogryVO"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import { IRequestTransactionDTOParams } from "adapters/dtos/requests/interfaces/IRequestTransactionDTO"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"

export default interface ITransactionPresenter {
  getTransactions(): Promise<
    ILayerDTO<Array<ICardTransactionVM | IAccountTransactionVM>>
  >
  getTxnCategories(): Promise<ILayerDTO<TxnCategoryVO[]>>
  addTransaction(
    transactionParams: IRequestTransactionDTOParams
  ): Promise<ILayerDTO<boolean>>
}
