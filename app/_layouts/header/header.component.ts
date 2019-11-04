import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {NbSidebarService} from '@nebular/theme';
import {CurrentUser} from '../../_models/currentUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: CurrentUser;
  constructor(private authService: AuthService, private router: Router, private sidebarService: NbSidebarService) { }
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  ngOnInit() {
    this.currentUser = this.authService.getUserInfo();
  }

}
