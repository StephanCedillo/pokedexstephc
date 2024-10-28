import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosServiceComponent } from './favoritos-service.component';

describe('FavoritosServiceComponent', () => {
  let component: FavoritosServiceComponent;
  let fixture: ComponentFixture<FavoritosServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritosServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
