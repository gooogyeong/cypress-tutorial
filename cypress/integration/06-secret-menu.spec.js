/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread'
]

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder'
]

const ratings = [1, 2, 3, 4, 5, 6, 7]
// let minRange
// let maxRange
// let ratings = []

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu')
    //
    // cy.get('#minimum-rating-visibility').as('rating-input')
    // cy.get('@rating-input').then((inputEl) => {
    //   minRange = Number(inputEl.attr('min'))
    //   maxRange = Number(inputEl.attr('max'))
    //   ratings = new Array(maxRange).fill(true).map((item, idx) => idx + 1)
    //   ratings.slice(0, minRange)
    //   console.log(ratings)
    //   console.log('minRange', minRange)
    //   console.log('maxRange', maxRange)
    // })
  })

  it('should have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items')
  })

  for (const property of properties) {
    it(`should have a column for ${property}`, () => {
      cy.get(`#${property}-column`)
    })

    it(`should hide column if unchecked`, () => {
      cy.get(`#show-${property}`).click()
      cy.get(`#${property}-column`).should('be.hidden')
    })
  }

  for (const restaurant of restaurants) {
    it(`should only display rows that match`, () => {
      cy.get('#restaurant-visibility-filter').select(restaurant)
      cy.get('td[headers="whereToOrder-column"]').should('contain', restaurant)
    })
  }

  for (const rating of ratings) {
    it.only('should only display restaurants with matching rating', async () => {
      await cy.get('#minimum-rating-visibility').invoke('val', rating).trigger('input')
      // cy.get('td[headers="popularity-column"]').invoke('text').should('be', rating)
      cy.get('td.popularity').each((el) => {
        expect(Number(el.text())).to.be.gte(rating) // greater than or equal to
      })
    })
  }
})
