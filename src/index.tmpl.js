import { html, md, fetchFeed } from './util.js'

const article = (entry) => html`
  <article>
    <h1><a href="${entry.links[0].href}">${entry.title.value}</a></h1>
    <table>
      <tr>
        <th>Time</th>
        <td>
          <time datetime="${entry.updated.toISOString()}">
            ${entry.updated.toLocaleDateString('en-US')}
          </time>
        </td>
      </tr>
      <tr>
        <th>Author</th>
        <td>${entry.author?.name ?? 'Unknown'}</td>
      </tr>
    </table>
    <summary>${md(entry.content.value)}</summary>
  </article>
`

const style = html`
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

    :root {
      min-height: 100%;
      --background: white;
      --color: #000c;
      --accent: #e1005d;
      background: var(--background);
      color: var(--color);
      font-family: 'Work Sans', 'Open Sans', sans-serif;
      line-height: 1.5;
    }

    a {
      text-decoration: none;
      color: var(--accent);
      opacity: 50%;
    }
    a:hover {
      opacity: 75%;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    *:where(p) {
      margin-block: 0.5em;
    }

    *:where(h1, h2, h3, h4, h5, ol, ul) {
      margin-block: 0.5em;
      line-height: 1.2;
    }

    body {
      display: grid;
      place-items: center;
      padding: 2em;
    }

    main {
      display: grid;
      gap: 1em;
      place-items: stretch;
    }

    main > article > table {
      font-size: 0.75em;
      text-align: left;
    }

    main > article > table th {
      padding-right: 0.5em;
    }

    main > article > summary a {
      line-break: anywhere;
    }

    @media (min-width: 600px) {
      main {
        font-size: 18px;
        width: 80ch;
        line-height: 2em;
      }
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --background: #111;
        --color: #cccc;
        --accent: #ff7998;
        background: var(--background);
        color: var(--color);
        font-family: 'Work Sans', 'Open Sans', sans-serif;
        line-height: 1.5;
      }
    }
  </style>
`

export default async function (_) {
  const feed = await fetchFeed(
    'https://rss.0n1.one/public.php?op=rss&id=-2&view-mode=all_articles&key=44ssqy5f0c7a59a8e12',
  )

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <title>Onifeed</title>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />

        ${style}
      </head>

      <body>
        <main>${feed.entries.map(article).join('\n')}</main>
      </body>
    </html>
  `
}
