import { Component, OnInit } from '@angular/core';
import {MerchantEmployeeFull} from '../../_models/merchant/merchantEmployeeFull';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MerchantShops} from '../../_models/shops/merchantShops';
import {MerchantService} from '../../_services/merchant.service';
import {AuthService} from '../../_services/auth.service';
import {ShopService} from '../../_services/shop.service';

export class MerchEmpCheck {
  username: string;
  merchantId: string;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  merchantEmployee = new MerchantEmployeeFull();
  currUser: any;
  loading = false;
  usernameNotAvailable = false;
  merchantEmpUsrChanged: Subject<string> = new Subject<string>();
  empCheckModel: MerchEmpCheck = new MerchEmpCheck();
  merchantShops: MerchantShops[];
  shopsEmpty = false;

  constructor(private merchantService: MerchantService,
              private authService: AuthService,
              private shopService: ShopService,
              private route: ActivatedRoute,
              private toastrService: NbToastrService) {
    this.currUser = this.authService.getUserInfo();
    this.empCheckModel.merchantId = this.currUser.merchantId;

    this.merchantEmpUsrChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(username => {
      this.empCheckModel.username = username;
      this.merchantService.checkMerchantEmpAccount(this.empCheckModel).subscribe(data => {
        this.usernameNotAvailable = false;
      }, error => {
        this.usernameNotAvailable = true;
      });
      this.merchantEmployee.username = username;
    });
  }

  ngOnInit() {
    this.shopService.getAll({id: this.currUser.merchantId}).subscribe(data => {
      this.merchantShops = data['shops'];
      this.shopsEmpty = data['shops'].length > 0 ? false : true;
      if (this.shopsEmpty) { return; }
      this.merchantEmployee.merchantEmployee.shopId = this.merchantShops[0].id;
    }, error => {
      this.toastrService.danger(error);
    });
    this.merchantEmployee.merchantEmployee.gender = 'male';
  }

  create() {
    this.loading = true;
    this.merchantEmployee.merchantEmployee.merchantId = this.currUser.merchantId;
    this.merchantService.createMerchantEmployee(this.merchantEmployee).subscribe(data => {
      this.loading = false;
      this.toastrService.success('Employee created successfully');
      this.merchantEmployee = new MerchantEmployeeFull();
    }, error => {
      this.loading = false;
      this.toastrService.danger(error);
    });
  }

  checkMerchantEmployee(searchValue: string) {
    this.merchantEmpUsrChanged.next(searchValue);
  }

}
