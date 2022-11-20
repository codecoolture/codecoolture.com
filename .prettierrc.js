module.exports = {
  trailingComma: "all",
  proseWrap: "always",
  printWidth: 120,
  overrides: [
    {
      files: "cms/**/*.mdx",
      options: {
        printWidth: 80,
      },
    },
  ],
};
