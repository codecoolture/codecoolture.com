/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const withMDX = require("@next/mdx")({
  options: { remarkPlugins: [require("remark-external-links")] },
});

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
});
