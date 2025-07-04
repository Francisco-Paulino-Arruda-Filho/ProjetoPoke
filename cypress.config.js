import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    setupNodeEvents(on, config) {
      // Required for TypeScript + ES Modules
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: 'src/components/**/__tests__/*.cy.{js,ts,jsx,tsx}',
    indexHtmlFile: "index.html"
  },
});
