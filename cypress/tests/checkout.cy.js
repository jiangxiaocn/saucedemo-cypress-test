///<reference types="cypress"/>
import strings from "../constants/strings";

describe('add product to cart', () => {

  it('add product to cart and checkout', () => {
    cy.visit('/')
    cy.login(Cypress.env('username'),Cypress.env('password'))

    // Capture product information from the inventory page
    cy.getByDataTest('inventory-item-description').first().then($description => {
      cy.wrap($description.find('.inventory_item_price').text()).as('productPrice');
      cy.wrap($description.find('.inventory_item_name').text()).as('productTitle');
      cy.wrap($description.find('.inventory_item_desc').text()).as('productDescription');
  })

    cy.getByDataTest('add-to-cart-sauce-labs-backpack').click()
    cy.getByDataTest('shopping-cart-link').click()
    cy.url().should('contain', '/cart.html')

    // Validate product information on the cart page
    validateProductInfo('cart-contents-container')

    cy.getByDataTest('checkout').click()
    cy.url().should('contain', 'checkout-step-one.html')
    cy.getByDataTest('firstName').type(Cypress.env('firstname'))
    cy.getByDataTest('lastName').type(Cypress.env('lastName'))
    cy.getByDataTest('postalCode').type(Cypress.env('postalCode'))
    cy.getByDataTest('continue').click()
    cy.url().should('contain', 'checkout-step-two.html')

    // Validate product information on the checkout overview page
    validateProductInfo('checkout-summary-container')

    cy.getByDataTest('finish').click()
    cy.contains(strings.checkoutSuccess)
  })

  const validateProductInfo = (context) => {
    cy.get('@productTitle').then((productTitle) => {
      cy.getByDataTest(`${context}`).find('.inventory_item_name').should('have.text', productTitle);
    
    });

    cy.get('@productDescription').then((productDescription) => {
        cy.getByDataTest(`${context}`).find('.inventory_item_desc').should('have.text', productDescription);
    });

    cy.get('@productPrice').then((productPrice) => {
        cy.getByDataTest(`${context}`).find('.inventory_item_price').should('have.text', productPrice);
    });
};

})