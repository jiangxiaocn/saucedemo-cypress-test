// cypress/helpers/productHelpers.js

// Capture product information from the inventory page
export const captureProductDetails = () => {
    cy.getByDataTest('inventory-item-description').first().then($description => {
      const productDetails = {
        title: $description.find('.inventory_item_name').text(),
        price: $description.find('.inventory_item_price').text(),
        description: $description.find('.inventory_item_desc').text(),
      };
      cy.wrap(productDetails).as('productDetails');
    });
  };
  

  export const validateProductInfo = (context) => {
    cy.get('@productDetails').then(({ title, description, price }) => {
      cy.getByDataTest(`${context}`).find('.inventory_item_name').should('have.text', title);
      cy.getByDataTest(`${context}`).find('.inventory_item_desc').should('have.text', description);
      cy.getByDataTest(`${context}`).find('.inventory_item_price').should('have.text', price);
    });
  };