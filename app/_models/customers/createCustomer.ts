import {CreateCreditCard} from './createCreditCard';

export class CreateCustomer {
  firstName: string;
  lastName: string;
  countryId: number;
  town: string;
  address: string;
  zip: string;
  gender: string;
  email: string;
  phone: string;
  identityNumber: string;
  merchantId: string;
  merchantEmployeeId: number;
  creditCard: CreateCreditCard;

  constructor() {
    this.creditCard = new CreateCreditCard();
    this.gender = 'male';
  }
}
