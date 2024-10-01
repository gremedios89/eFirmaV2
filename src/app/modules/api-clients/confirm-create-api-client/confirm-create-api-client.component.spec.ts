import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreateApiClientComponent } from './confirm-create-api-client.component';

describe('ConfirmCreateApiClientComponent', () => {
  let component: ConfirmCreateApiClientComponent;
  let fixture: ComponentFixture<ConfirmCreateApiClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCreateApiClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmCreateApiClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
