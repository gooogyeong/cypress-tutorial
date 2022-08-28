/// <reference types="cypress" />

describe('Input obstacles', () => {
  before(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';
    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', async () => {
    const selectedItem = 'Thor'
    await cy.get('[data-test="select-input"]').select(selectedItem);
    cy.get('[data-test="select-result"]').should('have.value', selectedItem);
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').check();
    cy.get('[data-test="checkbox-result"]').contains('Tomato');
    // cy.get('[data-test="checkbox-result"]');
  });

  it('should find and control a radio input', async () => {
    await cy.get('[data-test="radio-ringo"]').trigger('input');
    // await cy.get('[data-test="radio-ringo"]').click();
    // await cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').should('have.value', 'Ringo');
  });

  it('should find and control a color input', async () => {
    // TODO
    const targetColor = '#05e697'
    await cy.get('[data-test="color-input"]').invoke('val', targetColor).trigger('input');
    cy.get('[data-test="color-result"]').should('have.value', targetColor);
  });

  it('should find and control a date input', async () => {
    const thisChristmas = '2022-12-25'
    await cy.get('[data-test="date-input"]').invoke('val', thisChristmas).trigger('input');
    // await cy.get('[data-test="date-input"]').type(thisChristmas);
    cy.get('[data-test="date-result"]').should('have.value', thisChristmas);
  });

  it('should find and control a range input', async () => {
    const targetRange = '7'
    await cy.get('[data-test="range-input"]').invoke('val', targetRange).trigger('input');
    cy.get('[data-test="range-result"]').should('have.value', targetRange);
  });

  it.only('should find and control a file input', () => {
    const exampleFile = 'bulbasaur.json'
    cy.get('input[type="file"]').attachFile(exampleFile);
    cy.get('[data-test="file-result"]').contains(exampleFile)
  });
});
