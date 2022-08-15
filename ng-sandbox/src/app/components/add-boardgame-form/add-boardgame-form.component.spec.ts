import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { BoardgamesModule } from 'src/app/modules/boardgames.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { AuthService } from 'src/app/services/auth.service';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { AddBoardgameFormComponent } from './add-boardgame-form.component';

describe('AddBoardgameFormComponent', () => {
  let component: AddBoardgameFormComponent;
  let fixture: ComponentFixture<AddBoardgameFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoardgameFormComponent ],
      imports: [SharedModule, AppModule],
      providers: [BoardgamesService, AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoardgameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Name input', () => {
    console.log(nativeElement.getElementsByTagName('form')[0].getElementsByTagName('mat-form-field').length);
    //expect(nativeElement.);
  });

  // it('should have Type input', () => {   //it = code under test, 'it resets a counter after pressing Reset'

  //   expect(component).toBeTruthy();
  // });

  // it('should have Times Played input', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should have Date Purchased input', () => {
  //   expect(component).toBeTruthy();
  // });
});
