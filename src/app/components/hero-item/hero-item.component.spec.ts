import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroItemComponent } from './hero-item.component';

describe('HeroItemComponent', () => {
  let component: HeroItemComponent;
  let fixture: ComponentFixture<HeroItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
