import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloUpdateComponent } from './articulo-update.component';

describe('ArticuloUpdateComponent', () => {
  let component: ArticuloUpdateComponent;
  let fixture: ComponentFixture<ArticuloUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
