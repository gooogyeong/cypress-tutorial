/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter')
    cy.get('[data-test="items"]').as('allItems')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems')
    cy.get('[data-test="items-packed"]').as('packedItems')

    cy.get('[data-test="filter-items"]').as('filterInput')
  })

  it('should hold onto an alias', () => {
    cy.get('@unpackedItems').find('label').first().as('firstItem')
    cy.get('@firstItem').invoke('text').as('text')
    cy.get('@firstItem').find('input[type="checkbox"]').click()

    cy.get('@text').then((text) => {
      cy.get('@packedItems').find('label').first().should('include.text', text)
    })
  })

  it('should filter the items shown on the page', () => {
    cy.get('@filterInput').type('iPhone')

    cy.get('@allItems').should('contain.text', 'iPhone')
    cy.get('@allItems').should('not.contain.text', 'Hoodie')
  })

  it('should move items from one list to another', async () => {
    cy.get('@unpackedItems').find('label').first().as('itemToMoveLabel')
    const itemToMoveLabelText = await cy.get('@itemToMoveLabel').invoke('text')
    cy.get('@itemToMoveLabel').click()
    cy.get('@packedItems').contains(itemToMoveLabelText)

    // cy.get('@itemToMoveLabel').invoke('text').then(text => {
    //   cy.get('@itemToMoveLabel').click()
    //   cy.get('@packedItems').contains(text)
    // })
  })
})
