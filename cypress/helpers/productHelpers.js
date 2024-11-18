// cypress/helpers/productHelpers.js

import { productTitle } from "../constants/productTitle";

// Capture product information from the inventory page
export const captureProductDetails = (productTitle) => {
  cy.getByDataTest('inventory-item-description').each(($description) => {
    const title = $description.find('.inventory_item_name ').text();
    if (title == productTitle) {
      const productDetails = {
        title: $description.find('.inventory_item_name').text(),
        price: $description.find('.inventory_item_price').text(),
        description: $description.find('.inventory_item_desc').text()
      };
      cy.wrap(productDetails).as('productDetails');
    }
  });
};


export const validateProductInfo = (context) => {
  cy.get('@productDetails').then(({ title, description, price }) => {
    cy.getByDataTest(`${context}`).find('.inventory_item_name').should('have.text', title);
    cy.getByDataTest(`${context}`).find('.inventory_item_desc').should('have.text', description);
    cy.getByDataTest(`${context}`).find('.inventory_item_price').should('have.text', price);
  });
};

//Click the "Add to Cart" button for the specified product
export const addToCartButton = (productTitle) => {
  cy.getByDataTest('inventory-item-description').each(($description) => {
    const title = $description.find('.inventory_item_name ').text()
    if (title === productTitle) {
      cy.contains('Add to cart').click()
    }
  })

}