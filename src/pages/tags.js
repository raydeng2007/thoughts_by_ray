import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"
import { Layout } from '../components/Layout';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import { getMuiTheme } from '../styles/theme'

const TagsPage = ({
    data: {
        allMdx: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => {
    const isBrowser = () => typeof window !== "undefined"
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
        const currTheme = window.localStorage.getItem("theme")
        let newPaletteType = currTheme === 'dark' ? 'light' : 'dark'
        setTheme(newPaletteType);
        window.localStorage.setItem("theme", newPaletteType)
    };
    // const {
    //     description,
    //     title,
    //     image,
    //     siteUrl,
    //     siteLanguage,
    //     siteLocale,
    // } = useSiteMetadata()

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout toggleDarkTheme={toggleDarkTheme}>
                <div>
                    <Helmet>
                        <html lang="en-CA" />
                        <title>{`All Tags | ${title}`}</title>
                        <meta name="description" content="Browse all tags on Thoughts By Ray" />
                        <link rel="canonical" href="https://blog.rayray.io/tags/" />
                        <meta property="og:url" content="https://blog.rayray.io/tags/" />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={`All Tags | ${title}`} />
                        <meta property="og:description" content="Browse all tags on Thoughts By Ray" />
                        <meta property="og:image" content="https://blog.rayray.io/default-site-image.jpg" />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={`All Tags | ${title}`} />
                        <meta name="twitter:description" content="Browse all tags on Thoughts By Ray" />
                        <meta name="twitter:image" content="https://blog.rayray.io/default-site-image.jpg" />
                    </Helmet>
                    <div>
                        <h1>Tags</h1>
                        <ul>
                            {group.map(tag => (
                                <li key={tag.fieldValue}>
                                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                        {tag.fieldValue} ({tag.totalCount})
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </ThemeProvider>

    )
}

TagsPage.propTypes = {
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            group: PropTypes.arrayOf(
                PropTypes.shape({
                    fieldValue: PropTypes.string.isRequired,
                    totalCount: PropTypes.number.isRequired,
                }).isRequired
            ),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }),
        }),
    }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`