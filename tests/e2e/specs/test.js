// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy
      .visit('/')
      .get('img')
      .should('have.class', 'theme')
      .get('#rangevalue')
      .should('have.class', 'bar')
  })
})
