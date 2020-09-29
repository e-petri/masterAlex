import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FantasyleaguePage } from './fantasyleague.page';

describe('FantasyleaguePage', () => {
  let component: FantasyleaguePage;
  let fixture: ComponentFixture<FantasyleaguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyleaguePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FantasyleaguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
