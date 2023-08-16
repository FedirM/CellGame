import { Component, Input } from '@angular/core';
import { Score } from 'src/app/interfaces/score.interface';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  @Input() score: Score
}


