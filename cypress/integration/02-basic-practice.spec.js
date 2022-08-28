/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
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
      cy.get('[data-test="items-unpacked"]').contains(newItem)
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="items-unpacked"] li').last().contains(newItem)
    });
  });

  describe('Filtering items', () => {
    const filterWord = 'Tooth'
    beforeEach(() => {
      cy.get('[data-test="filter-items"]').type(filterWord)
    })

    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="items"] li ').each((item) => {
        expect(item.text()).to.include(filterWord)
      })

      // cy.get('[data-test="items"]').contains('Tooth Brush')
      // cy.get('[data-test="items"]').contains('Tooth Paste')

      // cy.get('[data-test="items"]').contains(filterWord).should('exist')
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="items"]').contains('iPhone Charger').should('not.exist')
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', async () => {
        cy.get('[data-test="remove-all"]').click()
        cy.get('[data-test="items"] li').should('not.exist')

        // HELP: 왜 여기는 await를 써야 통과하는걸까
        // await cy.get('[data-test="remove-all"]').click()
        // cy.get('[data-test="items-unpacked"] ul ').should('not.exist')
        // cy.get('[data-test="items-packed"] ul').should('not.exist')
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li [data-test="remove"]').should('exist')
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items"] li').each((item) => {
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
      cy.get('[data-test="items-packed"] ul').should('not.exist')
    });

    it('should have all of the items in the "Unpacked" list', () => {
      // TODO
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-unpacked"] ul').children().should('have.length', 5)
    });
  });

  describe('Mark individual item as packed', () => {
    it.only('should move an individual item from "Unpacked" to "Packed"', () => {
      // HELP
      const packedItemName = 'Tooth Brush'
      cy.get('[data-test="items"] li').contains(packedItemName).find('input[type="checkbox"]').click()
      cy.get('[data-test="items-unpacked"]').contains(packedItemName).should('not.exist')
      cy.get('[data-test="items-packed"]').contains(packedItemName).should('exist')

      // const firstItemName = 'Tooth Brush'
      // cy.get('input#item-1').click()
      // cy.get('[data-test="items-unpacked"]').contains(firstItemName).should('not.exist')
      // cy.get('[data-test="items-packed"]').contains(firstItemName).should('exist')
    });
  });
});
