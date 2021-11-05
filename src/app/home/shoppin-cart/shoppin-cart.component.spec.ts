import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinCartComponent } from './shoppin-cart.component';

describe('ShoppinCartComponent', () => {
  let component: ShoppinCartComponent;
  let fixture: ComponentFixture<ShoppinCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
