import IndexPage from '../pages/index'
import AuthSignInPage from '../pages/authSignIn'
import AuthManageDetailsPage from '../pages/authManageDetails'
import Page from '../pages/page'

context('SignIn', () => {
  beforeEach(() => {
    cy.task('reset')
  })

  it('Unauthenticated user directed to auth', () => {
    cy.task('stubAuthPing')
    cy.task('stubAuthSignInPage')
    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('Unauthenticated user navigating to sign in page directed to auth', () => {
    cy.task('stubAuthPing')
    cy.task('stubAuthSignInPage')
    cy.visit('/sign-in')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('User name visible in header', () => {
    cy.task('stubSignIn', { name: 'A TestUser' })
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.headerUserName().should('contain.text', 'A. Testuser')
  })

  it('Phase banner visible in header', () => {
    cy.task('stubSignIn')
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.headerPhaseBanner().should('contain.text', 'dev')
  })

  it('User can sign out', () => {
    cy.task('stubSignIn')
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.signOut().click()
    Page.verifyOnPage(AuthSignInPage)
  })

  it('User can manage their details', () => {
    cy.task('stubSignIn', { name: 'A TestUser' })
    cy.signIn()
    cy.task('stubAuthManageDetails')
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.manageDetails().click()
    Page.verifyOnPage(AuthManageDetailsPage)
  })

  it('Token verification failure takes user to sign in page', () => {
    cy.task('stubSignIn')
    cy.task('stubVerifyToken', false)
    cy.signIn({ failOnStatusCode: false })
    Page.verifyOnPage(AuthSignInPage)
  })

  it('Token verification failure clears user session', () => {
    cy.task('stubSignIn', { name: 'A TestUser' })
    cy.task('stubVerifyToken', false)
    cy.signIn({ failOnStatusCode: false })
    Page.verifyOnPage(AuthSignInPage)

    cy.task('stubSignIn', { name: 'Some OtherTestUser' })
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.headerUserName().should('contain.text', 'S. Othertestuser')
  })
})
