export const buildArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  author: {
    '@type': 'Person',
    name: article.author || 'Sasta Morning Glory Desk'
  },
  image: [article.heroImageUrl || article.thumbnailUrl],
  articleSection: article.category,
  keywords: article.keywords?.join(', ')
});

