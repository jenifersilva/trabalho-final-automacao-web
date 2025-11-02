const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 0,
    runMode: 2,
  },
  e2e: {
    baseUrl: "https://www.automationexercise.com/",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "Relatório de Testes - PGATS",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      showSkipped: false,
      showPending: false,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
