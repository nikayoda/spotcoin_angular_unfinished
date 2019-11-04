export class Order {
  merchantId: string;
  shopId: string;
  employeeId: number;
  fiatAmount: number;
  spotAmount: number;
  customerId?: string;
  firstName: string;
  lastName: string;
  description: Text;
}
