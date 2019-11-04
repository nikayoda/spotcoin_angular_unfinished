import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPayModalComponent } from './order-pay-modal.component';

describe('OrderPayModalComponent', () => {
  let component: OrderPayModalComponent;
  let fixture: ComponentFixture<OrderPayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
