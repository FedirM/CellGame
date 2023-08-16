import { Component, Input, OnChanges } from '@angular/core';
import { Score } from 'src/app/interfaces/score.interface';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnChanges {

  @Input() score: Score

  ngOnChanges() {
    console.log('Update score: ', this.score);
  }
}
export { Score };

