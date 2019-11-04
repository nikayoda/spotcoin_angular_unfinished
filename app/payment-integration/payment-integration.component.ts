import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {CurrentUser} from '../_models/currentUser';

@Component({
  selector: 'app-payment-integration',
  templateUrl: './payment-integration.component.html',
  styleUrls: ['./payment-integration.component.scss']
})
export class PaymentIntegrationComponent implements OnInit {
  @ViewChild('codeTag') codeForm: ElementRef;

  currentUser: CurrentUser;
  lang = 'en';
  amount;
  description;
  currency = 'usd';
  buttonName = 'Pay';
  orderId;
  successPaymentUrl;
  failedPaymentUrl;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserInfo();
  }

  copyCode() {
    console.log(this.codeForm.nativeElement.innerText);
    const listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.codeForm.nativeElement.innerText));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

}
