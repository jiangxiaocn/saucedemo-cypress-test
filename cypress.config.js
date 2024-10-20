require('dotenv').config()
const { defineConfig } = require("cypress");

console.log('USERNAME:', process.env.USERNAME); // Log to check if it's defined
console.log('PASSWORD:', process.env.PASSWORD);

module.exports = defineConfig({
  env:{
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  e2e: {
    baseUrl:'https://www.saucedemo.com',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile:'cypress/support/e2e.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  },
});
