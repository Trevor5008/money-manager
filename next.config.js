/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack: (config) => {
      config.resolve.fallback = { fs: false };
      config.module.rules.push({
         test: /\.my-file$/i,
         loader: "raw-loader",
      });

      // Important: return the modified config
      return config;
   },
};

module.exports = nextConfig;
