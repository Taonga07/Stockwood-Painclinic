# Tina schema notes

`tina/config.ts` is the real TinaCMS entry point (a normal TypeScript config,
using `defineConfig` from `tinacms`). It doesn't hand-write the schema
inline — it imports it from plain JSON under `assets/tina/`:

```
assets/tina/
  settings.json        - non-secret build/media settings
  schema/
    pages.json          - the "pages" collection
    posts.json           - the "posts" collection
    configuration.json   - the "configuration" collection
```

Keeping the schema as JSON (rather than writing it directly in
`config.ts`) means the same collection/field definitions are easy for the
self-hosted bridge (Cloudflare Pages Function + Upstash Redis) to read too,
without needing to parse TypeScript. Secrets (`TINA_CLIENT_ID`, `TINA_TOKEN`)
are **not** in this JSON — `config.ts` reads those from `.env` at build time,
same as before.

There are exactly three collections: **pages**, **posts**, and
**configuration**. Everything sitewide (contact details, opening hours,
testimonials, pricing, style tokens) lives inside `configuration` as
different document shapes (`templates`) in the same collection, rather than
one collection per settings file.

## Collections → real files

| Collection            | Edits on disk                            |
|------------------------|-------------------------------------------|
| `pages`                | `content/**/*.md` (excluding `content/blog/`) |
| `posts`                | `content/blog/**/*.md`                    |
| `configuration`        | `data/config/*.json` — one template per file, matched by filename: `contact` → `contact.json`, `openingHours` → `opening_hours.json`, `testimonials` → `testimonials.json`, `pricing` → `pricing.json`, `style` → `style.json` |

No Hugo Modules are used — `content`, `assets`, and `layouts` are Hugo's
native project directories, so these are the real on-disk paths (there's no
mount remapping to account for).

Tina's own admin build (`tinacms build`, `outputFolder: "cms"`,
`publicFolder: "static"`) lands in `static/cms/`, which Hugo then publishes
as-is under `/cms/` on the live site — that's why an (otherwise empty)
`static/` folder is checked in; `static/cms/` itself is gitignored since it's
regenerated on every build.

## Blocks → shortcodes

The `pages`/`posts` collections' rich-text `body` field lists block
`templates`. Each template's `name` matches a shortcode of the same name in
`layouts/shortcodes/`. A flat template (`map`, `button`, `image`, `booking`)
serialises to one shortcode call.

A template with a `list: true` object field (e.g. `hero-slider`'s `slides`,
`clinics`'s `locations`) is a **container**: the bridge should serialise it
as the parent shortcode wrapping one self-closing child shortcode per list
item, e.g.

```
{{< hero-slider >}}
{{< hero-slide image="..." heading="..." text="..." link="..." />}}
{{< /hero-slider >}}
```

Note the child (`hero-slide`, `clinic`) is self-closing (`/>}}`, no separate
closing tag) — those shortcode templates don't call `.Inner`, and Hugo
errors on a closing tag ("does not evaluate .Inner ... yet a closing tag was
provided") if one is given anyway. The parent (`hero-slider`, `clinics`,
`opening-hours`, `testimonials`, `price-table`) does call `.Inner`, so it
always needs the pair form with a closing tag, even when its list is empty.

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
no children — the shortcode itself then falls back to the `configuration`
collection's `openingHours`/`testimonials`/`pricing` documents (in
`data/config/`), so most pages don't need to duplicate that data.

## Style tokens are build-time, not runtime

Editing the `style` document in `configuration` changes `data/config/style.json`.
`layouts/partials/global/head.html` reads it via `hugo.Data.config.style` and
passes the values to Hugo's `css.Sass` function through its documented
[`vars` option](https://gohugo.io/functions/css/sass/#vars), which exposes
them to Sass as a `hugo:vars` module — see `@use "hugo:vars" as v;` in
`assets/scss/settings/_colors.scss`, `_typography.scss`, and `_spacing.scss`.
Sass compiles the final values in directly; there's no separate runtime
`<style>` override block, and no string concatenation involved. A missing
field in `style.json` falls back to the previous default at the point the
`vars` map is built in `head.html` (a Sass module import fails outright on an
undefined variable, so the fallback has to happen on the Hugo side, not via
Sass's `!default`).

This requires Dart Sass alongside Hugo (`transpiler: "dartsass"` in
`head.html`) — Hugo's bundled LibSass doesn't support the `vars` option, and
Hugo's `dartsass` transpiler talks to Dart Sass over its binary "embedded
protocol" (stdin/stdout), not a plain one-shot CLI call. That protocol needs
the real native Dart-compiled Sass binary — the `sass-embedded` package
(not plain `sass`, which is a pure-JS/dart2js build that doesn't implement
the embedded protocol and will fail with an EOF/"connection is shut down"
error from Hugo). `sass-embedded` is a `devDependency` here; its
`optionalDependencies` auto-select the right native binary for your OS/arch
(`sass-embedded-win32-x64`, `-darwin-arm64`, `-linux-x64`, etc.) and expose
it via a `sass` executable in `node_modules/.bin`. **On Windows in
particular, `hugo:dev`/`hugo:build` don't rely on that shim** — `.bin\sass.cmd`
is a batch file that launches Node, which re-spawns the real native binary
as a further subprocess, and that extra hop corrupts the raw stdin/stdout
"embedded protocol" stream Hugo needs (this is what an
`unexpected EOF`/`connection is shut down` error from Hugo means). Instead,
the scripts look for the real native launcher directly —
`node_modules/sass-embedded-<platform>-<arch>/dart-sass/sass[.bat]` — and
prepend that folder to `PATH` before spawning Hugo, falling back to plain
`PATH` (which still has `node_modules/.bin` via npm) if that folder isn't
present for some reason. Either way, just run `npm install` after pulling
this repo.
