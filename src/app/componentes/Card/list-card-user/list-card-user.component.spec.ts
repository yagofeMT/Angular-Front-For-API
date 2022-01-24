import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardUserComponent } from './list-card-user.component';

describe('ListCardUserComponent', () => {
  let component: ListCardUserComponent;
  let fixture: ComponentFixture<ListCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
