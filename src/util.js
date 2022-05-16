import { markdownIt } from 'https://deno.land/x/lume@v1.8.0/deps/markdown_it.ts'
import { html as html_ } from 'https://deno.land/x/html@v1.2.0/mod.ts'
import { parseFeed } from 'https://deno.land/x/rss@0.5.5/mod.ts'

const markdownItEngine = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

export const md = (content) =>
  markdownItEngine.renderInline(content ?? '').trim()

export const html = (content, ...params) =>
  html_`${content
    .map(
      (token, i) =>
        token +
        ((Array.isArray(params[i]) ? params[i].join('\n') : params[i]) ?? ''),
    )
    .join('')}`

export const fetchFeed = async (url) => {
  const response = await fetch(url)
  const xml = await response.text()
  return await parseFeed(xml)
}
