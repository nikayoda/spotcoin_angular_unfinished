import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {MerchantService} from '../_services/merchant.service';
import {AuthService} from '../_services/auth.service';
import {CurrentUser} from '../_models/currentUser';

@Component({
  selector: 'app-merchant-accounts',
  templateUrl: './merchant-employees.component.html',
  styleUrls: ['./merchant-employees.component.scss']
})
export class MerchantEmployeesComponent implements OnInit {
  source: LocalDataSource;
  currUser: CurrentUser;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      gender: {
        title: 'Gender'
      },
      phone: {
        title: 'Phone'
      },
      shopName: {
        title: 'Shop Name'
      },
      identityNumber: {
        title: 'Identity Number'
      },
    },
    attr: {
      class: 'table'
    }
  };
  constructor(private merchantService: MerchantService,
              private datePipe: DatePipe,
              private authService: AuthService) {
    this.source = new LocalDataSource();
    this.currUser = this.authService.getUserInfo();
  }

  ngOnInit() {
    this.merchantService.getAllEmployee({id: this.currUser.merchantId}).subscribe(data => {
      this.source.load(data['employees']);
      this.source.setPaging(1, 15, true);
    });
  }

}
