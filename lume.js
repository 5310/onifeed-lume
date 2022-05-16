import lume from 'https://deno.land/x/lume@v1.8.0/mod.ts'

// Markdown plugin configuration
const markdown = {
  html: true,
  linkify: true,
  typographer: true,
}

const site = lume(
  {
    src: './src',
    dest: './dist',
  },
  { markdown },
)

export default site
