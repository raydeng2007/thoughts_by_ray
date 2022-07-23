import styled from 'styled-components'
import { Box, Card, Chip } from '@material-ui/core';
import { Pagination } from '@mui/material';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import { Layout } from '../components/Layout';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import kebabCase from "lodash/kebabCase"
import { LocalOffer } from '@material-ui/icons';
import { navigate } from 'gatsby';
import { Helmet } from "react-helmet"

const Home = ({ data,pageContext }) => {
    const Container = styled(Box)({
        paddingLeft: '10%',
        width: '90%',
        flexDirection: 'column',
    });
    const TagContainer = styled(Card)({
        width: '28%',
        marginLeft: '-28%',
        borderRadius: '10px',
        justifyContent: 'center',
        paddingBottom: '1.15%',
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
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
    })
    const BlogCard = styled(Card)({
        marginTop: '0.46%',
        borderRadius: '10px',
        marginBottom: '3.76%',
        width: '100%',
        justifyContent: 'center'
    });

    const PaginationBlock = styled(Pagination)({
        marginTop: '10%',
        marginBottom: '6%',
        justifyContent: 'center',
        color: 'black',
        size: 'large',
        variant: 'outlined'
    })

    const isBrowser = () => typeof window !== "undefined"

    const Image = styled(Img)({
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        objectFit: 'cover',
        width: '100%',
        height: '420px'
    });

    const BlogHeader = styled(Box)({
        paddingLeft: '1.04%',
    });

    const BlogBody = styled(Box)({
        paddingLeft: '1.04%',
        paddingRight: '1.04%',
        display: 'flex'
    });

    const TagBodyBox = styled(Box)({
        paddingLeft: '1.04%',
        display: 'flex'
    });

    const TagRow = styled(Box)({
        display: 'flex',
        flexDirection: 'row',
    })

    const PaginationBox = styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
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

    const { currentPage, numPages } = pageContext
    const handleChange = (event, value) => {
        const pageNum = value === 1? '': value
        navigate(`/${pageNum}`);
      };

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
                    siteLocale={siteLocale}
                >
                    <meta name="image" property="og:image" content={`${siteUrl}${image}`} />
                    <meta name='description' content={description} />
                    <meta property="og:url" content={`${siteUrl}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={`${siteUrl}${image}`} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:image" content={`${siteUrl}${image}`} />
                    <meta name="google-site-verification" content="Uk_o38lHlTJ3atTHeaCD23mcKOyrL0jZKKAZ1tBLQO0" />
                </Helmet>
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
                        {/* {tagsData.allMdx.group.map( */}
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
                                <BlogCard key={id} elevation={20} className="blogCard">
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
                                                    <TagBodyBox>
                                                        <Chip
                                                            key={tag}
                                                            variant="outlined"
                                                            label={tag}
                                                            color="secondary"
                                                            size="medium"
                                                            icon={<LocalOffer />}
                                                        />
                                                    </TagBodyBox>
                                                )
                                            )}

                                        </TagRow>
                                        <BlogBody className={'coffee'}>
                                            <p><span className={'coffee-emoji'} role="img"> ☕</span><i>{frontmatter.time} min reading time</i></p>
                                        </BlogBody>
                                        <BlogBody><p className={'publish-date'}><i>Published Date: {frontmatter.date}</i></p></BlogBody>
                                        <BlogBody><p>{excerpt}</p></BlogBody>
                                    </Link>
                                </BlogCard>
                            )
                        )}
               
                        <PaginationBox>                        
                            <PaginationBlock size={'large'} color={'primary'} variant={'outlined'} onChange={handleChange} page={currentPage} count={numPages}/>
                        </PaginationBox>
                    </Container>
                </TagRow>
            </Layout>
        </ThemeProvider>

    );
};

export const query = graphql`
query SITE_INDEX_QUERY($skip: Int!, $limit: Int!){
  allMdx(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { published: { eq: true } } }
    skip:$skip
    limit:$limit
  ) {
    nodes {
      id
      excerpt(pruneLength: 250)
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
