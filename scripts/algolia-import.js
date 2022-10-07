const dotenv = require("dotenv");
const algolia = require("algoliasearch");
const { default: algoliasearch } = require("algoliasearch");
const { AlgoliaAppId, BlogIndex } = require("../constants");

dotenv.config();
const client = algoliasearch(AlgoliaAppId, process.env.ALGOLIA_ADMIN_API_KEY);

const index = client.initIndex(BlogIndex);
