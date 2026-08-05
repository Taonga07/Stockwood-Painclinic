# Tina schema notes

Everything under `data/tina-cms/` is plain JSON (no `tina/config.ts`), matching
the self-hosted data layer (Cloudflare Pages Function + Upstash Redis) rather
than Tina Cloud's default JS config. `config.json` lists the collections;
each collection file lives in `schema/`.

## Collections → real files

| Collection            | Edits on disk                          |
|------------------------|-----------------------------------------|
| `pages.json`           | `content/pages/**/*.md`                 |
| `posts.json`           | `content/posts/**/*.md`                 |
| `contact.json`         | `data/configuraton/contact.json`        |
| `opening-hours.json`   | `data/configuraton/opening_hours.json`  |
| `testimonials.json`    | `data/configuraton/testimonials.json`   |
| `pricing.json`         | `data/configuraton/pricing.json`        |
| `style.json`           | `data/style/tokens.json`                |

Paths are the **source** repo paths (before Hugo's module mounts in
`data/hugo/module.toml` remap `content/pages` → `content` and
`content/posts` → `content/blog`). Tina/the bridge writes to source; Hugo
reads the mounted view.

## Blocks → shortcodes

The `pages.json`/`posts.json` rich-text `body` field lists block
`templates`. Each template's `name` matches a shortcode of the same name in
`theme/layouts/shortcodes/`. A flat template (`map`, `button`, `image`,
`booking`) serialises to one shortcode call.

A template with a `list: true` object field (e.g. `hero-slider`'s `slides`,
`clinics`'s `locations`) is a **container**: the bridge should serialise it
as the parent shortcode wrapping one child shortcode per list item, e.g.

```
{{< hero-slider >}}
{{< hero-slide image="..." heading="..." text="..." link="..." >}}{{< /hero-slide >}}
{{< /hero-slider >}}
```

Container → child shortcode name mapping:

| Block           | Child shortcode      |
|-----------------|----------------------|
| `hero-slider`   | `hero-slide`         |
| `opening-hours` | `opening-hours-row`  |
| `testimonials`  | `testimonial`        |
| `price-table`   | `price-plan`         |
| `clinics`       | `clinic`             |

For `opening-hours`, `testimonials`, and `price-table`, an **empty** list
(the field left blank in Tina) should serialise to the wrapper shortcode with
no children — the shortcode itself then falls back to the sitewide settings
collection (`opening-hours.json`/`testimonials.json`/`pricing.json` above) so
most pages don't need to duplicate that data.
