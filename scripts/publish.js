/* eslint no-console: 0 */
const { defaultFrontmatter } = require(`${__dirname}/../lib/frontmatter`)
const chalk = require("chalk")
const fs = require("fs")
const glob = require("glob")
const matter = require("gray-matter")
const { promisify } = require("util")

glob.promise = promisify(glob)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const processPage = async path => {
  const input = await readFile(path, "utf-8")
  const file = matter(input)
  const frontmatter = Object.assign({}, defaultFrontmatter, file.data)

  if (frontmatter.date) return 0
  if (frontmatter.draft) return 1

  file.data.date = new Date()
  await writeFile(path, file.stringify())
  return path
}

const publishPages = async () => {
  try {
    const files = await glob.promise(`${__dirname}/../src/pages/**/*.md`)
    const results = await Promise.all(
      files.map(async path => await processPage(path))
    )

    const published = results.filter(f => typeof f === "string").length
    const drafts = results.filter(f => f === 1).length

    if (published) {
      console.warn(
        chalk.bold.yellow(
          `${published} page${
            published > 1 ? "s have" : " has"
          } been marked as published!`
        )
      )
      console.warn(
        chalk.yellow("Review and stage the changes, then try committing again.")
      )
      process.exit(1)
    }

    console.info(chalk.green("No changes made!"))

    if (drafts) {
      console.info(
        chalk.blue(
          chalk`{bold ${drafts}} draft${
            drafts > 1 ? "s are" : " is"
          } waiting to be published.`
        )
      )
    }
  } catch (err) {
    console.error(chalk.bold.red("Something went wrong!"))
    console.error(err)
    process.exit(2)
  }
}

publishPages()
