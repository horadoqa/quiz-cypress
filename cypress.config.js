const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    viewportWidth: 500,
    viewportHeight: 700,
    video: false,
    screenshotOnRunFailure: true,
  },
});