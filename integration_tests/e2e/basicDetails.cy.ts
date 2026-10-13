context('Basic details page', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn', { roles: ['PAROM_USER'] })
    cy.signIn()
  })

  it('loads for a valid PAROM id', () => {
    cy.request('/basic-details/00000000-0000-0000-0000-000000000001').its('status').should('equal', 200)
  })

  it('returns 404 for an unknown PAROM id', () => {
    cy.request({ url: '/basic-details/00000000-0000-0000-0000-000000000002', failOnStatusCode: false })
      .its('status')
      .should('equal', 404)
  })
})
