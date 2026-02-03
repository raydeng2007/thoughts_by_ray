import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            description
            title
            titleTemplate
            image
            siteUrl
            siteLanguage
            siteLocale
            authorName
            twitterHandle
            keywords
          }
        }
      }
    `
  )
  return site.siteMetadata
}
