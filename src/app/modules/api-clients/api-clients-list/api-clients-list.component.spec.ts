import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiClientsListComponent } from './api-clients-list.component';

describe('ApiClientsListComponent', () => {
  let component: ApiClientsListComponent;
  let fixture: ComponentFixture<ApiClientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiClientsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
