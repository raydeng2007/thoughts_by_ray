import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
// import Dump from '../components/Dump';
import { Layout } from '../components/Layout';


export default ({ data, pageContext }) => {
    const { frontmatter, body } = data.mdx;
    const { previous, next } = pageContext;
    const getInitialColorMode = () => {
        const persistedColorPreference = window.localStorage.getItem('theme');
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        // If the user has explicitly chosen light or dark,
        // let's use it. Otherwise, this value will be null.
        if (hasPersistedPreference) {
            window.localStorage.setItem('theme', persistedColorPreference);
            return persistedColorPreference;
        }
        // If they haven't been explicit, let's check the media
        // query
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
            window.localStorage.setItem('theme', mql.matches ? 'dark' : 'light');
            return mql.matches ? 'dark' : 'light';
        }
        // If they are using a browser/OS that doesn't support
        // color themes, let's default to 'light'.
        window.localStorage.setItem('theme', 'light');
        return 'light';
    }
    const existingPreference = getInitialColorMode()

    const [currentTheme, setTheme] = React.useState(existingPreference)
    React.useEffect(() => {
        muiTheme = createMuiTheme({
            palette: {
                type: currentTheme
            }
        });
    }, [currentTheme]);

    let muiTheme = createMuiTheme({
        palette: {
            type: currentTheme
        }
    });

    // we change the palette type of the theme in state
    const toggleDarkTheme = () => {
        const currTheme = window.localStorage.getItem("theme")
        let newPaletteType = currTheme === 'dark' ? 'light' : 'dark'
        setTheme(newPaletteType);
        window.localStorage.setItem("theme", newPaletteType)
    };
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout toggleDarkTheme={toggleDarkTheme}>

                <h1>{frontmatter.title}</h1>
                <p>{frontmatter.date}</p>
                <MDXRenderer>{body}</MDXRenderer>
                {previous === false ? null : (
                    <>
                        {previous && (
                            <Link to={previous.fields.slug}>
                                <p>{previous.frontmatter.title}</p>
                            </Link>
                        )}
                    </>
                )}
                {next === false ? null : (
                    <>
                        {next && (
                            <Link to={next.fields.slug}>
                                <p>{next.frontmatter.title}</p>
                            </Link>
                        )}
                    </>
                )}
            </Layout>
        </ThemeProvider>
    );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
        cover {
          publicURL
        }
      }
      body
      excerpt
      fields {
        slug
      }
    }
  }
`
