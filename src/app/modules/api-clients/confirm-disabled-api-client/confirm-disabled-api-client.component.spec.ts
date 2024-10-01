import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDisabledApiClientComponent } from './confirm-disabled-api-client.component';

describe('ConfirmDeleteApiClientComponent', () => {
  let component: ConfirmDisabledApiClientComponent;
  let fixture: ComponentFixture<ConfirmDisabledApiClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDisabledApiClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDisabledApiClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
