import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {CommonModule} from '@angular/common';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {NbCardModule, NbLayoutModule, NbSidebarModule} from '@nebular/theme';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {}
