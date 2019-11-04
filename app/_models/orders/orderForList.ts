export class OrderForList {
  id: string;
  merchantId: string;
  merchantName: string;
  shopId: string;
  shopName: string;
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  fiatAmount: number;
  spotAmount: number;
  currencyId: number;
  currencySymbol: string;
  currencyName: string;
  customerId: string;
  firstName: string;
  lastName: string;
  orderCreateDate: Date;
  timeZone: string;
  description: string;
  orderStatusId: number;
  orderStatusName: string;
  employeeFullName: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
    this.employeeFullName = this.employeeFirstName + ' ' + this.employeeLastName;
  }
}
