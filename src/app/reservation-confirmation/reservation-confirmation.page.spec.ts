import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationConfirmationPage } from './reservation-confirmation.page';

describe('ReservationConfirmationPage', () => {
  let component: ReservationConfirmationPage;
  let fixture: ComponentFixture<ReservationConfirmationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
