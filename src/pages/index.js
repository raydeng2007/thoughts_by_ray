import { Box, Card, styled } from '@material-ui/core';
import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import { Layout } from '../components/Layout';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

export default ({ data }) => {
    const Image = styled(Img)({
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    });

    const BlogCard = styled(Card)({
        marginTop: '8px',
        marginBottom: '15px',
        width: '700px',
        justifyContent: 'center'
    });

    const BlogHeader = styled(Box)({
        paddingLeft: '18px',
    });

    const BlogBody = styled(Box)({
        paddingLeft: '18px',
    });

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
                <Box paddingLeft='150px' flexDirection='column'>
                    {data.allMdx.nodes.map(
                        ({ id, excerpt, frontmatter, fields, }) => (
                            <BlogCard key={id} >
                                <Link to={fields.slug}>
                                    {!!frontmatter.cover ? (
                                        <Image
                                            fluid={frontmatter.cover.childImageSharp.fluid}
                                        />
                                    ) : null}
                                    <BlogHeader><h1>{frontmatter.title}</h1></BlogHeader>
                                    <BlogBody><p>{frontmatter.date}</p></BlogBody>
                                    <BlogBody><p>{excerpt}</p></BlogBody>
                                </Link>
                            </BlogCard>
                        )
                    )}
                </Box>
            </Layout>
        </ThemeProvider>

    );
};

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          cover {
            publicURL
            childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;
