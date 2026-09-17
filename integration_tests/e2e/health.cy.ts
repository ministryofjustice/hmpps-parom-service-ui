context('Health', () => {
  beforeEach(() => {
    cy.task('reset')
  })

  context('All healthy', () => {
    beforeEach(() => {
      cy.task('stubAuthPing')
      cy.task('stubTokenVerificationPing')
      cy.task('stubParomPing')
      cy.task('stubNdeliusIntegrationPing')
      cy.task('stubProbationAccessControlPing')
    })

    it('Health check is accessible and status is UP', () => {
      cy.request('/health').its('body.status').should('equal', 'UP')
    })

    it('Ping is accessible and status is UP', () => {
      cy.request('/ping').its('body.status').should('equal', 'UP')
    })

    it('Info is accessible', () => {
      cy.request('/info').its('body.build.name').should('equal', 'hmpps-parom-service-ui')
    })
  })

  context('Some unhealthy', () => {
    it('Health check status is down for 1 api', () => {
      cy.task('stubAuthPing')
      cy.task('stubTokenVerificationPing', 500)
      cy.task('stubParomPing')
      cy.task('stubNdeliusIntegrationPing')
      cy.task('stubProbationAccessControlPing')

      cy.request({ url: '/health', failOnStatusCode: false }).then(response => {
        expect(response.body.status).to.equal('DOWN')
        expect(response.body.components.hmppsAuth.status).to.equal('UP')
        expect(response.body.components.tokenVerification.status).to.equal('DOWN')
        expect(response.body.components.tokenVerification.details.status).to.equal(500)
        expect(response.body.components.tokenVerification.details.attempts).to.equal(3)
        const downCount = Object.values(response.body.components as Record<string, { status: string }>).reduce(
          (count, api) => (api.status === 'DOWN' ? count + 1 : count),
          0,
        )
        expect(downCount).to.equal(1)
      })
    })
  })
})
