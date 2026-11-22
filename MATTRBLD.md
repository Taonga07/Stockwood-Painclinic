# Editing this site with Mattrbld

Content for this Hugo site is managed with [Mattrbld](https://mattrbld.com), a Git-based CMS that runs in the browser. Everything it knows about the site lives in `.mattrbld/`; saved changes are plain commits to this repo, and Cloudflare Pages rebuilds the site from them.

## First-time setup

1. Open <https://app.mattrbld.com> and create your local profile.
2. Import the project using the repo's `https://…​.git` URL (not SSH) and the `master` branch.
3. The repo is private, so use a GitHub **fine-grained personal access token** with *Contents: read & write* on this repo as the password.
4. In **Settings → Media Library**, set the upload directory to `assets/media`. The `image` and `button` shortcodes take paths relative to that folder (e.g. `banners/SportInjury.jpg`).

## Day-to-day

- Edit in Mattrbld, then press **Synchronise** on the Dashboard. That pushes one commit and triggers a Cloudflare Pages build. Nothing is published until you sync.
- Nothing needs to run locally; `hugo` alone builds the site.

## What's in `.mattrbld/`

| Collection | Folder | Schemas |
|---|---|---|
| Pages | `content/` | `page` (rich text), `page-with-shortcodes` (raw Markdown) |
| Blog | `content/blog/` | `blog-post` |
| Contact, hours, prices & reviews | `data/` | `contact`, `opening-hours`, `pricing`, `testimonials`, `style` |

Each content/data file names its schema in a `___mb_schema` key. Hugo ignores it.

### Shortcodes

Pages that contain Hugo shortcodes (`{{< image … >}}`, `{{< hero_slider >}}`, `{{< price_table >}}`, …) use the **page-with-shortcodes** schema, which edits the body as raw Markdown so shortcodes are saved exactly as typed. Use the plain **page** schema only for pages without shortcodes.

### Notes

- `linkable` and previews are off: Hugo URLs follow file paths, not titles, and the site doesn't implement Mattrbld's preview protocol. Type internal links by hand (e.g. `/booking/online-booking/`).
- The *Pages* collection is rooted at `content/`, so it also lists the blog sub-folder. Use the **Blog** entry for posts.
- `Rows`/`Field Group` fields in the data schemas were written from the field docs. If the schema editor flags one, open it, re-save, and sync.
