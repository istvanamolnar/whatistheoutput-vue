describe('Start Game', function() {
  beforeEach(() => {
    cy.visit('localhost:8080')
    cy.wait(1000)
    cy.get('.okay-button').click()
    cy.get('.manage-questions').click()
    cy.url()
      .should('include', '/manage')
    cy.wait(2000)
  })

  it('opens and checks new question modal', () => {
    cy.contains('Add new question').click()
      
  })
})