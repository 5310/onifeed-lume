import { html, md, fetchFeed } from './util.js'

const article = (entry) => html`
  <article class="article-entry">
    <h1><a href="${entry.links[0].href}">${entry.title.value}</a></h1>
    <p class="lead">
      <time datetime="${entry.updated.toISOString()}">
        ${entry.updated.toISOString().substring(0, 10)}
      </time>
    </p>
    <summary>${md(entry.content.value)}</summary>
  </article>
`

const style = html`
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap');
    @import url('https://cdn.lineicons.com/2.0/LineIcons.css');
    :root {
      --palette--polar-night: #2e3440;
      --palette--snow-storm: #eceff4;
      --palette--frost: #88c0d0;
      --palette--aurora-purple: #b48ead;
      --palette--aurora-green: #a3be8c;
      --palette--aurora-yellow: #ebcb8b;
      --palette--aurora-orange: #d08770;
      --palette--aurora-red: #bf616a;

      min-height: 100%;
      background: var(--palette--polar-night);
      color: var(--palette--snow-storm);
      font-family: 'Work Sans', 'Open Sans', sans-serif;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
      color: var(--palette--aurora-green);
    }
    a:hover {
      color: var(--palette--aurora-yellow);
      opacity: 90%;
    }

    p {
      margin-block: 0.5em;
      line-break: anywhere;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-block: 0.5em;
      line-height: 1.2;
    }

    ol,
    ul {
      margin-block: 0.5em;
      line-height: 1.2;
    }

    body {
      display: grid;
      padding: 2em;
      gap: 1em;
    }

    header {
      display: flex;
      gap: 1em;
      justify-content: space-between;
      align-items: baseline;
      font-size: 2em;
      font-weight: bold;
      letter-spacing: 0.025em;
      font-size: 1.2em;
      font-variation-settings: 'wght' 450;
    }
    header .header--title .header--title--accent {
      color: var(--palette--aurora-purple);
    }
    header .header--github a {
      color: var(--palette----palette--snow-storm);
      font-size: 1.5em;
      opacity: 50%;
    }

    main {
      display: grid;
      gap: 1em;
      place-items: stretch;
    }

    .article-entry .article-entry--lead {
      font-style: italic;
      font-size: 0.85em;
      opacity: 75%;
    }
    .article summary a {
      color: var(--palette--frost);
      line-break: anywhere;
    }

    @media (max-width: 400px) {
      :root {
        font-size: 4vw;
      }
    }
    @media (min-width: 120ch) {
      :root {
        font-size: 18px;
      }
      main {
        width: 80ch;
        line-height: 2em;
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

        <title>Onnyyonn//feed</title>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <link
          href="https://cdn.lineicons.com/2.0/LineIcons.css"
          rel="stylesheet"
        />
        ${style}

        <link
          rel="alternate"
          type="application/atom+xml"
          href="https://rss.0n1.one/public.php?op=rss&id=-2&view-mode=all_articles&key=44ssqy5f0c7a59a8e12"
        />
      </head>

      <body>
        <header>
          <h1 class="header--title">
            <span class="header--title--accent">onnyyonn</span>//feed
          </h1>
          <div class="header--github">
            <a
              class="lni lni-github"
              href="https://github.com/onnyyonn/feed"
              style="color:#eceff4;"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </header>

        <main>${feed.entries.map(article).join('\n')}</main>
      </body>
    </html>
  `
}
