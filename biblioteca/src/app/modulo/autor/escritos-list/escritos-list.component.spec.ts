import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscritosListComponent } from './escritos-list.component';

describe('EscritosListComponent', () => {
  let component: EscritosListComponent;
  let fixture: ComponentFixture<EscritosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscritosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscritosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
