import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCreateComponent } from './libro-create.component';

describe('LibroCreateComponent', () => {
  let component: LibroCreateComponent;
  let fixture: ComponentFixture<LibroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
