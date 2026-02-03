const siteMetadata = {
    title: `Thoughts By Ray`,
    titleTemplate: `%s | Thoughts By Ray`,
    description: `Semi-frequent posts from a semi-frequent thinker.`,
    image: `/default-site-image.jpg`,
    siteUrl: `https://blog.rayray.io`,
    siteLanguage: `en-CA`,
    siteLocale: `en_CA`,
    authorName: `Raymond Deng`,
    twitterHandle: `@_ray.deng`,
    keywords: [`blog`, `tech`, `travel`, `personal`, `web development`, `thoughts`],
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-material-ui`,
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `thoughts-by-ray`
            }
        },
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
        },
        `gatsby-plugin-sitemap`,
    ],
}