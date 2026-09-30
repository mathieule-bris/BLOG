# My blog

## Preview
Pages are loaded on the fly, so open the site through a server, not by double-clicking:

    cd my-blog
    python3 -m http.server 8000     # then open http://localhost:8000

## Where things live
| To change...                         | Edit                          |
|--------------------------------------|-------------------------------|
| Name, tagline, avatar, objects, order| `config.js`                   |
| One section's content                | `pages/<id>.html`             |
| Photos                               | drop files in `images/photos/`|
| Music                                | drop files in `music/`        |
| Colors, fonts, layout                | `style.css`                   |
| Object drawings                      | `icons.svg`                   |

After adding or removing photos or music, run `python3 tools/scan.py`.

## Add a section
1. Add a line to `sections` in `config.js` (new `id`, a position, an `icon`).
2. Create `pages/<id>.html`.
3. If you need a new drawing, add a `<symbol id="...">` to `icons.svg`.

## Publish
Drag the whole folder onto Netlify Drop, or push it to GitHub and enable Pages. Both serve static files as they are.
