import IndexPage from '../pages/index'
import Page from '../pages/page'

context('Index page', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.signIn()
  })

  it('renders the index page', () => {
    Page.verifyOnPage(IndexPage)
  })
})
