/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
    cy.get('[data-test="filter-items"]').as('filterInput');
  });

  describe('Adding a new item', () => {
    const newItem = 'Good attitude'
    beforeEach(() => {
      const inputEl = cy.get('[data-test="new-item-input"]')
      inputEl.type(newItem)
      inputEl.type('Cypress.io{enter}')
      // 다음과 같이 써도 무방
      // cy.get('form').submit()
      // cy.get('[data-test="add-item"]').click()
      // inputEl.type('Cypress.io{enter}')
    });

    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.contains(newItem)
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('@unpackedItems').contains(newItem)
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('@unpackedItems').find('li').last().contains(newItem)
    });
  });

  describe('Filtering items', () => {
    const filterWord = 'Tooth'
    beforeEach(() => {
      cy.get('@filterInput').type(filterWord)
    })

    it('should show items that match whatever is in the filter field', () => {
      // cy.get('[data-test="items"] li ').each((item) => {
      cy.get('@allItems').find('li').each((item) => {
        expect(item.text()).to.include(filterWord)
      })

      // cy.get('[data-test="items"]').contains('Tooth Brush')
      // cy.get('[data-test="items"]').contains('Tooth Paste')

      // cy.get('[data-test="items"]').contains(filterWord).should('exist')
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('@allItems').contains('iPhone Charger').should('not.exist')
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', async () => {
        cy.get('[data-test="remove-all"]').click()
        cy.get('@allItems').find('li').should('not.exist')

        // HELP: 왜 여기는 await를 써야 통과하는걸까
        // await cy.get('[data-test="remove-all"]').click()
        // cy.get('[data-test="items-unpacked"] ul ').should('not.exist')
        // cy.get('[data-test="items-packed"] ul').should('not.exist')
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('@allItems').find('li').find('[data-test="remove"]').should('exist')
      });

      it('should remove an item from the page', () => {
        cy.get('@allItems').find('li').each((item) => {
          cy.wrap(item).find('[data-test="remove"]').click()
          cy.wrap(item).should('not.exist')
        })

        // const removeItemName = 'Tooth Brush'
        // cy.get('[data-test="items-unpacked"]').contains(removeItemName)
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', async () => {
      await cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('@packedItems').find('ul').should('not.exist')
    });

    it('should have all of the items in the "Unpacked" list', () => {
      cy.get('@allItems').find('li')
        .its('length')
        .then((count) => {
          cy.get('[data-test="mark-all-as-unpacked"]').click();
          cy.get('@unpackedItems').find('li').its('length').should('eq', count);
        });
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      // alias
      cy.get('@unpackedItems').find('label').first().as('firstItem');
      cy.get('@firstItem').invoke('text').as('text');
      cy.get('@firstItem').find('input[type="checkbox"]').click();

      cy.get('@text').then((text) => {
        cy.get('@packedItems').find('label').first().should('include.text', text);
        // cy.get('@packedItems').find('label').first().invoke('text').should('eq', text)
      });

      /*
      const packedItemName = 'Tooth Brush'
      cy.get('[data-test="items"] li').contains(packedItemName).click()
      // cy.get('[data-test="items"] li').contains(packedItemName).find('input[type="checkbox"]').click()
      cy.get('[data-test="items-unpacked"]').contains(packedItemName).should('not.exist')
      cy.get('[data-test="items-packed"]').contains(packedItemName).should('exist')
      */

      // const firstItemName = 'Tooth Brush'
      // cy.get('input#item-1').click()
      // cy.get('[data-test="items-unpacked"]').contains(firstItemName).should('not.exist')
      // cy.get('[data-test="items-packed"]').contains(firstItemName).should('exist')
    });
  });
});
