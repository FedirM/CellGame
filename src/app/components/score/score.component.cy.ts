import { ScoreComponent } from './score.component'

describe('ScoreComponent', () => {

  it('Should mount', () => {
    cy.mount(ScoreComponent, {
      componentProperties: {
        score: {player: 0, computer: 0}
      }
    })
  })

  it('Should have player score', () => {
    cy.mount(ScoreComponent, {
      componentProperties: {
        score: {player: 0, computer: 0}
      }
    }).get('[data-cy="player"]')
      .contains('Player')
  })

  it('Should have computer score', () => {
    cy.mount(ScoreComponent, {
      componentProperties: {
        score: {player: 0, computer: 0}
      }
    }).get('[data-cy="computer"]')
      .contains('Computer')
  })
})