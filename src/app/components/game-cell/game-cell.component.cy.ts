import { createOutputSpy } from 'cypress/angular';
import { GameCellComponent } from './game-cell.component';
import { GameCellInput, GameCellResultEvent } from 'src/app/interfaces/game-cell.interface';

describe('GameCellComponent', () => {
  it('should mount', () => {
    cy.mount(GameCellComponent)
  });

  it('should contain "div" element', () => {
    cy.mount(GameCellComponent)
    cy.get('div').should('be.visible');
  });
})