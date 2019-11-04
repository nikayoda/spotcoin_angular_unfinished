import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {CurrentUser} from '../_models/currentUser';
import {DatePipe} from '@angular/common';
import {AuthService} from '../_services/auth.service';
import {OrderService} from '../_services/order.service';
import {OrderForList} from '../_models/orders/orderForList';
import {OrderPayModalComponent} from '../order-pay-modal/order-pay-modal.component';
import {Router} from '@angular/router';
import {InvoicePrintComponent} from './invoice-print/invoice-print.component';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  source: LocalDataSource;
  currUser: CurrentUser;
  settings = {};
  orderStatues: any;
  orderId = null;
  orders: any = [];
  ordersForList: OrderForList[] = [];
  selected: any;

  constructor(private orderService: OrderService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private router: Router) {
    if (this.router.getCurrentNavigation().extras.state !== undefined) {
      this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
    }
    this.source = new LocalDataSource();
    this.currUser = this.authService.getUserInfo();
    if (this.currUser.role === 'Cashier') {
      this.settings = {
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {
          spotAmount: {
            title: 'SPOT Amount'
          },
          fiatAmount: {
            title: 'Fiat Amount'
          },
          currencyName: {
            title: 'Currency'
          },
          firstName: {
            title: 'First Name'
          },
          lastName: {
            title: 'Last Name'
          },
          merchantName: {
            title: 'Merchant'
          },
          shopName: {
            title: 'Shop'
          },
          orderCreateDate: {
            title: 'Created At',
            type: 'string',
            valuePrepareFunction: (column, row) => {
              return this.datePipe.transform(column, 'yyyy-MM-dd');
            },
          },
          orderStatusName: {
            title: 'Status',
            filter: false
          },
          Action: {
            title: 'Action',
            type: 'custom',
            filter: false,
            sort: false,
            renderComponent: OrderPayModalComponent
          },
          Invoice: {
            title: 'Invoice',
            type: 'custom',
            filter: false,
            sort: false,
            renderComponent: InvoicePrintComponent
          }
        },
        attr: {
          class: 'table'
        }
      };
    } else {
      this.settings = {
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {
          spotAmount: {
            title: 'SPOT Amount'
          },
          fiatAmount: {
            title: 'Fiat Amount'
          },
          currencyName: {
            title: 'Currency'
          },
          firstName: {
            title: 'First Name'
          },
          lastName: {
            title: 'Last Name'
          },
          employeeFullName: {
            title: 'Employee'
          },
          shopName: {
            title: 'Shop'
          },
          orderCreateDate: {
            title: 'Created At',
            type: 'string',
            valuePrepareFunction: (column, row) => {
              return this.datePipe.transform(column, 'yyyy-MM-dd');
            },
          },
          orderStatusName: {
            title: 'Status'
          },
          Invoice: {
            title: 'Invoice',
            type: 'custom',
            filter: false,
            sort: false,
            renderComponent: InvoicePrintComponent
          }
        },
        attr: {
          class: 'table'
        }
      };
    }
  }

  ngOnInit() {
    this.byStatus(1);
    this.orderService.getAllOrderStatus().subscribe(res => {
      this.orderStatues = res['orderStatuses'];
      this.selected = this.orderStatues[0];
    });
  }

  byStatus(value) {
    if (this.currUser.role === 'Cashier') {
      this.orderService.getAllEmpOrders({employeeId: this.currUser.employeeId, orderStatusId: value}).subscribe(data => {
        this.ordersForList = [];
        this.orders = data['orders'];
        this.orders.forEach(order => {
          if (this.orderId) {
            if (order.id === this.orderId) {
              order.orderStatusId = 2;
              order.orderStatusName = 'pending';
            }
            this.orderId = null;
          } else {
            this.ordersForList.push(order);
          }
        });
        this.source.load(this.ordersForList);
        this.source.setPaging(1, 15, true);
      });
    } else {
      this.orderService.getAllMerchOrders({merchantId: this.currUser.merchantId, orderStatusId: value}).subscribe(data => {
        this.ordersForList = [];
        this.orders = data['orders'];
        this.orders.forEach(order => this.ordersForList.push(new OrderForList(order)));
        this.source.load(this.ordersForList);
        this.source.setPaging(1, 15, true);
      });
    }
  }

}
