module.exports = jest.fn().mockImplementation(({ htmlAst }) => ({
  ...htmlAst,
  excerpted: true,
}))
