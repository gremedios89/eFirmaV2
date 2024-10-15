import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteClientComponent } from './confirm-delete-client.component';

describe('ConfirmDeleteClientComponent', () => {
  let component: ConfirmDeleteClientComponent;
  let fixture: ComponentFixture<ConfirmDeleteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
