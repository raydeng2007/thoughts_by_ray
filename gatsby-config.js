const siteMetadata = {
    title: `Thoughts By Ray`,
    description: `Infrequent posts from an infrequent thinkiner. A place where I share my thoughts about different things.`,
    image: `/default-site-image.png`,
    siteUrl: `https://raysblog.netlify.app`,
    siteLanguage: `en-CA`,
    siteLocale: `en_ca`,
    authorName: `Raymond Deng`,
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: { extensions: [`.mdx`, `.md`] },
            gatsbyRemarkPlugins: [
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 540,
                    },
                },
            ],
            plugin: [
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 540,
                    },
                },
            ],
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/posts`,
                name: `posts`,
                icon: `src/images/gatsby-icon.png`
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                icon: "src/images/gatsby-icon.png"
            },
        }
    ],
}