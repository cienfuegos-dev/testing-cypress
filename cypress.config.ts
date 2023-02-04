import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "nnk1z4",
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
