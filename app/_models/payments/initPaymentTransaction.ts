import {CustomerCreditCard} from '../customers/customerCreditCard';

export class InitPaymentTransaction {
  paymentGatewayId: number;
  orderId: string;
  merchantId: string;
  employeeId: number;
  orderStatusId: number;
  creditCard: CustomerCreditCard;

  constructor() {
    this.creditCard = new CustomerCreditCard();
  }
}
