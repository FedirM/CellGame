
import { GameCellComponent } from './game-cell.component';
import { GameCellStatus, GameCellInput, GameCellResultEvent } from 'src/app/interfaces/game-cell.interface';

const defaultColor  = 'rgb(19, 78, 151)';
const activeColor   = 'rgb(203, 141, 26)';
const userColor     = 'rgb(23, 95, 26)';
const computerColor = 'rgb(188, 42, 13)';

const DEFAULT_INPUT = {
  id: 1,
  status: GameCellStatus.Inactive,
  duration: 300
};

const INPUT_ACTIVE: GameCellInput = {
  id: 1,
  status: GameCellStatus.Active,
  duration: 100
};


describe('GameCellComponent', () => {



  before(() => {
    const style = document.documentElement.style;
    style.setProperty('--default-cell-color', defaultColor);
    style.setProperty('--active-cell-color', activeColor);
    style.setProperty('--user-cell-color', userColor);
    style.setProperty('--computer-cell-color', computerColor);
  })

  it('should mount', () => {
    cy.mount(GameCellComponent, {
      componentProperties: {data: {...DEFAULT_INPUT}},
    })
  });

  it('should contain "div" element', () => {
    cy.mount(GameCellComponent, {
      componentProperties: {data: {...DEFAULT_INPUT}},
    })
    cy.get('[data-cy="cell"]').should('be.visible');
  });

  describe('Event tests', () => {

    const SUCCESS: GameCellResultEvent = {
      id: 1,
      result: true
    };

    const FAILURE: GameCellResultEvent = {
      id: 1,
      result: false
    };
    
    beforeEach(() => {
      console.log('Before each');
      cy.clock();
      cy.mount(GameCellComponent, { componentProperties: {data: {...INPUT_ACTIVE}} })
      .then(response => {
        cy.spy(response.component.onResult, 'emit').as('onResultSpy');
      });
    })

    it('should be failure if user missed the timing', () => {
      const waiting = INPUT_ACTIVE.duration + 1000;
      cy.tick(waiting)
        .get('[data-cy="cell"]')
        .click()
        .get('@onResultSpy')
        .should('have.been.calledWith', {...FAILURE})
    });

    it('should be success if user hitted in timing', () => {
      cy.tick(INPUT_ACTIVE.duration / 3)
        .get('[data-cy="cell"]')
        .click()
        .get('@onResultSpy')
        .should('have.been.calledWith', {...SUCCESS})
    });
  })


  describe('Behavior tests', () => {
    beforeEach(() => {
      console.log('Before each');
      cy.clock();
      cy.mount(GameCellComponent, { componentProperties: {data: {...INPUT_ACTIVE}} })
      .then(response => {
        cy.spy(response.component.onResult, 'emit').as('onResultSpy');
      });
    })

    afterEach(() => {
      cy.clock().then(clock => clock.restore());
    });

    it('should be blue by default', () => {
      cy.mount(GameCellComponent, {
        componentProperties: {data: DEFAULT_INPUT},
      })
      cy.get('[data-cy="cell"]').should('have.css', 'background-color', defaultColor);
    });

    it('should be orange while active', () => {
      cy.get('[data-cy="cell"]')
        .should('have.css', 'background-color', activeColor);
    });

    it('should be red if user missed the timing', () => {
      const waiting = INPUT_ACTIVE.duration + 1000;
      cy.tick(waiting)
        .get('[data-cy="cell"]')
        .click()
        .should('have.css', 'background-color', computerColor);
    });

    it('should be green if user hitted in timing', () => {
      cy.tick(INPUT_ACTIVE.duration / 3)
        .get('[data-cy="cell"]')
        .click()
        .should('have.css', 'background-color', userColor);
    });

  });
})