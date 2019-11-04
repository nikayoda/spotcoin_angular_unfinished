import {MerchantEmployee} from './merchantEmployee';

export class MerchantEmployeeFull {
  username: string;
  password: string;
  email: string;
  merchantEmployee: MerchantEmployee;

  constructor() {
    this.merchantEmployee = new MerchantEmployee();
  }
}
