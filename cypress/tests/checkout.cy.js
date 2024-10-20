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

    // Validate product information on the cart page
    validateProductInfo('cart-contents-container')

    cy.getByDataTest('checkout').click()
    cy.getByDataTest('firstName').type('xiao')
    cy.getByDataTest('lastName').type('jiang')
    cy.getByDataTest('postalCode').type('12067')
    cy.getByDataTest('continue').click()


    // Validate product information on the checkout overview page
    validateProductInfo('checkout-summary-container')

    cy.getByDataTest('finish').click()
    cy.contains('Thank you for your order!')
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