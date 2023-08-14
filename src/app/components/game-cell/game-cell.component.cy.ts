import { createOutputSpy } from 'cypress/angular';
import { GameCellComponent } from './game-cell.component';
import { GameCellInput, GameCellResultEvent } from 'src/app/interfaces/game-cell.interface';

describe('GameCellComponent', () => {

  const defaultColor  = 'rgb(19, 78, 151)';
  const activeColor   = 'rgb(203, 141, 26)';
  const userColor     = 'rgb(23, 95, 26)';
  const computerColor = 'rgb(188, 42, 13)';

  before(() => {
    const style = document.documentElement.style;
    style.setProperty('--default-cell-color', defaultColor);
    style.setProperty('--active-cell-color', activeColor);
    style.setProperty('--user-cell-color', userColor);
    style.setProperty('--computer-cell-color', computerColor);

    const compStyle = getComputedStyle(document.documentElement);
    console.log('DEFAULT: ', compStyle.getPropertyValue('--default-cell-color'));
  })

  it('should mount', () => {
    cy.mount(GameCellComponent)
  });

  it('should contain "div" element', () => {
    cy.mount(GameCellComponent)
    cy.get('div').should('be.visible');
  });

  describe('Behavior (inactive) test', () => {

    const INPUT_INACTIVE: GameCellInput = {
      id: 1,
      isActive: false,
      duration: 300
    }

    it('should be blue by default', () => {
      cy.mount(GameCellComponent, { componentProperties: {data: INPUT_INACTIVE}})
      cy.get('div').should('have.css', 'background-color', defaultColor)
    })

  })

  describe('Behavior (active) tests', () => {
    const INPUT_ACTIVE: GameCellInput = {
      id: 1,
      isActive: true,
      duration: 300
    };

    const SUCCESS: GameCellResultEvent = {
      id: 1,
      result: true
    };

    const FAILURE: GameCellResultEvent = {
      id: 1,
      result: false
    };
    
    
    beforeEach(() => {
      cy.mount(GameCellComponent, { componentProperties: {data: INPUT_ACTIVE} })
      .then(response => {
        cy.spy(response.component.onResult, 'emit').as('onResultSpy');
      });
    })

    it('should be orange while active', () => {
      cy.get('div', { timeout: (INPUT_ACTIVE.duration / 3) })
        .should('have.css', 'background-color', activeColor)
    })

    it('should be green if user hitted in timing', () => {
      cy.get('div', { timeout: 40 })
        .click()
        .should('have.css', 'background-color', userColor)
    })

    it('should be red if user missed the timing', () => {
      cy.get('div', { timeout: INPUT_ACTIVE.duration + 10 })
        .click()
        .should('have.css', 'background-color', computerColor)
    })

  });
})