import { ThemeProvider, CssBaseline, createMuiTheme, Box, Button, Chip } from '@material-ui/core';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Layout } from '../components/Layout';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import styled from 'styled-components'
import { Helmet } from "react-helmet"
import kebabCase from "lodash/kebabCase"
import { LocalOffer } from '@material-ui/icons';
import { navigate } from 'gatsby';
import Img from 'gatsby-image';
import { Disqus } from 'gatsby-plugin-disqus';
import { getMuiTheme } from '../styles/theme'

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

    // Create theme using centralized config
    const muiTheme = React.useMemo(() => createMuiTheme(getMuiTheme(currentTheme)), [currentTheme]);

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
        paddingBottom: '30px',
        flexDirection: 'row',
        justifyContent: 'space-between'
    })
    const Image = styled(Img)({
        objectFit: 'cover',
        width: '100%',
        height: '500px'
    });
    const TagContainer = styled(Box)({
        borderRadius: '10px',
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
        paddingTop: '16px'
    })

    const PageNavButton = styled(Button)({
        height: '38px',
        textTransform: 'capitalize'
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
                <Helmet>
                    <html lang={siteLanguage} />
                    <title>{title}</title>
                    <meta name="description" content={excerpt} />
                    <link rel="canonical" href={`${siteUrl}${fields.slug}`} />

                    {/* Open Graph */}
                    <meta property="og:url" content={`${siteUrl}${fields.slug}`} />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={excerpt} />
                    <meta property="og:image" content={cover ? `${siteUrl}${cover.publicURL}` : `${siteUrl}${image}`} />
                    <meta property="og:locale" content={siteLocale} />
                    <meta property="og:site_name" content="Thoughts By Ray" />
                    <meta property="article:author" content={authorName} />
                    <meta property="article:published_time" content={date} />

                    {/* Twitter Card */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={excerpt} />
                    <meta name="twitter:image" content={cover ? `${siteUrl}${cover.publicURL}` : `${siteUrl}${image}`} />
                </Helmet>
                <h1>{frontmatter.title}</h1>
                {!!frontmatter.cover ? (
                    <Image
                        fluid={frontmatter.cover.childImageSharp.fluid}
                    />
                ) : null}
                <Box>
                    <p className={'publish-date'}><i>Published Date: {frontmatter.date}</i></p>
                </Box>

                <TagContainer>
                    <TagBody>
                        {frontmatter.tags.map(
                            (tag) => (
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
                <Disqus
                    shortname={'thoughts-by-ray'}
                    config={{
                        identifier: title,
                        title: title,
                    }}
                    theme={'light'}
                />
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
            fluid(quality: 100) {
                base64
                aspectRatio
                src
                srcSet
                sizes
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