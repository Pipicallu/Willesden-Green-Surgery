// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import path from "path";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import { storyblok } from "@storyblok/astro";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    storyblok({
      accessToken: env.STORYBLOK_ACCESS_TOKEN,
      apiOptions: {
        region: "eu",
      },
      components: {
        page: "storyblok/Page",
        banner: "storyblok/Banner",
        feature: "storyblok/Feature",
        hero: "storyblok/Hero",
        team: "storyblok/Team",
        wrapper: "storyblok/Wrapper",
        richTextBlok: "storyblok/RichTextBlok",
        table: "storyblok/Table",
        detailsCard: "storyblok/DetailsCard",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
