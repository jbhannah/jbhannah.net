const tasks = (arr) => arr.join(" && ")

const preCommit = tasks(["pretty-quick --staged", "node scripts/publish.js"])

module.exports = {
  hooks: {
    "pre-commit": preCommit,
  },
}
