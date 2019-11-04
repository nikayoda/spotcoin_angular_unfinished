import { Component, OnInit } from '@angular/core';
import {Shop} from '../../_models/shops/shop';
import {CountryService} from '../../_services/country.service';
import {CurrencyService} from '../../_services/currency.service';
import {ShopService} from '../../_services/shop.service';
import {Country} from '../../_models/country';
import {Currency} from '../../_models/currency';
import {NbToastrService} from '@nebular/theme';
import {AuthService} from '../../_services/auth.service';
import {CurrentUser} from '../../_models/currentUser';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit {
  currUser: CurrentUser;
  shop: Shop = new Shop();
  countries: Country[];
  currencies: Currency[];
  loading = false;

  constructor(private countryService: CountryService,
              private currencyService: CurrencyService,
              private shopService: ShopService,
              private toastrService: NbToastrService,
              private authSerivce: AuthService) { }

  ngOnInit() {
    this.countryService.getAll().subscribe(data => {
      this.countries = data['countries'];
      this.shop.countryId = this.countries[0].id;
    });
    this.currencyService.getAll().subscribe(data => {
      this.currencies = data['currencies'];
      this.shop.currencyId = this.currencies[0].id;
    });
    this.currUser = this.authSerivce.getUserInfo();
  }

  create() {
    this.loading = true;
    this.shop.merchantId = this.currUser.merchantId;
    this.shopService.create(this.shop).subscribe(data => {
      this.loading = false;
      this.shop = new Shop();
      this.toastrService.success('Shop created successfully');
    }, error => {
      this.loading = false;
      this.toastrService.danger(error);
    });
  }

}
