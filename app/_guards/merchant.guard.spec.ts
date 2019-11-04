import { TestBed, async, inject } from '@angular/core/testing';

import { MerchantGuard } from './merchant.guard';

describe('MerchantGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantGuard]
    });
  });

  it('should ...', inject([MerchantGuard], (guard: MerchantGuard) => {
    expect(guard).toBeTruthy();
  }));
});
