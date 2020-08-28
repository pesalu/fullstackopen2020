import { jsxClosingElement } from "@babel/types";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
          username, password
        }).then(response => {
          localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3002')
        });
});

Cypress.Commands.add('createBlog', (blog) => {
  let token = `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`;
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': token
    }
  }).then(response => {
    cy.visit('http://localhost:3002');
  });
});

Cypress.Commands.add('createBlog2', (blog) => {
  let P = `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`;
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': P
    }
  }).then(response => {
    cy.visit('http://localhost:3002');
  });
});