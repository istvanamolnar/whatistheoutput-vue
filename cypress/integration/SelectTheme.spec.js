describe('Start Game', function() {
  beforeEach(() => {
    cy.visit('localhost:8080')
    cy.wait(1000)
    cy.get('.okay-button').click()
  })

  it('clicks on gear icon, which navigates to /manage endpoint', () => {
    cy.get('.manage-questions').click()
    cy.url()
      .should('include', '/manage')
    cy.wait(2000)
    cy.get('.manage-questions').click()
  })

  it('iterates through the themes', () => {
    cy.get('.theme')
    .each(($el) => {
      cy.wrap($el).click()
      cy.wait(300)
      cy.get('.h3').should('have.css', 'background-color', $el.context.alt[0] === 'd' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)')
      cy.get('.num-of-questions').should('have.css', 'background-color', $el.context.alt[0] === 'd' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)')
      cy.get('.text').should('have.css', 'background-color', $el.context.alt[0] === 'd' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)')
    })
  })

  it('checks name field background color toggle @click, if name field is null', () => {
    cy.get('.text')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0.6)')
    for (let i = 0; i < 4; i++) {
      cy.get('.letsplay').click()
      cy.get('.text')
      .should('have.css', 'background-color', 'rgba(255, 255, 255, 0.6)')
      cy.get('.letsplay').click()
      cy.get('.text')
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0.6)')
    }
  })

  it('changes range value and checks color of number', () => {
    cy.get('.bar')
      .should('have.value', '4')
    cy.get('#rangevalue')
      .should('have.css', 'color', 'rgb(60, 167, 68)')
    cy.wait(1000)

    cy.get('input[type="range"]')
      .invoke('val', 9)
      .trigger('change', { force: true })
      .trigger('mousemove', { force: true })
      .should('have.value', '9')
    cy.get('#rangevalue')
      .should('have.css', 'color', 'rgb(255, 213, 0)')
    cy.wait(1000)

    cy.get('input[type="range"]')
      .invoke('val', 12)
      .trigger('change', { force: true })
      .trigger('mousemove', { force: true })
      .should('have.value', '12')
    cy.get('#rangevalue')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('enters name, starts game', () => {
    cy.get('.text')
      .type('i')
      .should('have.value', 'i')
    cy.contains('play!').click()
  })
})