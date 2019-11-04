import {ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ShopService} from '../_services/shop.service';
import {DatePipe, formatDate, formatNumber} from '@angular/common';
import {ReportService} from '../_services/report.service';
import {ToastrService} from 'ngx-toastr';
import {Shop} from '../_models/shops/shop';
import {colorSets} from '@swimlane/ngx-charts/release/utils';
import {ShopInfos} from '../_models/dashboard/shopInfos';
import {DashboardService} from '../_services/dashboard.service';
import {CurrentUser} from '../_models/currentUser';
import {AuthService} from '../_services/auth.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopsComponent implements OnInit {
  source: LocalDataSource;
  shops: Shop[];
  dateRange = null;
  shopsInfoAll: any[] = [];
  shopInfos: ShopInfos[];
  currUser: CurrentUser;
  loading = false;
  startDate: Date = new Date();
  endDate: Date = new Date();


  colorSets: any;
  colorScheme: any;

  results: any[] = [
    {
      name: 'Fiat Amount',
      series: [
        {
          value: 178.34,
          name: '2019-06-24T00:00:00',
        },
        {
          value: 245,
          name: '2019-06-25T00:00:00',
        },
        {
          value: 450,
          name: '2019-06-26T00:00:00',
        },
        {
          value: 340,
          name: '2019-06-27T00:00:00',
        }
      ]
    }
    ];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      name: {
        title: 'Name'
      },
      merchantName: {
        title: 'Merchant Name'
      },
      countryName: {
        title: 'Country'
      },
      town: {
        title: 'town'
      },
      zip: {
        title: 'Zip'
      },
      email: {
        title: 'Email'
      },
      createdDate: {
        title: 'Created At',
        type: 'string',
        valuePrepareFunction: (column, row) => {
          return this.datePipe.transform(column, 'yyyy-MM-dd');
        },
      },
      currencyRate: {
        title: 'Currency Rate'
      },
      currencyName: {
        title: 'Currency'
      },
      status: {
        title: 'Is Active',
        type: 'string',
        valuePrepareFunction: (column, row) => {
          return `${column === true ? 'Yes' : 'No'} `;
        },
        filterFunction(cell: any, search?: string): boolean {
          const str: string = cell === true ? 'yes' : 'no';
          return str.search(search.toLowerCase()) !== -1;
        }
      },
      // Action: {
      //   title: 'Action',
      //   type: 'custom',
      //   filter: false,
      //   sort: false,
      //   renderComponent: ShopDetailLinkComponent
      // }
    },
    attr: {
      class: 'table'
    }
  };
  constructor(private shopService: ShopService,
              private datePipe: DatePipe,
              private reportService: ReportService,
              private toastrService: NbToastrService,
              private dashboardService: DashboardService,
              private authService: AuthService) {
    this.source = new LocalDataSource();
    Object.assign(this, {
      colorSets,
    });
    this.colorScheme = this.colorSets.find(s => s.name === 'cool');
    this.currUser = this.authService.getUserInfo();
  }

  ngOnInit() {
    // this.shopService.getAll(this.currUser.merchantId).subscribe(data => {
    //   this.shops = data['shops'];
    //   this.shops.map((shop) => {
    //     this.reportService.getShopInfos({id: shop['id']}).subscribe(res => {
    //       this.shopInfos.push({name: shop.name, data: res['shopInfo']});
    //       console.log(this.shopInfos);
    //     });
    //   });
    //   this.source.load(data['shops']);
    //   this.source.setPaging(1, 15, true);
    // });

    this.dashboardService.getShopInfos({id: this.currUser.merchantId}).subscribe(res => {
      this.shopInfos = res.shopInfos;
      this.shopInfos.map(shop => {
        this.reportService.getShopInfos({id: shop.id}).subscribe(res => {
          const shopStatArr = [];
          const shopFiatStatArr = [];
          const shopSpotStatArr = [];
          const shopOrderStatArr = [];
          const shopFiatStatData = {name: 'Fiat Amount', series: []};
          const shopSpotStatData = {name: 'Spot Amount', series: []};
          const shopOrderStatData = {name: 'Order Number', series: []};
          const shopInfoStat = res.shopInfo;
          shopInfoStat.map(item => {
            shopFiatStatData.series.push(
              {value: item.fiatAmount, name: formatDate(item.date, 'mediumDate', 'en')}
              );
            shopSpotStatData.series.push(
              {value: item.spotAmount, name: formatDate(item.date, 'mediumDate', 'en')}
            );
            shopOrderStatData.series.push(
              {value: item.orderCount, name: formatDate(item.date, 'mediumDate', 'en')}
            );
          });
          shopStatArr.push(shopFiatStatData, shopSpotStatData, shopOrderStatData);
          let fiatLastTwoDayComp = 0;
          let fiatLastTwoDayCompStr = '0';
          let fiatStatColor = '';
          let spotLastTwoDayComp = 0;
          let spotLastTwoDayStr = '0';
          let spotStatColor = '';
          let orderLastTwoDay = 0;
          let orderLastTwoDayStr = '0';
          let orderStatColor = '';
          if (shopFiatStatData.series.length >= 2) {
            fiatLastTwoDayComp =
              shopFiatStatData.series[shopFiatStatData.series.length - 1].value -
              shopFiatStatData.series[shopFiatStatData.series.length - 2].value;
            spotLastTwoDayComp =
              shopSpotStatData.series[shopSpotStatData.series.length - 1].value -
              shopSpotStatData.series[shopSpotStatData.series.length - 2].value;
            orderLastTwoDay =
              shopOrderStatData.series[shopOrderStatData.series.length - 1].value -
              shopOrderStatData.series[shopOrderStatData.series.length - 2].value;
          }
          if (shopFiatStatData.series.length === 1) {
            fiatLastTwoDayComp = shopFiatStatData.series[0].value;
            spotLastTwoDayComp = shopSpotStatData.series[0].value;
            orderLastTwoDay = shopOrderStatData.series[0].value;
          }
          if (fiatLastTwoDayComp > 0) {
            fiatLastTwoDayCompStr = '+' + formatNumber(fiatLastTwoDayComp, 'en');
            fiatStatColor = 'success';
          } else if (fiatLastTwoDayComp < 0) {
            fiatLastTwoDayCompStr = formatNumber(fiatLastTwoDayComp, 'en');
            fiatStatColor = 'danger';
          }
          if (spotLastTwoDayComp > 0) {
            spotLastTwoDayStr = '+' + formatNumber(spotLastTwoDayComp, 'en');
            spotStatColor = 'success';
          } else if (spotLastTwoDayComp < 0) {
            spotLastTwoDayStr = formatNumber(spotLastTwoDayComp, 'en');
            spotStatColor = 'danger';
          }
          if (orderLastTwoDay > 0) {
            orderLastTwoDayStr = '+' + formatNumber(orderLastTwoDay, 'en');
            orderStatColor = 'success';
          } else if (spotLastTwoDayComp < 0) {
            orderLastTwoDayStr = formatNumber(orderLastTwoDay, 'en');
            orderStatColor = 'danger';
          }
          shopFiatStatArr.push(shopFiatStatData);
          shopSpotStatArr.push(shopSpotStatData);
          shopOrderStatArr.push(shopOrderStatData);

          this.shopsInfoAll.push(
            {shopInfo: shop, shopInfoDetail: res.shopInfo, shopFiatStatArr, shopSpotStatArr, shopOrderStatArr, fiatLastTwoDayCompStr,
              fiatStatColor, spotLastTwoDayStr, spotStatColor, orderLastTwoDayStr, orderStatColor});
        }, error => {
          this.toastrService.danger(error);
        });
      });
      console.log(this.shopsInfoAll);
    });
  }

  reRender() {
    window.dispatchEvent(new Event('resize'));
  }

  shopsInfoByDate() {
    console.log(this.dateRange);
  }

  getDetails(shopId) {
    this.shopsInfoAll.map(item => {
      if (item.shopInfo.id === shopId && item.shopInfoDetail === null) {
        this.loading = true;
        this.startDate.setDate(new Date().getDate() - 2);
        this.endDate.setDate(new Date().getDate() +  1);
        this.reportService.getShopInfos({id: item.shopInfo.id, startDate: this.startDate, endDate: this.endDate}).subscribe(res => {
          this.loading = false;
          item.shopInfoDetail = res.shopInfo;
        }, error => {
          this.toastrService.danger(error);
        });
      }
    });
  }
}
