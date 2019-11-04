import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../_services/dashboard.service';
import {AuthService} from '../_services/auth.service';
import {CurrentUser} from '../_models/currentUser';
import {Dashboard} from '../_models/dashboard/dashboard';
import {NbToastrService} from '@nebular/theme';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ShopInfos} from '../_models/dashboard/shopInfos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currUser: CurrentUser;
  maDashboard: Dashboard = new Dashboard();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>' ],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  };

  shopInfos: ShopInfos[];

  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private toastrService: NbToastrService) {
    this.currUser = this.authService.getUserInfo();
  }

  ngOnInit() {
    this.dashboardService.maDashboard({id: this.currUser.merchantAccountId}).subscribe(res => {
      this.maDashboard = res['dashboard'];
    }, error => {
      this.toastrService.danger(error);
    });
    this.dashboardService.getShopInfos({id: this.currUser.merchantId}).subscribe(res => {
      this.shopInfos = res['shopInfos'];
    });
  }

}
