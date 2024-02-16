/* Next.js can be a little buggy when detecting file changes inside a Docker container
We set the following config to poll for file change every 1 second */
module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 1000;
    return config;
  },
};
