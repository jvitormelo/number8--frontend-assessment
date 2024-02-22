import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },

    // set the width and height of the viewport
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
