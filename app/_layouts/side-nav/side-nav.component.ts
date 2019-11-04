import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';
import {CurrentUser} from '../../_models/currentUser';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  private alive = true;
  selectedItem: string;
  currUser: CurrentUser;

  constructor(private menuService: NbMenuService,
              private authService: AuthService) {
    this.currUser = this.authService.getUserInfo();
  }
  items: NbMenuItem[];

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    if (this.currUser.role === 'Merchant') {
      this.items = [
        {
          title: 'Dashboard',
          icon: 'fas fa-home',
          link: '/dashboard'
        },
        {
          title: 'Shops',
          link: '/shops',
          icon: 'fas fa-shopping-cart'
        },
        {
          title: 'Employees',
          link: '/employees',
          icon: 'fas fa-users'
        },
        {
          title: 'Orders',
          icon: 'fas fa-file-invoice',
          link: '/orders'
        },
        {
          title: 'Customers',
          icon: 'fas fa-users',
          link: '/customers'
        },
        {
          title: 'Payment Integration',
          icon: 'fas fa-cogs',
          link: '/payment-integration'
        },
        {
          title: 'Branding',
          icon: 'fas fa-palette',
          link: '/branding'
        },
      ];
    } else {
      this.items = [
        {
          title: 'Orders',
          icon: 'fas fa-file-invoice',
          link: '/orders'
        },
        {
          title: 'Customers',
          icon: 'fas fa-users',
          link: '/customers'
        },
      ];
    }
  }

  getSelectedItem() {
    this.menuService.getSelectedItem('menu')
      .pipe(takeWhile(() => this.alive))
      .subscribe( (menuBag) => {
        this.selectedItem = menuBag.item.title;
      });
  }

}
