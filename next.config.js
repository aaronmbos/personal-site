module.exports = {
  reactStrictMode: true, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  swcMinify: true,
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/aaron-bos/image/upload"
  }
};
