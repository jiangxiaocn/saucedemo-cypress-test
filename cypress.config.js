require('dotenv').config()
const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env:{
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    FIRSTNAME: process.env.FIRSTNAME,
    LASTNAME: process.env.LASTNAME,
    POSTALCODE: process.env.POSTALCODE,
  },
  e2e: {
    baseUrl:'https://www.saucedemo.com',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile:'cypress/support/e2e.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  },
});
