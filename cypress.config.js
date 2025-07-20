import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // Required for TypeScript + ES Modules
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      restartOnFileChange: true
    },
    specPattern: 'src/components/**/__tests__/*.cy.{js,ts,jsx,tsx}',
    indexHtmlFile: "index.html"
  },
});
