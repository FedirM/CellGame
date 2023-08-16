import { Component, ViewChild, OnInit, OnDestroy, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GameCellInput, GameCellResultEvent, GameCellStatus } from './interfaces/game-cell.interface';
import { Score } from './interfaces/score.interface';
import { Subject, takeUntil } from 'rxjs';
import { ModalComponent } from './components/modal/modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('modalPlayer') modalPlayer: ModalComponent;
  @ViewChild('modalComputer') modalComputer: ModalComponent;

  private onDestroy$ = new Subject();
  private _randomIndecies: Array<number>;
  private _currentIndex = signal(0);
  private _defaultDuration = 1500;
  private _maxPoints = 10;

  inputForm: FormControl; 
  
  score = signal<Score>({player: 0, computer: 0});
  gameInProgress = signal<boolean>(false);
  cellList = new Array<GameCellInput>(100);

  constructor() {
    //Default initialisation
    this.resetGame();
  }

  ngOnInit(): void {
    this.inputForm = new FormControl(
      this._defaultDuration,
      [Validators.required, Validators.min(1), Validators.max(10000)]
    );

    this.inputForm.valueChanges
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(value => {
      this.cellList.forEach(el => el.duration = value);
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
  }

  onStart(): void {
    console.log('click');
    this.gameInProgress.set(true);
    this.inputForm.disable();
    this.resetRandomIndecies();
    this.gameTick();
  }

  onCellResult(result: GameCellResultEvent): void {
    this.score.mutate(value => {
      if(result.result) {
        value.player++;
      } else {
        value.computer++;
      }
    });

    if(this.score().computer === this._maxPoints) {
      this.resetGame();
      this.modalComputer.open();
    } else if(this.score().player === this._maxPoints) {
      this.resetGame();
      this.modalPlayer.open();
    } else {
      this.cellList[result.id].status = (result.result) ? GameCellStatus.User : GameCellStatus.Computer;
      this.gameTick();
    }
  }

  private gameTick(): void {
    const id = this.getRandomCellId();
    this.cellList[id] = {
      ...this.cellList[id],
      status: GameCellStatus.Active
    }
  }

  private resetGame(): void {
    this.score.set({computer: 0, player: 0});
    this.gameInProgress.set(false);
    for(let i = 0; i < this.cellList.length; i++){
      this.cellList[i] = {
        id: i,
        status: GameCellStatus.Inactive,
        duration: this._defaultDuration
      }
    }
  }

  private resetRandomIndecies(): void {
    this._randomIndecies = [];
    let tmp = 0;
    while(this._randomIndecies.length < 20) {
      tmp = this.randomInRange(0, 99);
      if(this._randomIndecies.indexOf(tmp) === -1) this._randomIndecies.push(tmp);
    }
    this._currentIndex.set(0);
  }

  private getRandomCellId(): number {
    const id = this._randomIndecies[this._currentIndex()];
    this._currentIndex.update(v => v + 1);
    return id;
  }

  private randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
