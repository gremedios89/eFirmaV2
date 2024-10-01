import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteRoleComponent } from './confirm-delete-role.component';

describe('ConfirmDeleteRoleComponent', () => {
  let component: ConfirmDeleteRoleComponent;
  let fixture: ComponentFixture<ConfirmDeleteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
