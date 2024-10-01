import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApiClientComponent } from './add-api-client.component';

describe('AddApiClientComponent', () => {
  let component: AddApiClientComponent;
  let fixture: ComponentFixture<AddApiClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApiClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddApiClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
