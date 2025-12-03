describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
});

it('registration', function () {
  cy.visit('https://burnbyte.onrender.com/')
  cy.get('#root nav.flex > a[href="/registration"]').click();
  cy.get('#root input[placeholder="Username"]').click();
  cy.get('#root input[placeholder="Username"]').type('johndoe1');
  cy.get('#root input[placeholder="Email"]').type('john1@doe.com');
  cy.get('#root input[placeholder="Password"]').type('password');
  cy.get('#root input[placeholder="Retype Password"]').type('password');
  cy.get('#root button.frontend-button').click();
});

it('body calculator', function () {
  cy.visit('https://burnbyte.onrender.com/')
  cy.get('#root div.justify-center a[href="/login"]').click();
  cy.get('#root input[placeholder="Email"]').click();
  cy.get('#root input[placeholder="Email"]').type('john@doe.com');
  cy.get('#root input[placeholder="Password"]').type('password');
  cy.get('#root button.frontend-button').click();
  cy.get('input[type="number"]').eq(0).clear().type('60');
  cy.get('input[type="number"]').eq(1).clear().type('170');
  cy.get('input[type="number"]').eq(2).clear().type('25');
  cy.get('select').eq(0).select('female');
  cy.get('select').eq(1).select('1.375');
  cy.get('#root div.calorie-calculator button.frontend-button').click();
});

it('add food', function () {
  cy.visit('https://burnbyte.onrender.com/')
  cy.get('#root div.container nav.flex').click();
  cy.get('#root nav.flex > a[href="/login"]').click();
  cy.get('#root input[placeholder="Email"]').click();
  cy.get('#root input[placeholder="Email"]').type('john@doe.com');
  cy.get('#root input[placeholder="Password"]').type('password');
  cy.get('#root button.frontend-button').click();
  cy.get('#root input[placeholder="Food name"]').click();
  cy.get('#root input[placeholder="Food name"]').type('grapes');
  cy.get('#root input[placeholder="Calories"]').click();
  cy.get('#root input[placeholder="Calories"]').type('10');
  cy.get('#root div.food-intake-container button.frontend-button').click();
  cy.get('#root div:nth-child(3) > div.food-actions > button.add-calories-btn').click();
  cy.get('#root div:nth-child(4) button.add-calories-btn').click();
  cy.get('#root div.calorie-calculator button.frontend-button').click();

});

it('navigation and logout', function() {
  cy.visit('https://burnbyte.onrender.com/')
  cy.get('#root div.justify-center a[href="/login"]').click();
  cy.get('#root input[placeholder="Email"]').click();
  cy.get('#root input[placeholder="Email"]').type('john@doe.com');
  cy.get('#root input[placeholder="Password"]').type('password');
  cy.get('#root button.frontend-button').click();
  cy.get('#root a:nth-child(2)').click();
  cy.get('#root nav.flex > a[href="/history"]').click();
  cy.get('#root nav.flex > a[href="/logout"]').click();
  cy.get('#root button[type="submit"]').click();
  
});







