import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CurrentUser} from '../_models/currentUser';
import {AuthService} from '../_services/auth.service';
import {NbToastrService} from '@nebular/theme';
import {MerchantService} from '../_services/merchant.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {
  @ViewChild('logoInput') logoInput: ElementRef | null = null;

  currUser: CurrentUser;
  logoLoading = false;
  merchantId;
  logoUrl;

  constructor(private authSerivce: AuthService,
              private toastrService: NbToastrService,
              private merchantService: MerchantService) { }

  ngOnInit() {
    this.currUser = this.authSerivce.getUserInfo();
    this.merchantId = this.currUser.merchantId;
    this.logoUrl = environment.apiUrl + this.currUser.Logo;
  }

  uploadLogo() {
    this.logoLoading = true;
    const fileInput: HTMLInputElement = this.logoInput.nativeElement;
    const logoFile = fileInput.files[0];
    if (fileInput.files.length === 0) {
      this.logoLoading = false;
      this.toastrService.danger('file required');
      return;
    }

    this.merchantService.uploadMerchantLogo(this.currUser.merchantId, logoFile).subscribe(res => {
      this.logoLoading = false;
      this.logoInput = null;
      this.logoUrl = environment.apiUrl + res.rc;
      this.toastrService.success('Logo uploaded successfully');
    }, error => {
      this.logoLoading = false;
      this.toastrService.danger(error);
    });
  }

}
