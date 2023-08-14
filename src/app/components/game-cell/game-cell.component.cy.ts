import { createOutputSpy } from 'cypress/angular';
import { GameCellComponent } from './game-cell.component'

describe('GameCellComponent', () => {
  it('should mount', () => {
    cy.mount(GameCellComponent)
  });

  it('should respond to OnClick event', () => {
    cy.mount(
      '<app-game-cell (click)="onClick.emit($event)"></app-game-cell>',
      {
        componentProperties: {
          onClick: createOutputSpy('onClickSpy')
        }
      }
    )
    
    cy.get('div').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
})