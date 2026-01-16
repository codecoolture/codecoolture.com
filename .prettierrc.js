module.exports = {
  trailingComma: "all",
  proseWrap: "always",
  printWidth: 120,
  overrides: [
    {
      files: "**/*.mdx",
      options: {
        printWidth: 80,
      },
    },
  ],
};
