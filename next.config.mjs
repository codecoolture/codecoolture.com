import nextMDX from "@next/mdx";
import rehypeExternalLinks from "rehype-external-links";

const withMDX = nextMDX({
  options: { rehypePlugins: [rehypeExternalLinks] },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
