export class Invoice {
  id: string;
  orderId: string;
  merchantId: string;
  shopId: string;
  employeeId: number;
  invoiceId: string;
  customerId: string;
  merchantName: string;
  merchantAddress: string;
  merchantCountry: string;
  merchantTown: string;
  merchantZip: string;
  merchantPhone: string;
  merchantEmail: string;
  customerFirstName: string;
  customerLastName: string;
  orderCreateDate: Date;
  orderDescription: string;
  fiatAmount: number;
  spotAmount: number;
  currencyRate: number;
  currency: string;
  isPaid: boolean;
}
