import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

export const SEO = ({
    title,
    description,
    image,
    pathname,
    article = false,
    publishedDate,
    keywords = []
}) => {
    const {
        title: defaultTitle,
        titleTemplate,
        description: defaultDescription,
        image: defaultImage,
        siteUrl,
        siteLanguage,
        siteLocale,
        authorName,
        twitterHandle,
        keywords: defaultKeywords,
    } = useSiteMetadata()

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`,
        keywords: [...defaultKeywords, ...keywords].join(', '),
    }

    return (
        <Helmet>
            {/* Basic */}
            <html lang={siteLanguage} />
            <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="author" content={authorName} />
            <link rel="canonical" href={seo.url} />

            {/* Open Graph */}
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content={siteLocale} />
            <meta property="og:site_name" content={defaultTitle} />
            {article && publishedDate && (
                <meta property="article:published_time" content={publishedDate} />
            )}
            {article && <meta property="article:author" content={authorName} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

            {/* Robots */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Google Search Console Verification */}
            <meta name="google-site-verification" content="Uk_o38lHlTJ3atTHeaCD23mcKOyrL0jZKKAZ1tBLQO0" />
        </Helmet>
    )
}

export default SEO
