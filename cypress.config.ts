import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mocha",
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});