// tina/config.ts
import { defineConfig } from "tinacms";

// tina/settings.json
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

// tina/schema/pages.json
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
          match: { start: "{{<", end: ">}}" },
          fields: [
            {
              type: "rich-text",
              name: "children",
              label: "Slides",
              templates: [
                {
                  name: "hero_slide",
                  label: "Slide",
                  match: { start: "{{<", end: ">}}" },
                  fields: [
                    { type: "image", name: "image", label: "Image" },
                    { type: "string", name: "heading", label: "Heading" },
                    { type: "string", name: "text", label: "Text" },
                    { type: "string", name: "link", label: "Link" },
                    { type: "string", name: "link_text", label: "Button text" },
                    { type: "rich-text", name: "children", label: "Extra notes (not used on the site)" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "welcome_intro",
          label: "Welcome / Intro Section",
          match: { start: "{{<", end: ">}}" },
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
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "string", name: "title", label: "Eyebrow label" },
            { type: "string", name: "subtitle", label: "Heading" },
            {
              type: "rich-text",
              name: "children",
              label: "Days (leave empty to use the sitewide Opening Hours settings)",
              templates: [
                {
                  name: "opening_hours_row",
                  label: "Day",
                  match: { start: "{{<", end: ">}}" },
                  fields: [
                    { type: "string", name: "day", label: "Day" },
                    { type: "string", name: "hours", label: "Hours" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "testimonials",
          label: "Testimonials Section",
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "string", name: "title", label: "Eyebrow label" },
            { type: "string", name: "heading", label: "Heading" },
            { type: "string", name: "note", label: "Footnote" },
            {
              type: "rich-text",
              name: "children",
              label: "Quotes (leave empty to use the sitewide Testimonials settings)",
              templates: [
                {
                  name: "testimonial",
                  label: "Quote",
                  match: { start: "{{<", end: ">}}" },
                  fields: [
                    { type: "string", name: "author", label: "Author" },
                    { type: "rich-text", name: "children", label: "Quote text" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "price_table",
          label: "Price Table",
          match: { start: "{{<", end: ">}}" },
          fields: [
            {
              type: "rich-text",
              name: "children",
              label: "Plans (leave empty to use the sitewide Price List settings)",
              templates: [
                {
                  name: "price_plan",
                  label: "Plan",
                  match: { start: "{{<", end: ">}}" },
                  fields: [
                    { type: "string", name: "name", label: "Plan name" },
                    { type: "string", name: "price", label: "Price" },
                    { type: "string", name: "cta_text", label: "Button text" },
                    { type: "string", name: "cta_link", label: "Button link" },
                    { type: "rich-text", name: "children", label: "Features (bullet list)" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "clinics",
          label: "Clinic Locations Grid",
          match: { start: "{{<", end: ">}}" },
          fields: [
            {
              type: "rich-text",
              name: "children",
              label: "Clinics",
              templates: [
                {
                  name: "clinic",
                  label: "Clinic",
                  match: { start: "{{<", end: ">}}" },
                  fields: [
                    { type: "string", name: "name", label: "Name" },
                    { type: "image", name: "image", label: "Photo" },
                    { type: "string", name: "link", label: "Link" },
                    { type: "rich-text", name: "children", label: "Extra notes (not used on the site)" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "map",
          label: "Embedded Map",
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "string", name: "embed_url", label: "Google Maps embed URL" },
            { type: "string", name: "height", label: "Height (px)" }
          ]
        },
        {
          name: "button",
          label: "Button / Call to action",
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "string", name: "href", label: "Link" },
            { type: "string", name: "style", label: "Style", options: ["primary", "outline", "light"] },
            { type: "rich-text", name: "children", label: "Button text" }
          ]
        },
        {
          name: "image",
          label: "Content Image",
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "image", name: "src", label: "Image" },
            { type: "string", name: "alt", label: "Alt text" }
          ]
        },
        {
          name: "booking",
          label: "Online Booking Widget",
          match: { start: "{{<", end: ">}}" },
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

// tina/schema/posts.json
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
        {
          name: "image",
          label: "Content Image",
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "image", name: "src", label: "Image" },
            { type: "string", name: "alt", label: "Alt text" }
          ]
        },
        {
          name: "button",
          label: "Button / Call to action",
          match: { start: "{{<", end: ">}}" },
          fields: [
            { type: "string", name: "href", label: "Link" },
            { type: "string", name: "style", label: "Style", options: ["primary", "outline", "light"] },
            { type: "rich-text", name: "children", label: "Button text" }
          ]
        }
      ]
    }
  ]
};

// tina/schema/configuration.json
var configuration_default = {
  name: "configuration",
  label: "Configuration",
  path: "data",
  format: "json",
  templates: [
    {
      name: "contact",
      label: "Contact Details",
      match: { include: "contact.json" },
      fields: [
        { type: "string", name: "phone", label: "Phone (display)", description: "Shown as text in the header and footer, e.g. '01275 830241'.", required: true },
        { type: "string", name: "phone_href", label: "Phone (tel: link)", description: "The tappable link version, e.g. 'tel:+441275830241' \u2014 must start with tel: and include the country code.", required: true },
        { type: "string", name: "email", label: "Email" },
        { type: "string", name: "address1", label: "Address line 1" },
        { type: "string", name: "address2", label: "Address line 2" },
        { type: "string", name: "site_description", label: "Site meta description (SEO)", description: "The short summary shown in Google search results and social media link previews when a page doesn't set its own." }
      ]
    },
    {
      name: "openingHours",
      label: "Opening Hours",
      match: { include: "opening_hours.json" },
      fields: [
        {
          type: "object",
          name: "hours",
          label: "Days",
          description: "Shown on the home page's opening hours table, and used as the fallback wherever a page's own Opening Hours block is left empty.",
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
      match: { include: "testimonials.json" },
      fields: [
        {
          type: "object",
          name: "items",
          label: "Quotes",
          description: "Shown in the home page's testimonials section, and used as the fallback wherever a page's own Testimonials block is left empty.",
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
      match: { include: "pricing.json" },
      fields: [
        {
          type: "object",
          name: "plans",
          label: "Plans",
          description: "Shown on the Price List page, and used as the fallback wherever a page's own Price Table block is left empty.",
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
      match: { include: "style.json" },
      fields: [
        {
          type: "object",
          name: "colors",
          label: "Colours",
          description: "These control the whole site's colour scheme \u2014 change one and every page using it updates automatically.",
          fields: [
            { type: "string", name: "paper", label: "Page background", description: "The main background colour behind all page content.", ui: { component: "color" } },
            { type: "string", name: "paper_deep", label: "Page background (alternate)", description: "A slightly darker background, used for subtle section dividers.", ui: { component: "color" } },
            { type: "string", name: "white", label: "Card / panel background", description: "Background for cards, buttons, and light-on-dark text \u2014 usually pure white.", ui: { component: "color" } },
            { type: "string", name: "ink", label: "Body text", description: "The main text colour used for paragraphs and headings.", ui: { component: "color" } },
            { type: "string", name: "ink_soft", label: "Muted text", description: "A lighter text colour used for secondary text like eyebrow labels and captions.", ui: { component: "color" } },
            { type: "string", name: "sage", label: "Brand colour (light)", description: "A lighter shade of the main brand colour, used for section dividers.", ui: { component: "color" } },
            { type: "string", name: "sage_deep", label: "Brand colour (primary)", description: "The main brand colour \u2014 used for primary buttons, links, and header/footer accents.", ui: { component: "color" } },
            { type: "string", name: "sage_pale", label: "Brand colour (background tint)", description: "A very light tint of the brand colour, used as a subtle background for highlighted sections.", ui: { component: "color" } },
            { type: "string", name: "brass", label: "Accent colour", description: "A warm accent colour used for hover states on light buttons and small decorative highlights.", ui: { component: "color" } },
            { type: "string", name: "brass_deep", label: "Accent colour (hover)", description: "A darker shade of the accent colour, used for link hover states.", ui: { component: "color" } },
            { type: "string", name: "line", label: "Border colour", description: "The colour used for thin borders and dividing lines, e.g. around cards and tables.", ui: { component: "color" } }
          ]
        },
        {
          type: "object",
          name: "typography",
          label: "Fonts",
          description: "If you change a font here, also ask your developer to update the matching Google Fonts link in the site's head.html so the new font actually loads.",
          fields: [
            { type: "string", name: "font_display", label: "Heading font", description: "Used for all headings (h1, h2, h3) \u2014 the more decorative, characterful font." },
            { type: "string", name: "font_body", label: "Body text font", description: "Used for paragraphs, buttons, and most other text \u2014 should be easy to read at small sizes." }
          ]
        },
        {
          type: "object",
          name: "layout",
          label: "Layout",
          fields: [
            { type: "string", name: "wrap_width", label: "Max content width", description: "How wide the page content can grow on large screens, e.g. '1140px'. Smaller screens are unaffected." },
            { type: "string", name: "radius", label: "Corner roundness", description: "How rounded corners are on buttons and cards, e.g. '6px' for subtly rounded, '0px' for sharp corners." }
          ]
        }
      ]
    }
  ]
};

// tina/schema/site-settings.json
var site_settings_default = {
  name: "siteSettings",
  label: "Site Settings",
  path: "config/_default",
  format: "toml",
  ui: {
    allowedActions: { create: false, delete: false }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Site title",
      description: "Shown in the browser tab and used in page titles across the whole site.",
      required: true
    },
    {
      type: "string",
      name: "baseURL",
      label: "Site URL",
      description: "The live web address of the site, e.g. https://stockwood-painclinic.co.uk/ \u2014 must end in a slash.",
      required: true
    },
    {
      type: "string",
      name: "languageCode",
      label: "Language code",
      description: "Sets the site's language, e.g. en-gb for British English. Used in the page <html> tag and by search engines."
    },
    {
      type: "boolean",
      name: "enableRobotsTXT",
      label: "Allow search engines to crawl the site",
      description: "Turn off temporarily if you want to hide the site from Google while it's being worked on."
    },
    {
      type: "number",
      name: "summarylength",
      label: "Summary length (words)",
      description: "How many words to show in auto-generated summaries, e.g. blog post previews."
    },
    {
      type: "object",
      name: "params",
      label: "Site Extras",
      fields: [
        {
          type: "image",
          name: "favicon",
          label: "Favicon",
          description: "The small icon shown in browser tabs and bookmarks. Square PNG works best (e.g. 512x512px)."
        }
      ]
    }
  ]
};

// tina/schema/menu.json
var menu_default = {
  name: "menu",
  label: "Menu",
  path: "config/_default",
  format: "yaml",
  ui: {
    allowedActions: { create: false, delete: false }
  },
  fields: [
    {
      type: "object",
      name: "main",
      label: "Main Menu",
      description: "Controls the navigation bar shown at the top of every page. Drag to reorder within the same level \u2014 items with a Parent set appear as a dropdown under that parent.",
      list: true,
      ui: {
        itemProps: { label: "{{item.name}}" },
        defaultItem: { name: "New link", pageRef: "/", weight: 99 }
      },
      fields: [
        { type: "string", name: "name", label: "Label", required: true },
        {
          type: "string",
          name: "pageRef",
          label: "Page",
          description: "Path to a page on this site, e.g. /booking/price-list \u2014 leave empty if using an external link below."
        },
        {
          type: "string",
          name: "url",
          label: "External link",
          description: "Use for links to other sites instead of a Page above, e.g. https://facebook.com/..."
        },
        {
          type: "string",
          name: "parent",
          label: "Parent item",
          description: "To nest this under another menu item as a dropdown, type that item's Label exactly (e.g. Osteopathy). Leave empty for a top-level item."
        },
        {
          type: "number",
          name: "weight",
          label: "Order",
          description: "Lower numbers appear first among items at the same level."
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
    collections: [pages_default, posts_default, configuration_default, site_settings_default, menu_default]
  }
});
export {
  config_default as default
};
