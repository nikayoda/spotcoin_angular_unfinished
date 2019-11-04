import { Component, OnInit } from '@angular/core';
import {Invoice} from '../../_models/orders/invoice';
import {CurrentUser} from '../../_models/currentUser';
import {OrderService} from '../../_services/order.service';
import {NbToastrService} from '@nebular/theme';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoice: Invoice = new Invoice();
  currUser: CurrentUser;

  constructor(private orderService: OrderService,
              private toastrService: NbToastrService,
              private authService: AuthService,
              private route: ActivatedRoute) {
    this.currUser = this.authService.getUserInfo();
  }

  ngOnInit() {
    this.route.params.subscribe(parasms => {
      this.orderService.getInvoice({merchantId: this.currUser.merchantId, orderId: parasms.id}).subscribe(res => {
        this.invoice = res['invoice'];
        // setTimeout(() => {
        //   const element: HTMLElement = document.getElementById(this.rowData.id) as HTMLElement;
        //   console.log(element);
        //   element.click();
        // }, 100);
      }, error => {
        this.toastrService.danger(error);
      });
    });
  }

}
