import styled from 'styled-components'
import { Box, Card, Chip } from '@material-ui/core';
import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import { Layout } from '../components/Layout';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import kebabCase from "lodash/kebabCase"
import { LocalOffer } from '@material-ui/icons';
import { navigate } from 'gatsby';
import { Helmet } from "react-helmet"

const Home = ({ data }) => {
    const Container = styled(Box)({
        paddingLeft: '150px',
        flexDirection: 'column',
    });
    const TagContainer = styled(Card)({
        width: '300px',
        marginLeft: '-300px',
        borderRadius: '8px',
        justifyContent: 'center',
        paddingBottom: '20px',
        height: '100%'
    })
    const TagHeader = styled(Box)({
        display: 'flex',
        justifyContent: 'center'
    })
    const TagBody = styled(Box)({
        display: 'flex',
        flexWrap: 'wrap'
    })
    const SingleTag = styled(Box)({
        paddingLeft: '10px',
        paddingTop: '10px',
    })
    const BlogCard = styled(Card)({
        marginTop: '8px',
        marginBottom: '15px',
        width: '700px',
        justifyContent: 'center'
    });

    const isBrowser = () => typeof window !== "undefined"

    const Image = styled(Img)({
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
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

    const TagRow = styled(Box)({
        display: 'flex',
        flexDirection: 'row'
    })

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
                <Helmet
                    title={title}
                    description={description}
                    image={`${siteUrl}${image}`}
                    pathname={siteUrl}
                    siteLanguage={siteLanguage}
                    siteLocale={siteLocale} />
                <TagRow>
                    <TagContainer raised={true}>
                        <TagHeader>
                            <h2>
                                <Link to="/tags">
                                    All Tags
                                </Link>
                            </h2>
                        </TagHeader>
                        <TagBody>
                            {data.tagsGroup.group.map(
                                (tag) => (
                                    <>
                                        <SingleTag>
                                            <Chip
                                                clickable
                                                variant="outlined"
                                                onClick={() => (navigate(`/tags/${kebabCase(tag.fieldValue)}/`))}
                                                label={tag.fieldValue}
                                                color="secondary"
                                                size="medium"
                                                icon={<LocalOffer />}
                                            />
                                        </SingleTag>
                                    </>
                                ))
                            }
                        </TagBody>
                    </TagContainer>
                    <Container>
                        {data.allMdx.nodes.map(
                            ({ id, excerpt, frontmatter, fields, }) => (
                                <BlogCard key={id} className="blogCard">
                                    <Link to={fields.slug}>
                                        {!!frontmatter.cover ? (
                                            <Image
                                                fluid={frontmatter.cover.childImageSharp.fluid}
                                            />
                                        ) : null}
                                        <BlogHeader><h1>{frontmatter.title}</h1></BlogHeader>
                                        <TagRow>
                                            {frontmatter.tags.map(
                                                (tag) => (
                                                    <BlogBody>
                                                        <Chip
                                                            key={tag}
                                                            variant="outlined"
                                                            label={tag}
                                                            color="secondary"
                                                            size="small"
                                                            icon={<LocalOffer />}
                                                        />
                                                    </BlogBody>
                                                )
                                            )}
                                        </TagRow>
                                        <BlogBody><p><i>Published Date: {frontmatter.date}</i></p></BlogBody>
                                        <BlogBody><p>{excerpt}</p></BlogBody>
                                    </Link>
                                </BlogCard>
                            )
                        )}
                    </Container>
                </TagRow>
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
          tags
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
    tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
  }
`;

export default Home
