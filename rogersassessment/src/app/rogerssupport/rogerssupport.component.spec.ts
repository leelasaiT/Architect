import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RogersSupportComponent } from './rogerssupport.component';

describe('RogersSupportComponent', () => {
  let component: RogersSupportComponent;
  let fixture: ComponentFixture<RogersSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RogersSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RogersSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
