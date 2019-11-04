import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Order} from '../../_models/orders/order';
import {CustomerForList} from '../../_models/customers/customerForList';
import {CustomerService} from '../../_services/customer.service';
import {CurrentUser} from '../../_models/currentUser';
import {AuthService} from '../../_services/auth.service';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {OrderService} from '../../_services/order.service';
import {ReplaySubject, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {InitPaymentTransaction} from '../../_models/payments/initPaymentTransaction';
import {PaymentService} from '../../_services/payment.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {CustomerCreditCard} from '../../_models/customers/customerCreditCard';
import {CreateCustomer} from '../../_models/customers/createCustomer';
import {Country} from '../../_models/country';
import {CountryService} from '../../_services/country.service';
import {Invoice} from '../../_models/orders/invoice';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') private dialog;
  order: Order = new Order();
  orderIdHolder: string;
  customers: CustomerForList[];
  customer: CreateCustomer = new CreateCustomer();
  dialogRef: NbDialogRef<any>;
  countries: Country[];
  selectedCustomer: CustomerForList;
  selectedCard: CustomerCreditCard;
  newCard: CustomerCreditCard = new CustomerCreditCard();
  currUser: CurrentUser;
  fiatAmountChanged: Subject<number> = new Subject<number>();
  loading = false;
  customerLoading = false;
  cardLoading = false;
  modalLoading = false;
  paymentGateways: any;
  paymentModel: InitPaymentTransaction = new InitPaymentTransaction();
  customerSelectedOption = false;
  creditCardSelectedOption = false;
  public customerCtrl: FormControl = new FormControl();
  public customerFilteringCtrl: FormControl = new FormControl();
  public creditCardCtrl: FormControl = new FormControl();
  public filteredCustomer: ReplaySubject<CustomerForList[]> = new ReplaySubject<CustomerForList[]>(1);
  public searching = false;
  protected onDestroy = new Subject<void>();
  invoice: Invoice = new Invoice();

  constructor(private customerService: CustomerService,
              private authService: AuthService,
              private countryService: CountryService,
              private orderService: OrderService,
              private toastrService: NbToastrService,
              private dialogService: NbDialogService,
              private paymentService: PaymentService,
              private router: Router) {
    this.currUser = this.authService.getUserInfo();
    this.fiatAmountChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(fiatAmount => {
      if (!fiatAmount || isNaN(fiatAmount)) { fiatAmount = 0; }
      this.orderService.countFiat({merchantId: this.currUser.merchantId, fiatCount: fiatAmount}).subscribe(data => {
        this.order.spotAmount = data.spotAmount;
      }, error => {
        this.toastrService.danger(error);
      });
    });
  }

  ngOnInit() {
    this.order.merchantId = this.currUser.merchantId;
    this.order.shopId = this.currUser.shopId;
    this.order.employeeId = this.currUser.employeeId;

    this.customerService.getAllEmpCustomer({id: this.currUser.employeeId}).subscribe(data => {
      this.customers = data['customers'];
      this.filteredCustomer.next(this.customers);
    }, error => {
      this.toastrService.danger(error);
    });
    this.paymentService.getGateways().subscribe(res => {
      this.paymentGateways = res['gateways'].result;
      this.paymentModel.paymentGatewayId = this.paymentGateways[0].id;
    }, error => {
      this.toastrService.danger(error);
    });
    this.countryService.getAll().subscribe(data => {
      this.countries = data['countries'];
      this.customer.countryId = this.countries[0].id;
    });

    this.customerFilteringCtrl.valueChanges
      .pipe(
        map(search => {
          return this.customers.filter(customer => {
            return customer.firstName.toLowerCase().indexOf(search) > -1 ||
              customer.lastName.toLowerCase().indexOf(search) > -1;
          });
        }),
      )
      .subscribe(customers => {
          this.searching = false;
          this.filteredCustomer.next(customers);
        },
        error => {
          this.searching = false;
          this.toastrService.danger(error);
        });

    this.customerCtrl.valueChanges.subscribe(customer => {
      if (customer !== null && customer !== undefined) {
        this.order.customerId = customer.id;
        this.selectedCustomer = customer;
        this.creditCardSelectedOption = true;
        this.customerSelectedOption = true;
        this.newCard = new CustomerCreditCard();
        this.newCard.customerId = customer.id;
      } else {
        this.order.customerId = null;
        this.selectedCustomer = null;
        this.customerSelectedOption = false;
        this.paymentModel.creditCard = new CustomerCreditCard();
      }
    });
    this.creditCardCtrl.valueChanges.subscribe(card => {
      if (card !== null) {
        this.paymentModel.creditCard.cardNumber = card.cardNumber;
        this.paymentModel.creditCard.nameOnCard = card.nameOnCard;
        this.paymentModel.creditCard.expirationDate = card.expirationDate;
        this.selectedCard = card;
        this.creditCardSelectedOption = false;
      } else {
        this.paymentModel.creditCard.cardNumber = '';
        this.paymentModel.creditCard.nameOnCard = '';
        this.paymentModel.creditCard.expirationDate = null;
        this.selectedCard = new CustomerCreditCard();
        this.creditCardSelectedOption = true;
      }
    });
  }

  create() {
    if (this.selectedCustomer !== null && this.selectedCustomer !== undefined) {
      this.order.firstName = this.selectedCustomer.firstName;
      this.order.lastName = this.selectedCustomer.lastName;
    }
    this.loading = true;
    this.orderService.create(this.order).subscribe(data => {
      this.loading = false;
      this.orderIdHolder = data['createdOrder'].orderId;
      this.toastrService.success('Order created successfully');
      this.paymentModel.merchantId = this.currUser.merchantId;
      this.paymentModel.employeeId = this.currUser.employeeId;
      this.paymentModel.orderId = data['createdOrder'].orderId;
      this.paymentModel.orderStatusId = data['createdOrder'].orderStatusId;
      this.dialogRef = this.dialogService.open(this.dialog, {closeOnBackdropClick: false});
      this.dialogRef.onClose.subscribe(() => {
        this.order = new Order();
        this.order.merchantId = this.currUser.merchantId;
        this.order.shopId = this.currUser.shopId;
        this.order.employeeId = this.currUser.employeeId;
        this.selectedCard = new CustomerCreditCard();
        this.selectedCustomer = new CustomerForList();
        this.filteredCustomer = new ReplaySubject<CustomerForList[]>(1);
        this.creditCardSelectedOption = false;
        this.customerSelectedOption = false;
      });
    }, error => {
      this.loading = false;
      this.toastrService.danger(error);
    });
  }

  printInvoice() {
    this.orderService.getInvoice({merchantId: this.currUser.merchantId, orderId: this.orderIdHolder}).subscribe(res => {
      this.invoice = res['invoice'];
      setTimeout(() => {
        const element: HTMLElement = document.getElementById('printBtn') as HTMLElement;
        element.click();
      }, 100);
    }, error => {
      this.toastrService.danger(error);
    });
  }

  countFiat(fiatAmount: number) {
    this.fiatAmountChanged.next(fiatAmount);
  }

  initPay() {
    this.modalLoading = true;
    this.paymentService.pay(this.paymentModel).subscribe(res => {
      this.modalLoading = false;
      this.toastrService.success('Order payed successfully');
      this.dialogRef.close();
      this.router.navigate(['/orders'], { state: {orderId: this.orderIdHolder} });
    }, error => {
      this.modalLoading = false;
      this.toastrService.danger(error);
    });
  }

  createCustomer() {
    this.customerLoading = true;
    this.customer.merchantId = this.currUser.merchantId;
    this.customer.merchantEmployeeId = this.currUser.employeeId;
    this.customerService.create(this.customer).subscribe(data => {
      this.customerLoading = false;
      this.customer = new CreateCustomer();
      this.customerService.getAllEmpCustomer({id: this.currUser.employeeId}).subscribe(data => {
        this.customers = data['customers'];
        this.filteredCustomer.next(this.customers);
      }, error => {
        this.toastrService.danger(error);
      });
      this.toastrService.success('Customer created successfully');
      this.dialogRef.close();
    }, error => {
      this.customerLoading = false;
      this.toastrService.danger(error);
    });
  }

  addCard() {
    this.cardLoading = true;
    console.log(this.newCard);
    const selectedCustomerId = this.selectedCustomer.id;
    this.customerService.addCreditCart(this.newCard).subscribe(res => {
      this.cardLoading = false;
      this.toastrService.success('Card added successfully');
      this.customerService.getAllEmpCustomer({id: this.currUser.employeeId}).subscribe(data => {
        this.customers = data['customers'];
        this.filteredCustomer.next(this.customers);
        this.selectedCustomer = this.customers.find(c => c.id === selectedCustomerId);
        console.log(this.selectedCustomer);
      }, error => {
        this.toastrService.danger(error);
      });
      this.dialogRef.close();
    }, error => {
      this.toastrService.danger(error);
      this.cardLoading = false;
    });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
