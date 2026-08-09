import { defineConfig } from "tinacms";

// All Tina configuration lives together under tina/: this file is the real
// entry point, and the collection/field definitions plus non-secret
// build/media settings are kept as plain JSON in tina/schema/ and
// tina/settings.json (rather than written inline here) so the same schema
// is also easy for the self-hosted bridge (Cloudflare Pages Function +
// Upstash Redis) to read without parsing TypeScript. Secrets (client ID /
// token) stay in .env, never in the committed JSON.
import settings from "./settings.json";
import pages from "./schema/pages.json";
import posts from "./schema/posts.json";
import configuration from "./schema/configuration.json";
import siteSettings from "./schema/site-settings.json";
import menu from "./schema/menu.json";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: settings.build,
  media: settings.media,
  schema: {
    collections: [pages, posts, configuration, siteSettings, menu] as any,
  },
});
