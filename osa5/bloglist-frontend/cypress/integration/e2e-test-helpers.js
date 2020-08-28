let initDb = () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  const user = {
    name: 'Superuser',
    username: 'Pedro',
    password: 'SALSA'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user);

  const user2 = {
    name: 'Apostle2',
    username: 'Johannes',
    password: 'BURRITO'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user2);
};

export { initDb };