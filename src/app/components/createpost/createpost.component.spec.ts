import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostComponent } from './createpost.component';

describe('CreateblogComponent', () => {
  let component: CreatepostComponent;
  let fixture: ComponentFixture<CreatepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatepostComponent],
    });
    fixture = TestBed.createComponent(CreatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
