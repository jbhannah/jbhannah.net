const unified = require('unified')
const remark = require('remark-parse')
const html = require('remark-html')

function excerpt (file) {
  const output = unified()
    .use(remark, {
      commonmark: true,
      footnotes: true
    })
    .use(html)
    .processSync(file.content)
    .contents

  if (file.data.hasOwnProperty('link')) {
    file.excerpt = output
  } else {
    file.excerpt = output
      .slice(output.indexOf('<p>'), output.indexOf('</p>') + 4)
      .replace(/<sup id="fnref-\S+">.+?<\/sup>/, '')
      .replace(/<a href="\S+">([\S\s]+?)<\/a>/g, '$1')
  }
}

module.exports = excerpt
