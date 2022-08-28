/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter')
  })

  it('should have a form', () => {
    cy.get('form').should('exist')
  })

  // it('should have a form', () => {
  //   cy.get('formm').should('not.exist')
  // })

  it('should be able to take user input', () => {
    cy.get('[data-test="new-item-input"]').type('Good attitude')
  })

  it('should have the words "Add Item"', () => {
    cy.contains('Add Item')
  })
})
