import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantEmployeesComponent } from './merchant-employees.component';

describe('MerchantAccountsComponent', () => {
  let component: MerchantEmployeesComponent;
  let fixture: ComponentFixture<MerchantEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
