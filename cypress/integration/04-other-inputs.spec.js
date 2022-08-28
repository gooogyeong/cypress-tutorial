 /// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it('should set the range and verify it', () => {
    const rating = '7'
    cy.get('@rating-filter').invoke('val', rating).trigger('input')
    cy.get('@rating-filter').should('have.value', rating)
  });

  it('should check the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').as('checkbox').check() // as() is like pass-through
    cy.get('@checkbox').should('be.checked')
  });

  it('should select an option from the select and verify it', () => {
    const restaurant = 'Taco Bell'
    cy.get('@restaurant-filter').select(restaurant)
    cy.get('@restaurant-filter').should('have.value', restaurant)
  });
});
