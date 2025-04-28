export class TransactionModel {
  public timestamp: Date;
  public amount: number;
  public from: string;
  public to: string;
  public rate: number;
  public result: number;

  public constructor(fields?: Partial<TransactionModel>) {
    this.timestamp = fields?.timestamp ?? new Date();
    this.amount = fields?.amount ?? 0;
    this.from = fields?.from ?? '';
    this.to = fields?.to ?? '';
    this.rate = fields?.rate ?? 1;
    this.result = fields?.result ?? 0;
  }
}
