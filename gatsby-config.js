require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

module.exports = {
    siteMetadata: {
      title: `Gatsby Default Starter`,
      description: ``,
      author: `@gatsbyjs`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,{
        resolve: `gatsby-source-instagram-all`,
        options: {
          access_token: ACCESS_TOKEN ,
        }
      },],
  }
  