/// <reference types="cypress" />

import '../support/commands-complete'

export const decodeToken = (token) => JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
export const encodeToken = (token) => Buffer.from(JSON.stringify(token)).toString('base64')

describe('Signing in with a seeded database', () => {
  beforeEach(() => {
    cy.setCookie('jwt', encodeToken({ id: 1, email: 'first@example.com' }))

    cy.intercept('GET', '/echo-chamber/api', { fixture: 'posts' }).as('postsApi')
    cy.intercept('GET', /\/echo-chamber\/api\/\d+/, { fixture: 'post' }).as('postApi')
    cy.intercept('GET', '/echo-chamber/api/users', { fixture: 'users' }).as('usersApi')

    cy.visit('/echo-chamber/posts')

    cy.fixture('posts').then(({ posts }) => cy.wrap(posts[0]).as('firstPost'))
  })

  /// <reference types="cypress" />

  describe('Signing in with a seeded database', () => {
    beforeEach(() => {
      cy.setCookie('jwt', encodeToken({ id: 1, email: 'first@example.com' }))

      cy.intercept('GET', '/echo-chamber/api', { fixture: 'posts' }).as('postsApi')
      cy.intercept('GET', /\/echo-chamber\/api\/\d+/, { fixture: 'post' }).as('postApi')
      cy.intercept('GET', '/echo-chamber/api/users', { fixture: 'users' }).as('usersApi')

      cy.intercept('POST', '/echo-chamber/api', {
        statusCode: 201,
        body: {
          post: {
            id: 401,
            content: 'Recently created post',
            createdAt: '2021-12-17T13:12:18.418Z',
            authorId: 220
          }
        }
      }).as('createPostApi')

      cy.visit('/echo-chamber/posts')

      cy.getData('post-create-content-input').as('newPostInput')
      cy.getData('post-create-submit').as('newPostSubmit')
      cy.getData('post-preview-list').find('article').as('previews')

      cy.fixture('posts').then(({ posts }) => cy.wrap(posts[0]).as('firstPost'))
    })

    it('should render the posts from the API', () => {
      cy.fixture('posts').then(({ posts }) => {
        cy.get('@previews').should('have.length', posts.length)
      })
    })

    it('should navigate to the URL of the post that you clicked on', () => {
      cy.get('@firstPost').then(post => {
        cy.get('[data-test="post-preview-list"] a').first().invoke('attr', 'href').should('contain', `/echo-chamber/posts/${post.id}`)
      })
    })

    it('should send a POST request when submitting the form', () => {
      cy.get('@newPostInput').type('some new posts')
      cy.get('@newPostSubmit').click()
      cy.wait('@createPostApi').then(interception => {
        expect(interception.request.method).to.equal( 'POST')
      })
    })

    describe('An individual post', () => {
      beforeEach(() => {
        cy.get('[data-test="post-preview-list"] a').first().click()
        cy.getData("post-detail-controls-edit-button").as('editBtn')
      })

      it('should show an edit field when you click on the edit button', () => {
        cy.get("@editBtn").click()
        cy.getData("post-detail-draft-content")
      })

      it('should send a PATCH request when you send your edit', () => {
        cy.get("@editBtn").click()
        cy.get('@newPostInput').type('some new posts')
        cy.get('@newPostSubmit').click()
        cy.intercept('@patchApi')
      })

      it('should send a DELETE request when click on the delete button', () => {
        cy.getData("post-detail-controls-delete-button").click()
        cy.intercept('DELETE', '/echo-chamber/api/*')
      })
    })
  })
})
