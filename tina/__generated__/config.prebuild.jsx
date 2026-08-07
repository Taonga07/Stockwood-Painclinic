// tina/config.ts
import { defineConfig } from "tinacms";

// data/tina/settings.json
var settings_default = {
  build: {
    outputFolder: "cms",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "assets"
    }
  }
};

// data/tina/schema/pages.json
var pages_default = {
  name: "pages",
  label: "Pages",
  path: "content",
  format: "md",
  match: { exclude: "blog/**" },
  fields: [
    { type: "string", name: "title", label: "Title", isTitle: true, required: true },
    { type: "string", name: "eyebrow", label: "Eyebrow label (above the title)" },
    { type: "boolean", name: "hide_page_hero", label: "Hide the standard title banner (used by the home page)" },
    { type: "boolean", name: "hide_sidebar", label: "Hide the 'get in touch' sidebar" },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [
        {
          name: "hero_slider",
          label: "Hero Slider (home page banner)",
          fields: [
            {
              type: "object",
              name: "slides",
              label: "Slides",
              list: true,
              ui: { itemProps: { label: "{{item.heading}}" } },
              fields: [
                { type: "image", name: "image", label: "Image" },
                { type: "string", name: "heading", label: "Heading" },
                { type: "string", name: "text", label: "Text" },
                { type: "string", name: "link", label: "Link" },
                { type: "string", name: "link_text", label: "Button text" }
              ]
            }
          ]
        },
        {
          name: "welcome_intro",
          label: "Welcome / Intro Section",
          fields: [
            { type: "image", name: "image", label: "Photo" },
            { type: "string", name: "eyebrow", label: "Eyebrow" },
            { type: "string", name: "heading", label: "Heading" },
            { type: "string", name: "lede", label: "Lede line" },
            { type: "rich-text", name: "children", label: "Body copy" }
          ]
        },
        {
          name: "opening_hours",
          label: "Opening Hours Table",
          fields: [
            { type: "string", name: "title", label: "Eyebrow label" },
            { type: "string", name: "subtitle", label: "Heading" },
            {
              type: "object",
              name: "rows",
              label: "Days (leave empty to use the sitewide Opening Hours settings)",
              list: true,
              ui: { itemProps: { label: "{{item.day}}" } },
              fields: [
                { type: "string", name: "day", label: "Day" },
                { type: "string", name: "hours", label: "Hours" }
              ]
            }
          ]
        },
        {
          name: "testimonials",
          label: "Testimonials Section",
          fields: [
            { type: "string", name: "title", label: "Eyebrow label" },
            { type: "string", name: "heading", label: "Heading" },
            { type: "string", name: "note", label: "Footnote" },
            {
              type: "object",
              name: "quotes",
              label: "Quotes (leave empty to use the sitewide Testimonials settings)",
              list: true,
              ui: { itemProps: { label: "{{item.author}}" } },
              fields: [
                { type: "rich-text", name: "children", label: "Quote" },
                { type: "string", name: "author", label: "Author" }
              ]
            }
          ]
        },
        {
          name: "price_table",
          label: "Price Table",
          fields: [
            {
              type: "object",
              name: "plans",
              label: "Plans (leave empty to use the sitewide Price List settings)",
              list: true,
              ui: { itemProps: { label: "{{item.name}}" } },
              fields: [
                { type: "string", name: "name", label: "Plan name" },
                { type: "string", name: "price", label: "Price" },
                { type: "string", name: "cta_text", label: "Button text" },
                { type: "string", name: "cta_link", label: "Button link" },
                { type: "rich-text", name: "children", label: "Features (bullet list)" }
              ]
            }
          ]
        },
        {
          name: "clinics",
          label: "Clinic Locations Grid",
          fields: [
            {
              type: "object",
              name: "locations",
              label: "Clinics",
              list: true,
              ui: { itemProps: { label: "{{item.name}}" } },
              fields: [
                { type: "string", name: "name", label: "Name" },
                { type: "image", name: "image", label: "Photo" },
                { type: "string", name: "link", label: "Link" }
              ]
            }
          ]
        },
        {
          name: "map",
          label: "Embedded Map",
          fields: [
            { type: "string", name: "embed_url", label: "Google Maps embed URL" },
            { type: "string", name: "height", label: "Height (px)" }
          ]
        },
        {
          name: "button",
          label: "Button / Call to action",
          fields: [
            { type: "string", name: "href", label: "Link" },
            { type: "string", name: "style", label: "Style", options: ["primary", "outline", "light"] },
            { type: "rich-text", name: "children", label: "Button text" }
          ]
        },
        {
          name: "image",
          label: "Content Image",
          fields: [
            { type: "image", name: "src", label: "Image" },
            { type: "string", name: "alt", label: "Alt text" }
          ]
        },
        {
          name: "booking",
          label: "Online Booking Widget",
          fields: [
            {
              type: "boolean",
              name: "enabled",
              label: "Enable Widget"
            }
          ]
        }
      ]
    }
  ]
};

// data/tina/schema/posts.json
var posts_default = {
  name: "posts",
  label: "Blog Posts",
  path: "content/blog",
  format: "md",
  fields: [
    { type: "string", name: "title", label: "Title", isTitle: true, required: true },
    { type: "datetime", name: "date", label: "Date" },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [
        { name: "image", label: "Content Image", fields: [
          { type: "image", name: "src", label: "Image" },
          { type: "string", name: "alt", label: "Alt text" }
        ] },
        { name: "button", label: "Button / Call to action", fields: [
          { type: "string", name: "href", label: "Link" },
          { type: "string", name: "style", label: "Style", options: ["primary", "outline", "light"] },
          { type: "rich-text", name: "children", label: "Button text" }
        ] }
      ]
    }
  ]
};

// data/tina/schema/configuration.json
var configuration_default = {
  name: "configuration",
  label: "Configuration",
  path: "../../data",
  templates: [
    {
      name: "contact",
      label: "Contact Details",
      match: { include: "**/contact.{json,yml,yaml,toml}" },
      fields: [
        { type: "string", name: "phone", label: "Phone (display)", required: true },
        { type: "string", name: "phone_href", label: "Phone (tel: link)", required: true },
        { type: "string", name: "email", label: "Email" },
        { type: "string", name: "address1", label: "Address line 1" },
        { type: "string", name: "address2", label: "Address line 2" },
        { type: "string", name: "site_description", label: "Site meta description (SEO)" }
      ]
    },
    {
      name: "openingHours",
      label: "Opening Hours",
      match: { include: "**/opening_hours.{json,yml,yaml,toml}" },
      fields: [
        {
          type: "object",
          name: "hours",
          label: "Days",
          list: true,
          ui: { itemProps: { label: "{{item.day}} - {{item.hours}}" } },
          fields: [
            { type: "string", name: "day", label: "Day", required: true },
            { type: "string", name: "hours", label: "Hours (e.g. '8:00 AM - 1:00 PM' or 'CLOSED')", required: true }
          ]
        }
      ]
    },
    {
      name: "testimonials",
      label: "Testimonials",
      match: { include: "**/testimonials.{json,yml,yaml,toml}" },
      fields: [
        {
          type: "object",
          name: "items",
          label: "Quotes",
          list: true,
          ui: { itemProps: { label: "{{item.author}}" } },
          fields: [
            { type: "rich-text", name: "quote", label: "Quote" },
            { type: "string", name: "author", label: "Author" }
          ]
        }
      ]
    },
    {
      name: "pricing",
      label: "Price List",
      match: { include: "**/pricing.{json,yml,yaml,toml}" },
      fields: [
        {
          type: "object",
          name: "plans",
          label: "Plans",
          list: true,
          ui: { itemProps: { label: "{{item.name}} - {{item.price}}" } },
          fields: [
            { type: "string", name: "name", label: "Plan name", required: true },
            { type: "string", name: "price", label: "Price (e.g. '\xA3100')", required: true },
            { type: "string", name: "features", label: "Features", list: true }
          ]
        }
      ]
    },
    {
      name: "style",
      label: "Site Style",
      match: { include: "**/style.{json,yml,yaml,toml}" },
      fields: [
        {
          type: "object",
          name: "colors",
          label: "Colours",
          fields: [
            { type: "string", name: "paper", label: "Paper (background)", ui: { component: "color" } },
            { type: "string", name: "paper_deep", label: "Paper (deep)", ui: { component: "color" } },
            { type: "string", name: "white", label: "White", ui: { component: "color" } },
            { type: "string", name: "ink", label: "Ink (text)", ui: { component: "color" } },
            { type: "string", name: "ink_soft", label: "Ink (soft)", ui: { component: "color" } },
            { type: "string", name: "sage", label: "Sage (primary brand)", ui: { component: "color" } },
            { type: "string", name: "sage_deep", label: "Sage (deep)", ui: { component: "color" } },
            { type: "string", name: "sage_pale", label: "Sage (pale)", ui: { component: "color" } },
            { type: "string", name: "brass", label: "Brass (accent)", ui: { component: "color" } },
            { type: "string", name: "brass_deep", label: "Brass (deep)", ui: { component: "color" } },
            { type: "string", name: "line", label: "Line / border colour", ui: { component: "color" } }
          ]
        },
        {
          type: "object",
          name: "typography",
          label: "Typography",
          fields: [
            { type: "string", name: "font_display", label: "Display font stack" },
            { type: "string", name: "font_body", label: "Body font stack" }
          ]
        },
        {
          type: "object",
          name: "layout",
          label: "Layout",
          fields: [
            { type: "string", name: "wrap_width", label: "Max content width (e.g. '1140px')" },
            { type: "string", name: "radius", label: "Corner radius (e.g. '6px')" }
          ]
        }
      ]
    }
  ]
};

// tina/config.ts
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: settings_default.build,
  media: settings_default.media,
  schema: {
    collections: [pages_default, posts_default, configuration_default]
  }
});
export {
  config_default as default
};
