/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber')
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
      cy.get('[data-test="sign-in"]').click();
      cy.location('pathname').should('contain', 'sign-in');
  });

  it.only('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test="sign-up"]').click();
    cy.location('pathname').should('contain', 'sign-up');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
  });

  it('should require an email', () => {});

  it('should require that the email actually be an email address', () => {});

  it('should require a password when the email is present', () => {});
});
