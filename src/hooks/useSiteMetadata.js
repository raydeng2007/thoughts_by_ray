import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            description
            title
            image
            siteUrl
            siteLanguage
            siteLocale
            authorName
          }
        }
      }
    `
  )
  return site.siteMetadata
}
