import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignApiClientPermissionsComponent } from './assign-api-client-permissions.component';

describe('AssignApiClientPermissionsComponent', () => {
  let component: AssignApiClientPermissionsComponent;
  let fixture: ComponentFixture<AssignApiClientPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignApiClientPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignApiClientPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
