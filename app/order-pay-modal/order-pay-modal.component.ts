import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {CustomerForList} from '../_models/customers/customerForList';
import {CurrentUser} from '../_models/currentUser';
import {InitPaymentTransaction} from '../_models/payments/initPaymentTransaction';
import {CustomerService} from '../_services/customer.service';
import {AuthService} from '../_services/auth.service';
import {OrderService} from '../_services/order.service';
import {PaymentService} from '../_services/payment.service';
import {CustomerCreditCard} from '../_models/customers/customerCreditCard';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-order-pay-modal',
  templateUrl: './order-pay-modal.component.html',
  styleUrls: ['./order-pay-modal.component.scss']
})
export class OrderPayModalComponent implements ViewCell, OnInit {
  @ViewChild('dialog') private dialog;
  @Input() value: string | number;
  @Input() rowData: any;

  customers: CustomerForList[];
  currUser: CurrentUser;
  loading = false;
  modalLoading = false;
  paymentGateways: any;
  paymentModel: InitPaymentTransaction = new InitPaymentTransaction();
  protected dialogRef: NbDialogRef<any>;

  constructor(private dialogService: NbDialogService,
              private customerService: CustomerService,
              private authService: AuthService,
              private orderService: OrderService,
              private toastrService: NbToastrService,
              private paymentService: PaymentService,
              private router: Router) {
    this.currUser = this.authService.getUserInfo();
    this.paymentModel.merchantId = this.currUser.merchantId;
    this.paymentModel.employeeId = this.currUser.employeeId;
  }

  ngOnInit() {
    this.paymentModel.orderId = this.rowData.id;
    this.paymentModel.orderStatusId = this.rowData.orderStatusId;
    this.paymentService.getGateways().subscribe(res => {
      this.paymentGateways = res['gateways'].result;
      this.paymentModel.paymentGatewayId = this.paymentGateways[0].id;
    }, error => {
      this.toastrService.danger(error);
    });
  }

  initPay() {
    this.modalLoading = true;
    this.paymentService.pay(this.paymentModel).subscribe(res => {
      this.modalLoading = false;
      this.toastrService.success('Order payed successfully');
      this.close();
      this.onRefresh();
    }, error => {
      this.modalLoading = false;
      this.close();
      this.paymentModel.creditCard = new CustomerCreditCard();
      this.toastrService.danger(error);
    });
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog);
  }

  close() {
    this.dialogRef.close();
  }

}
