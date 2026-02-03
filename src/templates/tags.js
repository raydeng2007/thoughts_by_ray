import React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
// Components
import { Link, graphql } from "gatsby"
import { Layout } from '../components/Layout';
import { Helmet } from "react-helmet"
import { getMuiTheme } from '../styles/theme'

const Tags = ({ pageContext, data }) => {
    const isBrowser = () => typeof window !== "undefined"
    const windowGlobal = typeof window !== 'undefined' && window
    const {
        title,
        siteUrl,
        siteLanguage,
        description,
        image
    } = useSiteMetadata()
    const getInitialColorMode = () => {
        let persistedColorPreference
        if (isBrowser()) { persistedColorPreference = window.localStorage.getItem('theme') };
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        // If the user has explicitly chosen light or dark,
        // let's use it. Otherwise, this value will be null.
        if (hasPersistedPreference) {
            window.localStorage.setItem('theme', persistedColorPreference);
            return persistedColorPreference;
        }
        // If they haven't been explicit, let's check the media
        // query

        let mql
        if (isBrowser()) { mql = window.matchMedia('(prefers-color-scheme: dark)'); };
        const hasMediaQueryPreference = typeof mql !== 'undefined' ? typeof mql.matches === 'boolean' : false;
        if (hasMediaQueryPreference) {
            window.localStorage.setItem('theme', mql.matches ? 'dark' : 'light');
            return mql.matches ? 'dark' : 'light';
        }
        // If they are using a browser/OS that doesn't support
        // color themes, let's default to 'light'.
        if (isBrowser()) { window.localStorage.setItem('theme', 'light'); };

        return 'light';
    }
    const existingPreference = getInitialColorMode()

    const [currentTheme, setTheme] = React.useState(existingPreference)

    // Create theme using centralized config
    const muiTheme = React.useMemo(() => createMuiTheme(getMuiTheme(currentTheme)), [currentTheme]);

    // we change the palette type of the theme in state
    const toggleDarkTheme = () => {
        const currTheme = windowGlobal.localStorage.getItem("theme")
        let newPaletteType = currTheme === 'dark' ? 'light' : 'dark'
        setTheme(newPaletteType);
        windowGlobal.localStorage.setItem("theme", newPaletteType)
    };


    const { tag } = pageContext
    const { edges, totalCount } = data.allMdx
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout toggleDarkTheme={toggleDarkTheme}>
                <Helmet>
                    <html lang={siteLanguage} />
                    <title>{`${tag} | ${title}`}</title>
                    <meta name="description" content={`Posts tagged with ${tag}`} />
                    <link rel="canonical" href={`${siteUrl}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}/`} />
                    <meta property="og:url" content={`${siteUrl}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}/`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={`${tag} | ${title}`} />
                    <meta property="og:description" content={`Posts tagged with ${tag}`} />
                    <meta property="og:image" content={`${siteUrl}${image}`} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`${tag} | ${title}`} />
                    <meta name="twitter:description" content={`Posts tagged with ${tag}`} />
                    <meta name="twitter:image" content={`${siteUrl}${image}`} />
                </Helmet>
                <div>
                    <h1>{tagHeader}</h1>
                    <ul>
                        {edges.map(({ node }) => {
                            const { slug } = node.fields
                            const { title } = node.frontmatter
                            return (
                                <li key={slug}>
                                    <Link to={slug}>{title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
                    <Link to="/tags">All tags</Link>
                </div>
            </Layout>
        </ThemeProvider>

    )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`