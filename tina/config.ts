import { defineConfig } from "tinacms";

export default defineConfig({
  // Fall back across local, Vercel, and Cloudflare Pages branch variables
  branch: process.env.GITHUB_BRANCH,

  // Tina Cloud credentials
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  // If using a self-hosted backend, point to your custom API
  // contentApiUrlOverride: process.env.NEXT_PUBLIC_TINA_AWS_SIGNAL_URL,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      // Your collections here
    ],
  },
});
