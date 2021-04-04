import styled from 'styled-components'
import { Box, Card } from '@material-ui/core';
import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import { Layout } from '../components/Layout';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import SEO from 'react-seo-component'

const Home = ({ data }) => {
    const Container = styled(Box)({
        paddingLeft: '150px',
        flexDirection: 'column',
    });
    const BlogCard = styled(Card)({
        marginTop: '8px',
        marginBottom: '15px',
        width: '700px',
        justifyContent: 'center'
    });

    const isBrowser = () => typeof window !== "undefined"

    const Image = styled(Img)({
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        objectFit: 'cover',
        width: '100%',
        height: '280px'
    });

    const BlogHeader = styled(Box)({
        paddingLeft: '18px',
    });

    const BlogBody = styled(Box)({
        paddingLeft: '18px',
    });

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
    const {
        description,
        title,
        image,
        siteUrl,
        siteLanguage,
        siteLocale,
    } = useSiteMetadata()

    return (

        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout toggleDarkTheme={toggleDarkTheme}>
                <SEO
                    title={title}
                    description={description || `nothin’`}
                    image={`${siteUrl}${image}`}
                    pathname={siteUrl}
                    siteLanguage={siteLanguage}
                    siteLocale={siteLocale}
                />
                <Container>
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
                                    <BlogBody><p><i>Published Date: {frontmatter.date}</i></p></BlogBody>
                                    <BlogBody><p>{excerpt}</p></BlogBody>
                                </Link>
                            </BlogCard>
                        )
                    )}
                </Container>
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

export default Home
