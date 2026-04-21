// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import { storyblok } from "@storyblok/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    storyblok({
      accessToken: "JkbwzdQ6GhohMiRxjCTpNAtt",
      apiOptions: {
        region: "eu",
      },
      components: {
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        hero: "storyblok/Hero",
        team: "storyblok/Team",
        wrapper: "storyblok/Wrapper",
        richTextBlok: "storyblok/RichTextBlok",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
