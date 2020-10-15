import {initDb} from './e2e-test-helpers';

describe('Blog app', function() {
  beforeEach(function() {
    initDb();
    cy.visit('http://localhost:3002');
  })

  it('Login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-field').type('Pedro');
      cy.get('#password-field').type('SALSA');
      cy.get('#login-button').click();

      cy.contains('Superuser logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username-field').type('Pedro');
      cy.get('#password-field').type('SALSA222');
      cy.get('#login-button').click();

      cy.get('#logged-in-message').should('not.exist');
      cy.get('#error-message').should('exist');
      cy.contains('Wrong credentials');
    });
  });


  describe('When logged in', function() {
    beforeEach(function() {
      cy.server();
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'Pedro', password: 'SALSA'
      }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3002');
      });
    });

    it('creating new blog is possible and blog can be liked', function() {
      cy.contains('New blog').click();
      cy.get('#titleField').type('Koiviston konklaavi');
      cy.get('#authorField').type('Smede Masanen');
      cy.get('#urlField').type('booky.com');
      cy.get('#submitButton').click();

      cy.get('#titleText').contains('Koiviston konklaavi');
      cy.get('#authorText').contains('Smede Masanen');

      cy.get('#showDetailsButton').click();
      cy.get('#blogLikeButton').click();
      cy.get('#numberOfLikesText').contains('1 likes');
    });

    describe('when blog is created', function() {
      beforeEach(function() {
        cy.contains('New blog').click();
        cy.get('#titleField').type('Koiviston konklaavi');
        cy.get('#authorField').type('Smede Masanen');
        cy.get('#urlField').type('booky.com');
        cy.get('#submitButton').click();
  
        cy.get('#titleText').contains('Koiviston konklaavi');
        cy.get('#authorText').contains('Smede Masanen');
      });
      it.only('the blog can be removed by its creator', function() {
        cy.get('#showDetailsButton').click();
        cy.get('#blogDeletionButton').click();
      });
    });

    describe('when blogs are created', function() {
      beforeEach(function() {
        cy.createBlog2({ title: 'Blog 1', author: 'Kalle Kekkonen', url: 'booky.com', likes: 1 });
        cy.createBlog({ title: 'Blog 2', author: 'Kalle Kekkonen', url: 'booky.com', likes: 2 });
        cy.createBlog({ title: 'Blog 3', author: 'Kalle Kekkonen', url: 'booky.com', likes: 3 });
        cy.createBlog({ title: 'Blog 4', author: 'Kalle Kekkonen', url: 'booky.com', likes: 4 });
      });
      it('blogs are sorted in a descending order by likes ', function() {
        cy.get('.author').each((item, index) => {
          console.log('TITLE ', item)
        })
      });
    });

  });
})