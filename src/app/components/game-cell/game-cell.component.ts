import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GameCellInput, GameCellResultEvent } from 'src/app/interfaces/game-cell.interface';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCellComponent implements AfterViewInit{

  @Input() data: GameCellInput;
  @Output() onResult = new EventEmitter<GameCellResultEvent>();

  constructor(){}

  ngAfterViewInit(): void {
    console.log('Data', this.data);

  }
}
