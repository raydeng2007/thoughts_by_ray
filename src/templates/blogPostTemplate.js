import { ThemeProvider, CssBaseline, createMuiTheme, Box, Button, Card, CardHeader, Chip } from '@material-ui/core';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
// import Dump from '../components/Dump';
import { Layout } from '../components/Layout';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import styled from 'styled-components'
import { Helmet } from "react-helmet"
import kebabCase from "lodash/kebabCase"
import { LocalOffer } from '@material-ui/icons';
import { navigate } from 'gatsby';
import Img from 'gatsby-image';

const BlogPostTemplate = ({ data, pageContext }) => {
    const isBrowser = () => typeof window !== "undefined"
    const windowGlobal = typeof window !== 'undefined' && window
    const {
        image,
        siteUrl,
        siteLanguage,
        siteLocale,
        authorName,
    } = useSiteMetadata()
    const { frontmatter, body, fields, excerpt } = data.mdx
    const { title, date, cover } = frontmatter
    const { previous, next } = pageContext
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
        const currTheme = windowGlobal.localStorage.getItem("theme")
        let newPaletteType = currTheme === 'dark' ? 'light' : 'dark'
        setTheme(newPaletteType);
        windowGlobal.localStorage.setItem("theme", newPaletteType)
    };

    const Footer = styled(Box)({
        display: 'flex',
        paddingTop: '40px',
        flexDirection: 'row',
        justifyContent: 'space-between'
    })
    const Image = styled(Img)({
        objectFit: 'cover',
        width: '100%',
        height: '400px'
    });
    const TagContainer = styled(Box)({
        borderRadius: '8px',
        justifyContent: 'center',
        paddingBottom: '20px',
        height: '100%'
    })
    const TagBody = styled(Box)({
        display: 'flex',
        flexWrap: 'wrap'
    })
    const SingleTag = styled(Box)({
        paddingLeft: '10px',
        paddingTop: '10px',
    })

    const PageNavButton = styled(Button)({
        height: '38px',
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout toggleDarkTheme={toggleDarkTheme}>
                {/* The below is for testing only */}
                {/* <Dump
                    title={title}
                    description={excerpt}
                    image={
                        cover === null
                            ? `${siteUrl}${image}`
                            : `${siteUrl}${cover.publicURL}`
                    }
                    pathname={`${siteUrl}${fields.slug}`}
                    siteLanguage={siteLanguage}
                    siteLocale={siteLocale}
                    author={authorName}
                    article={true}
                    publishedDate={date}
                    modifiedDate={new Date(Date.now()).toISOString()}
                /> */}
                <Helmet
                    title={title}
                    description={excerpt}
                    image={
                        cover === null
                            ? `${siteUrl}${image}`
                            : `${siteUrl}${cover.publicURL}`
                    }
                    pathname={`${siteUrl}${fields.slug}`}
                    siteLanguage={siteLanguage}
                    siteLocale={siteLocale}
                    author={authorName}
                    article={true}
                    publishedDate={date}
                    modifiedDate={new Date(Date.now()).toISOString()}
                />
                <h1>{frontmatter.title}</h1>
                {!!frontmatter.cover ? (
                    <Image
                        fluid={frontmatter.cover.childImageSharp.fluid}
                    />
                ) : null}
                <p className={'publish-date'}><i>Published Date: {frontmatter.date}</i></p>
                <TagContainer>
                    <TagBody>
                        {frontmatter.tags.map(
                            (tag) => (
                                <>
                                    <SingleTag>
                                        <Chip
                                            clickable
                                            variant="outlined"
                                            onClick={() => (navigate(`/tags/${kebabCase(tag)}/`))}
                                            label={tag}
                                            color="secondary"
                                            size="medium"
                                            icon={<LocalOffer />}
                                        />
                                    </SingleTag>
                                </>
                            ))
                        }
                    </TagBody>
                    <Box display='flex' className={'coffee'}>
                        <p><span className={'coffee-emoji'} role="img"> ☕</span><i>{frontmatter.time} min reading time</i></p>
                    </Box>
                </TagContainer>
                <Box py={2}>
                    <MDXRenderer>{body}</MDXRenderer>
                </Box>
                <Footer>
                    {previous === false ? null : (
                        <>
                            {previous && (
                                <PageNavButton size='small' variant="contained" color="primary">
                                    <Link to={previous.fields.slug}>
                                        <p>Prev Post: {previous.frontmatter.title}</p>
                                    </Link>
                                </PageNavButton>
                            )}
                        </>
                    )}
                    {next === false ? null : (
                        <>
                            {next && (
                                <PageNavButton size='small' variant="contained" color="primary">
                                    <Link to={next.fields.slug}>
                                        <p>Next Post: {next.frontmatter.title}</p>
                                    </Link>
                                </PageNavButton>
                            )}
                        </>
                    )}
                </Footer>
            </Layout>
        </ThemeProvider>
    );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        time
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
      body
      excerpt
      fields {
        slug
      }
    }
  }
`
export default BlogPostTemplate