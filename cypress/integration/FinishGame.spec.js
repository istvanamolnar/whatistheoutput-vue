describe('Quiz Area', function() {
  beforeEach(() => {
    cy.visit('localhost:8080')
    cy.wait(1000)
    cy.get('.okay-button').click()
    cy.get('.text')
      .type('i')
    cy.contains('play!').click()

    for(let i = 0; i < 4; i++) {
      cy.wait(500)
      cy.get('.option')
        .each(($el) => {
          cy.wrap($el).click()
        })
      cy.wait(2000)
      cy.get('.next').click()
    }
  })
  it('opens summary', () => {
    cy.wait(500)
    cy.contains('SUMMARY').click()
    cy.wait(500)
    cy.get('.close-summary').click()
    cy.wait(500)
    cy.contains('OPEN').click()
    cy.wait(500)
    cy.get('.btn-outline-danger').click()
    cy.wait(500)
    cy.get('.btn-outline-danger').click()
    cy.wait(500)
    cy.contains('cheers').click()
    cy.contains('New game').click()
  })
})