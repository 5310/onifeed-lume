import { html, md, fetchFeed } from './util.js'

const article = (entry) => html`
  <article>
    <h1><a href="${entry.links[0].href}">${entry.title.value}</a></h1>
    <p style="color:#d8dee9"><font size="-0.4"><i><time datetime="${entry.updated.toISOString()}">${entry.updated.toISOString().substring(0, 10)}</time></i></font></p>
    <summary>${md(entry.content.value)}</summary>
  </article>
`

const style = html`
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');
    :root {
      min-height: 100%;
      background: #2e3440;
      color: #eceff4;
      font-family: 'Work Sans', 'Open Sans', sans-serif;
      line-height: 1.5;
    }
    .header-container {
      width: 100%;
      margin: 0 auto;
    }
    .header-title {
      font-size: 32px;
      font-weight: bold;
      margin: 0;
    }
    a {
      text-decoration: none;
      color: #a3be8c;
    }
    a:hover {
      color: #ebcb8b;
      opacity: 90%;
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
      color: #88c0d0;
      line-break: anywhere;
    }
    main > article > summary a:hover {
      color: #88c0d0;
      opacity: 90%
    }
    @media (min-width: 600px) {
      main {
        font-size: 18px;
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
        ${style}

        <link
          rel="alternate"
          type="application/atom+xml"
          href="https://rss.0n1.one/public.php?op=rss&id=-2&view-mode=all_articles&key=44ssqy5f0c7a59a8e12"
        />
      </head>
      <body>
        <main>

          <link href="https://cdn.lineicons.com/2.0/LineIcons.css" rel="stylesheet">
		  <section class="header-container">
		    <div style="display:flex; justify-content:flex-end; align-items:flex-end;">
		      <div style="flex-grow:1;"><div class="header-title"><span style="color:#b48ead;">onnyyonn</span>//feed</div></div>
		      <div><a class="lni lni-32 lni-github" href="https://github.com/onnyyonn/feed" style="color:#eceff4;" target="_blank" rel="noopener noreferrer"></a></div>
		    </div>
		  </section>

        ${feed.entries.map(article).join('\n')}

        </main>
      </body>
    </html>
  `
}
