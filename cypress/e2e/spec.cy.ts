describe('my cool spec', () => {
  it('should work', () => {
    cy.visit('/')
    cy.contains('Dashboard').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome to the dashboard.')
    cy.contains('Demo Key: a-fake-key')

    // Get an input, type into it
    cy.get('[data-username]').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('[data-username]').should('have.value', 'fake@email.com')

    cy.contains('Hi there, fake@email.com!').should('not.exist')
    cy.get('[data-password]').type('abcde{enter}')
    cy.contains('Hi there, fake@email.com!')
  })
})