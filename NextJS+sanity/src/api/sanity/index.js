const sanityClient = require('@sanity/client')

module.exports = sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: process.env.SANITY_ID,
  dataset: process.env.ENVIRONMENT,
  useCdn: true,
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
})
