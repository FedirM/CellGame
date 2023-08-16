import { Component, Input, Output, EventEmitter, OnChanges, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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

  @ViewChild('cell', {static: true}) element: ElementRef;

  private start: number;

  constructor(){}

  ngOnChanges(): void {
    if(this.data.status === GameCellStatus.Active) {
      this.start = Date.now();
    }

    setTimeout(() => {
      if(this.data.status === GameCellStatus.Active) {
        this.data.status = GameCellStatus.Computer;
        this.onResult.emit({id: this.data.id, result: false});
      }
    }, this.data.duration);
  }

  onClick(): void {
    if(this.data.status !== GameCellStatus.Active) return;
    const delta = Date.now() - this.start;
    if(delta < this.data.duration) {
      this.data.status = GameCellStatus.User;
      this.onResult.emit({id: this.data.id, result: true});
    } else {
      this.data.status = GameCellStatus.Computer;
      this.onResult.emit({id: this.data.id, result: false});
    }
  }

  isActive() {
    return this.data.status === GameCellStatus.Active
  }

  isUserOwner() {
    return this.data.status === GameCellStatus.User
  }

  isComputerOwner() {
    return this.data.status === GameCellStatus.Computer
  }
}
