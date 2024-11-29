import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFirestorePage } from './test-firestore.page';

describe('TestFirestorePage', () => {
  let component: TestFirestorePage;
  let fixture: ComponentFixture<TestFirestorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFirestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
