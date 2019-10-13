describe('Quiz Area', function() {
  beforeEach(() => {
    cy.visit('https://istvanamolnar.github.io')
    cy.wait(1000)
    cy.get('.okay-button').click()
    cy.get('.text')
      .type('i')
    cy.contains('play!').click()
  })

  it('checks url', () => {
    cy.url()
      .should('include', '/letsplay')
  })

  it('goes through 4 questions, opens explain modal', () => {
    for(let i = 0; i < 4; i++) {
      cy.wait(500)
      cy.get('.option')
        .should('have.length', '4')
        .each(($el) => {
          cy.wrap($el).click()
        })
      cy.wait(2000)
      cy.get('.explain').click()
      cy.wait(500)
      cy.get('.modal-content > .btn').click()
      cy.wait(500)
      cy.get('.next').click()
    }
  })
})