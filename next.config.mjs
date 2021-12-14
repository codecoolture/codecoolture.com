import nextMDX from "@next/mdx";
import remarkExternalLinks from "remark-external-links";

const withMDX = nextMDX({
  options: { remarkPlugins: [remarkExternalLinks] },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
