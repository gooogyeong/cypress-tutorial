/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      const newItem = 'Good attitude'
      cy.get('[data-test="new-item-input"]').type(newItem)
      cy.get('[data-test="add-item"]').click()
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      const newItem = 'Good attitude'
      const inputEl = cy.get('[data-test="new-item-input"]')
      inputEl.type(newItem)
      inputEl.type('Cypress.io{enter}')
      cy.get('[data-test="items-unpacked"]').contains(newItem)
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      const newItem = 'Good attitude'
      cy.get('[data-test="new-item-input"]').type(newItem)
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items-unpacked"]').last().contains(newItem)
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      const filterWord = 'Tooth'
      cy.get('[data-test="filter-items"]').type(filterWord)
      cy.get('[data-test="items-unpacked"]').contains(filterWord).should('exist')
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      const filterWord = 'Tooth'
      cy.get('[data-test="filter-items"]').type(filterWord)
      cy.get('[data-test="items-unpacked"]').contains('iPhone Charger').should('not.exist')
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', async () => {
        await cy.get('[data-test="remove-all"]').click()
        cy.get('[data-test="items-unpacked"] ul ').should('not.exist')
        cy.get('[data-test="items-packed"] ul').should('not.exist')
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="remove"]').should('exist')
      });

      it('should remove an item from the page', () => {
        const removeItemName = 'Tooth Brush'
        cy.get('[data-test="items-unpacked"]').contains(removeItemName)
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', async () => {
      await cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-packed"] ul').should('not.exist')
    });

    it('should have all of the items in the "Unpacked" list', () => {
      // TODO
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-unpacked"] ul').children().should('have.length', 5)
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      // TODO
      const firstItemName = 'Tooth Brush'
      cy.get('input#item-1').click()
      cy.get('[data-test="items-unpacked"]').contains(firstItemName).should('not.exist')
      cy.get('[data-test="items-packed"]').contains(firstItemName).should('exist')
    });
  });
});
