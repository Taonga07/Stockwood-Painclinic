import { defineConfig } from "tinacms";

// Collection/field definitions and non-secret build/media settings are kept
// as plain JSON in assets/tina/ rather than written inline here, so the
// same schema is also easy for the self-hosted bridge (Cloudflare Pages
// Function + Upstash Redis) to read without parsing TypeScript. This file
// is just the real Tina entry point that wires that JSON up — secrets
// (client ID / token) stay in .env, never in the committed JSON.
import settings from "../data/tina/settings.json";
import pages from "../data/tina/schema/pages.json";
import posts from "../data/tina/schema/posts.json";
import configuration from "../data/tina/schema/configuration.json";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: settings.build,
  media: settings.media,
  schema: {
    collections: [pages, posts, configuration] as any,
  },
});
