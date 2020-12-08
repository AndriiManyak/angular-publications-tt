import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationTypeSelectComponent } from './publication-type-select.component';

describe('PublicationTypeSelectComponent', () => {
  let component: PublicationTypeSelectComponent;
  let fixture: ComponentFixture<PublicationTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationTypeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
