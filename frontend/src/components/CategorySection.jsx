import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard.jsx';

const CategorySection = ({ title, articles = [] }) => {
  if (!articles || articles.length === 0) return null;

  const categorySlug = title.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');

  return (
    <section className="category-section">
      <div className="container-custom">
        <div className="category-header">
          <h2 className="category-title">{title}</h2>
          <Link to={`/category/${categorySlug}`} className="category-view-all">
            <span>View All</span>
            <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="article-grid">
          {articles.map((article, index) => (
            <div key={article._id || article.slug || index} className="article-card-wrapper">
              <ArticleCard article={article} />
              {index === 2 && (
                <div style={{padding: '1rem', backgroundColor: '#f5f5f5'}}>
                  <div style={{backgroundColor: '#e5e5e5', borderRadius: '4px', textAlign: 'center', padding: '2rem'}}>
                    <span style={{fontSize: '0.75rem', color: '#666', fontWeight: '500'}}>Advertisement</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link to={`/category/${categorySlug}`} className="category-view-all" style={{display: 'inline-flex'}}>
            <span>View All {title} Articles</span>
            <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
