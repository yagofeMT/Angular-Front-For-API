import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategorysComponent } from './list-categorys.component';

describe('ListCategorysComponent', () => {
  let component: ListCategorysComponent;
  let fixture: ComponentFixture<ListCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
