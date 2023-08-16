import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { GameCellInput, GameCellResultEvent, GameCellStatus } from 'src/app/interfaces/game-cell.interface';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCellComponent implements OnChanges{

  @Input() data: GameCellInput;
  @Output() onResult = new EventEmitter<GameCellResultEvent>();

  private start: number;

  constructor(){}

  ngOnChanges(): void {
    if(this.isActive()) {
      console.log('Data', this.data);
      this.start = Date.now();
      console.log('Start: ', this.start);
    }
  }

  onClick(): void {
    if(this.data.status !== GameCellStatus.Active) return;
    console.log('Click: ', Date.now());
    const delta = Date.now() - this.start;
    console.log('Delta: ', delta);
    if(delta < this.data.duration) {
      this.data.status = GameCellStatus.User;
      this.onResult.emit({id: this.data.id, result: true});
    } else {
      this.data.status = GameCellStatus.Computer;
      this.onResult.emit({id: this.data.id, result: false});
    }
  }

  isActive(): boolean {
    return this.data.status === GameCellStatus.Active;
  }

  isUserOwner(): boolean {
    return this.data.status === GameCellStatus.User;
  }

  isComputerOwner(): boolean {
    return this.data.status === GameCellStatus.Computer;
  }
}
