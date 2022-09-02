/// <reference types="cypress" />

describe('Dog Facts', () => {
  beforeEach(() => {
    cy.visit('/dog-facts');

    cy.get('[data-test="fetch-button"]').as('fetchButton');
    cy.get('[data-test="clear-button"]').as('clearButton');
    cy.get('[data-test="amount-select"]').as('amountSelect');
    cy.get('[data-test="empty-state"]').as('emptyState');

    cy.intercept('/dog-facts/api?*').as('api');
  });

  it('should start out with an empty state', () => {
    cy.get('@emptyState');
  });

  it('should make a request when the button is called', () => {
    cy.get('@fetchButton').click()
    cy.wait('@api')
  });

  it('should adjust the amount when the select is changed', () => {
    const amount = 4
    cy.get('@amountSelect').select(String(amount))
    cy.get('@fetchButton').click()
    // #1
    // cy.wait('@api').its('request.url').should('contain', `amount=${amount}`)
    // #2 more explicit
    cy.wait('@api').then((interception) => {
      expect(interception.request.url).to.match(/\?amount=4$/)
    })
  });

  it('should show the correct number of facts on the page', () => {
    const amount = 4
    cy.get('@amountSelect').select(String(amount))
    cy.get('@fetchButton').click()
    // #1
    // cy.get('#facts article').should('have.length', amount)
    // #2
    cy.get('[data-test="dog-fact"]').should('have.length', amount)
  });

  it('should clear the facts when the "Clear" button is pressed', () => {
    cy.get('@fetchButton').click()
    cy.wait('@api')
    cy.get('@clearButton').click()
    cy.get('@emptyState');
  });

  it("should reflect the number of facts we're looking for in the title", () => {
    const amount = 4
    cy.visit(`/dog-facts?amount=${amount}`)
    cy.get('@amountSelect').should('contain.text', amount)
    cy.title().should('equal', `${amount} Dog Facts`)

    const newAmount = 6
    cy.get('@amountSelect').select(String(newAmount))
    cy.get('@fetchButton').click()
    cy.title().should('equal', `${newAmount} Dog Facts`)
  });
});
