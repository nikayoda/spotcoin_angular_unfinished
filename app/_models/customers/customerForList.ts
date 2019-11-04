import {CustomerCreditCard} from './customerCreditCard';

export class CustomerForList {
  id: string;
  firstName: string;
  lastName: string;
  countryId: string;
  countryName: string;
  town: string;
  address: string;
  zip: string;
  gender: string;
  email: string;
  phone: string;
  identityNumber: string;
  createdDate: Date;
  merchantEmployeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  creditCards: CustomerCreditCard[];

  constructor(obj?: any) {
  Object.assign(this, obj);
  }
}
