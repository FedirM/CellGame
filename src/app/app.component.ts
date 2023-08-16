import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GameCellInput, GameCellResultEvent, GameCellStatus } from './interfaces/game-cell.interface';
import { Score } from './interfaces/score.interface';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
  private _randomIndecies: Array<number>;
  private _currentIndex = signal(0);
  private _defaultDuration = 1500;

  inputForm: FormControl; 
  
  score = signal<Score>({player: 0, computer: 0});
  cellList = new Array<GameCellInput>(100);

  constructor() {
    //Default initialisation
    for(let i = 0; i < this.cellList.length; i++){
      this.cellList[i] = {
        id: i,
        status: GameCellStatus.Inactive,
        duration: this._defaultDuration
      }
    }
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
    console.log('OnStart');
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

    if(this.score().computer === 10 || this.score().player === 10) {
      console.log('END GAME');
      // TODO: call modal
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

  private resetRandomIndecies(): void {
    this._randomIndecies = [];
    let tmp = 0;
    while(this._randomIndecies.length < 20) {
      tmp = this.randomInRange(0, 99);
      if(this._randomIndecies.indexOf(tmp) === -1) this._randomIndecies.push(tmp);
    }
    this._currentIndex.set(0);
    console.log('Reset: ', this._randomIndecies);
  }

  private getRandomCellId(): number {
    const id = this._randomIndecies[this._currentIndex()];
    console.log('GET ID: ', this._currentIndex());
    console.log('RAND : ', id);
    this._currentIndex.update(v => v + 1);
    return id;
  }

  private randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
