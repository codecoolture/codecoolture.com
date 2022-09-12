import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
    };

    return config;
  },
};

export default withMDX(nextConfig);
