import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInforComponent } from './address-infor.component';

describe('AddressInforComponent', () => {
  let component: AddressInforComponent;
  let fixture: ComponentFixture<AddressInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressInforComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
