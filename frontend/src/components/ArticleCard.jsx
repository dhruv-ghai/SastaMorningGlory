import { Link } from 'react-router-dom';

const ArticleCard = ({ article, variant = 'default' }) => {
  if (!article) return null;

  const date = new Date(article.publishedAt || article.createdAt || Date.now());

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.slug}`} className="sidebar-story">
        {article.thumbnailUrl && (
          <div className="sidebar-story-image">
            <img src={article.thumbnailUrl} alt={article.title} />
          </div>
        )}
        <div className="sidebar-story-content">
          <span className="sidebar-story-category">{article.category}</span>
          <h3 className="sidebar-story-title">{article.title}</h3>
          <time className="sidebar-story-date">
            {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </time>
        </div>
      </Link>
    );
  }

  return (
    <article className="article-card">
      <Link to={`/article/${article.slug}`} style={{display: 'block'}}>
        {article.thumbnailUrl && (
          <div className="article-card-image-wrapper">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="article-card-image"
            />
            <div className="article-card-badge">{article.category}</div>
          </div>
        )}
        <div className="article-card-content">
          <h3 className="article-card-title">{article.title}</h3>
          {article.metaDescription && (
            <p className="article-card-description">{article.metaDescription}</p>
          )}
          <div className="article-card-meta">
            <span className="article-card-author">{article.author || 'Editorial Team'}</span>
            <time>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
